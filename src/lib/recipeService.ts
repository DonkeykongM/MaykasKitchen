import { supabase, isSupabaseConfigured } from './supabase';

export interface RecipeRating {
  id: string;
  recipe_id: string;
  user_name: string;
  user_email?: string;
  rating: number;
  created_at: string;
}

export interface RecipeComment {
  id: string;
  recipe_id: string;
  user_name: string;
  user_email?: string;
  comment_text: string;
  rating?: number;
  created_at: string;
  is_approved: boolean;
}

export interface RecipeStats {
  average_rating: number;
  total_ratings: number;
  total_comments: number;
  rating_distribution: { [key: number]: number };
}

// Get recipe statistics
export const getRecipeStats = async (recipeId: string): Promise<RecipeStats> => {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured || !supabase) {
      console.warn('Supabase not configured, returning default stats');
      return {
        average_rating: 4.8,
        total_ratings: 0,
        total_comments: 0,
        rating_distribution: {}
      };
    }

    // Get ratings
    const { data: ratings, error: ratingsError } = await supabase
      .from('recipe_ratings')
      .select('rating')
      .eq('recipe_id', recipeId);

    if (ratingsError) throw ratingsError;

    // Get comments count
    const { count: commentsCount, error: commentsError } = await supabase
      .from('recipe_comments')
      .select('*', { count: 'exact', head: true })
      .eq('recipe_id', recipeId)
      .eq('is_approved', true);

    if (commentsError) throw commentsError;

    // Calculate statistics
    const totalRatings = ratings?.length || 0;
    const totalComments = commentsCount || 0;

    let averageRating = 4.8; // Default to maintain 4.7-5.0 range
    let ratingDistribution: { [key: number]: number } = {};

    if (totalRatings > 0 && ratings) {
      const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
      const calculated = sum / totalRatings;
      
      // Ensure rating stays within 4.7-5.0 range
      averageRating = Math.max(4.7, Math.min(5.0, calculated));
      
      // Calculate rating distribution
      ratings.forEach(r => {
        ratingDistribution[r.rating] = (ratingDistribution[r.rating] || 0) + 1;
      });
    }

    return {
      average_rating: Number(averageRating.toFixed(1)),
      total_ratings: totalRatings,
      total_comments: totalComments,
      rating_distribution: ratingDistribution
    };
  } catch (error) {
    console.error('Error fetching recipe stats:', error);
    return {
      average_rating: 4.8,
      total_ratings: 0,
      total_comments: 0,
      rating_distribution: {}
    };
  }
};

// Get recipe comments
export const getRecipeComments = async (recipeId: string): Promise<RecipeComment[]> => {
  try {
    if (!isSupabaseConfigured || !supabase) {
      console.warn('Supabase not configured, returning empty comments');
      return [];
    }

    const { data, error } = await supabase
      .from('recipe_comments')
      .select('*')
      .eq('recipe_id', recipeId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching recipe comments:', error);
    return [];
  }
};

// Submit a new rating
export const submitRating = async (
  recipeId: string,
  userName: string,
  rating: number,
  userEmail?: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured || !supabase) {
      return { 
        success: false, 
        error: 'Database inte tillgänglig för tillfället. Försök igen senare.' 
      };
    }

    // Validate rating is within allowed range
    if (rating < 1 || rating > 5) {
      return { success: false, error: 'Betyg måste vara mellan 1 och 5' };
    }

    const { error } = await supabase
      .from('recipe_ratings')
      .insert([{
        recipe_id: recipeId,
        user_name: userName.trim(),
        user_email: userEmail?.trim() || null,
        rating: rating
      }]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error submitting rating:', error);
    return { success: false, error: 'Kunde inte spara betyget. Försök igen.' };
  }
};

// Submit a new comment (with optional rating)
export const submitComment = async (
  recipeId: string,
  userName: string,
  commentText: string,
  rating?: number,
  userEmail?: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured || !supabase) {
      return { 
        success: false, 
        error: 'Database inte tillgänglig för tillfället. Försök igen senare.' 
      };
    }

    // Validate inputs
    if (!userName.trim()) {
      return { success: false, error: 'Namn är obligatoriskt' };
    }
    
    if (!commentText.trim() || commentText.trim().length < 5) {
      return { success: false, error: 'Kommentar måste vara minst 5 tecken' };
    }

    if (rating && (rating < 1 || rating > 5)) {
      return { success: false, error: 'Betyg måste vara mellan 1 och 5' };
    }

    const { error } = await supabase
      .from('recipe_comments')
      .insert([{
        recipe_id: recipeId,
        user_name: userName.trim(),
        user_email: userEmail?.trim() || null,
        comment_text: commentText.trim(),
        rating: rating || null
      }]);

    if (error) throw error;

    // If rating was provided, also submit to ratings table
    if (rating) {
      await submitRating(recipeId, userName, rating, userEmail);
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting comment:', error);
    return { success: false, error: 'Kunde inte spara kommentaren. Försök igen.' };
  }
};

// Get recipe ratings for display
export const getRecipeRatings = async (recipeId: string): Promise<RecipeRating[]> => {
  try {
    if (!isSupabaseConfigured || !supabase) {
      console.warn('Supabase not configured, returning empty ratings');
      return [];
    }

    const { data, error } = await supabase
      .from('recipe_ratings')
      .select('*')
      .eq('recipe_id', recipeId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching recipe ratings:', error);
    return [];
  }
};

// Seed initial data to maintain 4.7-5.0 rating range
export const seedInitialRatings = async (recipeId: string) => {
  try {
    if (!isSupabaseConfigured || !supabase) {
      console.warn('Supabase not configured, skipping seed data');
      return;
    }

    // Check if recipe already has ratings
    const { count } = await supabase
      .from('recipe_ratings')
      .select('*', { count: 'exact', head: true })
      .eq('recipe_id', recipeId);

    if (count && count > 0) return; // Already has ratings

    // Add some initial ratings to maintain the 4.7-5.0 range
    const initialRatings = [
      { user_name: 'Anna L.', rating: 5 },
      { user_name: 'Erik M.', rating: 5 },
      { user_name: 'Sofia K.', rating: 4 }
    ];

    for (const rating of initialRatings) {
      await supabase
        .from('recipe_ratings')
        .insert([{
          recipe_id: recipeId,
          user_name: rating.user_name,
          rating: rating.rating
        }]);
    }
  } catch (error) {
    console.error('Error seeding initial ratings:', error);
  }
};