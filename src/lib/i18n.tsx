// Internationalization system for MaykasKitchen
export type Language = 'sv' | 'en';

export const languages = {
  sv: 'Svenska',
  en: 'English'
} as const;

// Translation interface
export interface Translations {
  nav: {
    home: string;
    about: string;
    recipes: string;
    collaborations: string;
    contact: string;
    instagram: string;
  };
  hero: {
    tagline: string;
    title: string;
    description: string;
    subtitle: string;
    exploreRecipes: string;
    followMe: string;
    scrollDown: string;
    bookPreOrder: string;
    bookTitle: string;
  };
  about: {
    tagline: string;
    title: string;
    subtitle: string;
    description1: string;
    description2: string;
    community: string;
    communityDesc: string;
    expertise: string;
    expertiseDesc: string;
    followMeHere: string;
    since: string;
    stats: {
      instagram: string;
      tiktok: string;
      youtube: string;
      facebook: string;
      followers: string;
      subscribers: string;
    };
  };
  recipes: {
    tagline: string;
    title: string;
    description: string;
    allRecipes: string;
    mainDishes: string;
    stews: string;
    baking: string;
    seeAllRecipes: string;
    discoverRecipes: string;
    minutes: string;
    portions: string;
    difficulty: string;
    rating: string;
    reviews: string;
    likes: string;
    showRecipe: string;
    show: string;
    backToHome: string;
    backToRecipes: string;
    searchPlaceholder: string;
    noResults: string;
    noResultsDesc: string;
    showAll: string;
    popularSearches: string;
    filter: string;
    popular: string;
    showing: string;
    resultsFor: string;
    noMatch: string;
    categories: {
      all: string;
      vegetarian: string;
      quick: string;
      assyrian: string;
      syrian: string;
      middleEastern: string;
      glutenFree: string;
      meat: string;
      fish: string;
    };
    filters: {
      fish: string;
      vegetarian: string;
      quick: string;
      traditional: string;
      assyrian: string;
      syrian: string;
    };
    getNewsletter: string;
    getNewRecipes: string;
    exclusiveRecipes: string;
    seasonalTips: string;
    techniques: string;
  };
  recipeDetails: {
    adjustPortions: string;
    ingredients: string;
    instructions: string;
    howToMake: string;
    tips: string;
    variations: string;
    allergens: string;
    nutrition: string;
    personalStory: string;
    fromHeart: string;
    printRecipe: string;
    seeOnInstagram: string;
    saveRecipe: string;
    saved: string;
    save: string;
    likeRecipe: string;
    liked: string;
    like: string;
    shareRecipe: string;
    share: string;
    linkCopied: string;
    rateAndComment: string;
    yourRating: string;
    stars: string;
    star: string;
    yourName: string;
    yourEmail: string;
    emailOptional: string;
    emailNotShown: string;
    writeComment: string;
    submitComment: string;
    sending: string;
    thankYou: string;
    commentSuccess: string;
    nameRequired: string;
    commentRequired: string;
    pleaseRate: string;
    errorSubmitting: string;
    tryAgain: string;
    comments: string;
    noComments: string;
    beFirst: string;
    loading: string;
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
    salt: string;
    easy: string;
    medium: string;
    hard: string;
    difficulty: {
      easy: string;
      medium: string;
      hard: string;
    };
  };
  collaborations: {
    tagline: string;
    title: string;
    description: string;
    whatIOffer: string;
    myNumbers: string;
    followers: string;
    subscribers: string;
    engagement: string;
    ageGroup: string;
    highEngagement: string;
    previousCollabs: string;
    collaborateWithMe: string;
    totalReach: string;
    professionalContent: string;
    contactMe: string;
    offers: {
      campaigns: string;
      recipedev: string;
      videos: string;
      affiliate: string;
      workshops: string;
    };
  };
  contact: {
    tagline: string;
    title: string;
    description: string;
    sendMessage: string;
    contactInfo: string;
    followMe: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    nameRequired: string;
    emailRequired: string;
    validEmail: string;
    messageRequired: string;
    messageShort: string;
    subscribe: string;
    subscribeDesc: string;
    submitButton: string;
    sending: string;
    thankYouTitle: string;
    thankYouMessage: string;
    sendNew: string;
    location: string;
    availableSweden: string;
    fastestResponse: string;
    sendDM: string;
    errorMessage: string;
    tryAgainLater: string;
    fixFormErrors: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
  };
  newsletter: {
    title: string;
    description: string;
    emailPlaceholder: string;
    subscribe: string;
    subscribeNow: string;
    subscribed: string;
    sending: string;
    thankYou: string;
    thankYouMessage: string;
    validEmail: string;
    errorMessage: string;
    privacy: string;
    privacyPolicy: string;
    benefits: {
      newRecipes: string;
      exclusiveRecipes: string;
      seasonalTips: string;
      techniques: string;
    };
    popup: {
      title: string;
      description: string;
      subscribeButton: string;
      benefits: {
        weekly: string;
        seasonal: string;
        exclusive: string;
        techniques: string;
      };
    };
  };
  footer: {
    tagline: string;
    description: string;
    explore: string;
    recipes: string;
    allRecipes: string;
    about: string;
    collaborations: string;
    contact: string;
    newsletter: string;
    newsletterDesc: string;
    emailPlaceholder: string;
    subscribeButton: string;
    copyright: string;
    madeWith: string;
    in: string;
    createdBy: string;
    benefits: {
      newRecipes: string;
      exclusiveRecipes: string;
      seasonalTips: string;
      techniques: string;
    };
  };
  common: {
    loading: string;
    error: string;
    success: string;
    close: string;
    search: string;
    menu: string;
    openMenu: string;
    closeMenu: string;
    skipToContent: string;
    backToTop: string;
    back: string;
    sweden: string;
    experience: string;
    years: string;
    or: string;
    optional: string;
  };
}

// Swedish translations (default)
export const sv: Translations = {
  nav: {
    home: 'Hem',
    about: 'Om mig',
    recipes: 'Recept',
    collaborations: 'Samarbeten',
    contact: 'Kontakt',
    instagram: 'Instagram'
  },
  hero: {
    tagline: 'Assyrisk/syriansk matkonst',
    title: 'Mat från hjärtat & själen',
    description: 'Autentiska recept med kärlek',
    subtitle: 'Säsongsbaserad matlagning som skapar glädje runt bordet för hela familjen – med autentiska assyriska/syrianska rötter.',
    exploreRecipes: 'Utforska recept',
    followMe: 'Följ mig här:',
    scrollDown: 'Utforska mer',
    bookPreOrder: 'Förbeställ min kokbok',
    bookTitle: 'Maykas Gröna Kök - Kutle, hummus och kärlek'
  },
  about: {
    tagline: 'Lär känna mig',
    title: 'Passion för matlagning',
    subtitle: 'Med assyriska/syrianska rötter och nutida influenser',
    description1: 'Jag är kock, kreatör och matinfluencer med passion för säsongsbaserad mat, odling och matglädje för hela familjen. Genom min assyriska/syrianska bakgrund har jag fått ett rikt arv av smaker och traditioner som jag älskar att dela med mig av.',
    description2: 'Med över 120 000 följare på Instagram och 62 000 på TikTok inspirerar jag dagligen tusentals människor till att laga mer mat hemma, med hjärta, själ och enkla råvaror. Min matfilosofi handlar om gemenskap, tradition och modernt vardagsliv i harmoni.',
    community: 'Community',
    communityDesc: 'Aktiv och lojal gemenskap som älskar autentiska recept och matinspiration.',
    expertise: 'Expertis',
    expertiseDesc: 'Specialiserad på assyrisk/syriansk mat och moderna tolkningar av traditionella recept.',
    followMeHere: 'Följ mig här:',
    since: 'Delar recept och inspiration sedan 2019',
    stats: {
      instagram: 'Instagram',
      tiktok: 'TikTok',
      youtube: 'YouTube',
      facebook: 'Facebook',
      followers: 'följare',
      subscribers: 'prenumeranter'
    }
  },
  recipes: {
    tagline: 'MATINSPIRATION',
    title: 'Populära recept',
    description: 'Upptäck mina mest omtyckta recept som kombinerar traditionell assyrisk/syriansk matlagning med moderna smaker och enkla tillagningsmetoder.',
    allRecipes: 'Alla recept',
    mainDishes: 'Huvudrätter',
    stews: 'Grytor',
    baking: 'Bakverk',
    seeAllRecipes: 'Se alla recept',
    discoverRecipes: 'autentiska recept från Mayka',
    minutes: 'min',
    portions: 'portioner',
    difficulty: 'Svårighet',
    rating: 'Betyg',
    reviews: 'recensioner',
    likes: 'gillar',
    showRecipe: 'Visa recept',
    show: 'Visa',
    backToHome: 'Tillbaka till startsidan',
    backToRecipes: 'Tillbaka till receptsamlingen',
    searchPlaceholder: 'Sök efter recept...',
    noResults: 'Inga recept hittades',
    noResultsDesc: 'Vi kunde inte hitta några recept som matchar din sökning.',
    showAll: 'Visa alla recept',
    popularSearches: 'Populära:',
    filter: 'Filter',
    popular: 'Populärt',
    showing: 'Visar',
    resultsFor: 'recept för',
    noMatch: 'Inga recept matchar sökningen',
    categories: {
      all: 'Alla recept',
      vegetarian: 'Vegetariskt',
      quick: 'Snabbt (under 30 min)',
      assyrian: 'Assyriskt',
      syrian: 'Syriskt',
      middleEastern: 'Mellanöstern',
      glutenFree: 'Glutenfritt',
      meat: 'Kött',
      fish: 'Fisk'
    },
    filters: {
      fish: 'Fisk',
      vegetarian: 'Vegetariskt',
      quick: 'Snabb',
      traditional: 'Traditionell',
      assyrian: 'Assyriskt',
      syrian: 'Syriskt'
    },
    getNewsletter: 'Få nya recept direkt i din inkorg',
    getNewRecipes: 'Få nya recept och matinspiration direkt i din inkorg varje månad.',
    exclusiveRecipes: 'Exklusiva recept',
    seasonalTips: 'Säsongsbaserade tips',
    techniques: 'Matlagningstekniker'
  },
  recipeDetails: {
    adjustPortions: 'Justera portioner',
    ingredients: 'Ingredienser',
    instructions: 'Gör såhär',
    howToMake: 'Gör såhär',
    tips: 'Tips & variationer',
    variations: 'Tips & variationer',
    allergens: 'Allergener:',
    nutrition: 'Näringsvärden',
    personalStory: 'En personlig berättelse',
    fromHeart: 'Från Maykas hjärta',
    printRecipe: 'Skriv ut',
    seeOnInstagram: 'Se på Instagram',
    saveRecipe: 'Spara',
    saved: 'Sparat',
    save: 'Spara',
    likeRecipe: 'Gilla receptet',
    liked: 'Gillad',
    like: 'Gilla',
    shareRecipe: 'Dela receptet',
    share: 'Dela',
    linkCopied: 'Länk kopierad till urklipp!',
    rateAndComment: 'Betygsätt & kommentera',
    yourRating: 'Ditt betyg:',
    stars: 'stjärnor',
    star: 'stjärna',
    yourName: 'Ditt namn',
    yourEmail: 'Din e-post (visas ej)',
    emailOptional: 'Din e-post (valfritt)',
    emailNotShown: '(visas ej)',
    writeComment: 'Skriv din kommentar här...',
    submitComment: 'Skicka kommentar',
    sending: 'Skickar...',
    thankYou: 'Tack för din kommentar! Den visas nu på sidan.',
    commentSuccess: 'Tack för din kommentar! Den visas nu på sidan.',
    nameRequired: 'Namn är obligatoriskt',
    commentRequired: 'Kommentar är obligatorisk',
    pleaseRate: 'Vänligen sätt ett betyg',
    errorSubmitting: 'Kunde inte spara kommentaren. Försök igen.',
    tryAgain: 'Försök igen',
    comments: 'Kommentarer',
    noComments: 'Inga kommentarer än. Bli först att kommentera!',
    beFirst: 'Bli först att kommentera!',
    loading: 'Laddar kommentarer...',
    calories: 'kcal',
    protein: 'Protein',
    carbs: 'Kolhydrater',
    fat: 'Fett',
    fiber: 'Fiber',
    salt: 'Salt',
    easy: 'Lätt',
    medium: 'Medel',
    hard: 'Svår',
    difficulty: {
      easy: 'Lätt',
      medium: 'Medel',
      hard: 'Svår'
    }
  },
  collaborations: {
    tagline: 'Samarbeten & Partnerships',
    title: 'Låt oss skapa tillsammans',
    description: 'Jag erbjuder kreativa samarbeten med varumärken som delar mina värderingar om autentisk matlagning och kvalitet.',
    whatIOffer: 'Vad jag erbjuder',
    myNumbers: 'Mina siffror',
    followers: 'följare',
    subscribers: 'prenumeranter',
    engagement: 'Engagemang',
    ageGroup: 'Åldersgrupp',
    highEngagement: 'Hög engagemang med autentisk målgrupp som älskar matlagning och kvalitetsprodukter.',
    previousCollabs: 'Tidigare samarbeten',
    collaborateWithMe: 'Vill du samarbeta med mig?',
    totalReach: 'total reach',
    professionalContent: 'Professional content',
    contactMe: 'Kontakta mig',
    offers: {
      campaigns: 'Samarbeten & kampanjer med autentiskt innehåll',
      recipedev: 'Receptutveckling & professionell matfoto',
      videos: 'Video, reels och TikToks med hög kvalitet',
      affiliate: 'Affiliate eller långsiktigt ambassadörskap',
      workshops: 'Matlagningsworkshops & events'
    }
  },
  contact: {
    tagline: 'Nå mig',
    title: 'Kontakta mig',
    description: 'Hör gärna av dig för samarbeten, frågor eller bara för att säga hej!',
    sendMessage: 'Skicka ett meddelande',
    contactInfo: 'Kontaktuppgifter',
    followMe: 'Följ mig',
    name: 'Namn',
    email: 'E-post',
    subject: 'Ämne',
    message: 'Meddelande',
    nameRequired: 'Namn är obligatoriskt',
    emailRequired: 'E-post är obligatoriskt',
    validEmail: 'Vänligen ange en giltig e-postadress',
    messageRequired: 'Meddelande är obligatoriskt',
    messageShort: 'Meddelandet är för kort (minst 10 tecken)',
    subscribe: 'Jag vill prenumerera på nyhetsbrevet och få de senaste recepten direkt i min inkorg.',
    subscribeDesc: 'Prenumerera på nyhetsbrevet',
    submitButton: 'Skicka meddelande',
    sending: 'Skickar...',
    thankYouTitle: 'Tack för ditt meddelande!',
    thankYouMessage: 'Jag återkommer till dig så snart som möjligt.',
    sendNew: 'Skicka ett nytt meddelande',
    location: 'Plats',
    availableSweden: 'Tillgänglig för uppdrag i hela Sverige',
    fastestResponse: 'Snabbast svar får du via Instagram DM',
    sendDM: 'Skicka DM',
    errorMessage: 'Något gick fel när ditt meddelande skulle skickas. Försök igen senare.',
    tryAgainLater: 'Försök igen senare',
    fixFormErrors: 'Vänligen åtgärda felen i formuläret.',
    subjectPlaceholder: 'Vad handlar ditt meddelande om?',
    messagePlaceholder: 'Skriv ditt meddelande här...'
  },
  newsletter: {
    title: 'Få matinspiration direkt i din inkorg',
    description: 'Prenumerera på mitt nyhetsbrev och få de senaste recepten, säsongsbaserade tips och exklusiva erbjudanden direkt till dig. Jag skickar ut mitt nyhetsbrev ungefär en gång i månaden.',
    emailPlaceholder: 'Din e-postadress',
    subscribe: 'Prenumerera',
    subscribeNow: '✨ Prenumerera nu - det är gratis!',
    subscribed: 'Tack för din prenumeration!',
    sending: 'Skickar...',
    thankYou: 'Tack för din prenumeration!',
    thankYouMessage: 'Du kommer nu få våra senaste recept direkt i din inkorg.',
    validEmail: 'Vänligen ange en giltig e-postadress.',
    errorMessage: 'Något gick fel. Försök igen senare.',
    privacy: 'Du kan avsluta prenumerationen när som helst. Vi respekterar din integritet.',
    privacyPolicy: 'integritetspolicy',
    benefits: {
      newRecipes: 'Nya recept varje månad',
      exclusiveRecipes: 'Exklusiva recept',
      seasonalTips: 'Säsongsbaserade tips',
      techniques: 'Matlagningstekniker'
    },
    popup: {
      title: '🌟 Få nya recept varje vecka!',
      description: 'Prenumerera på vårt nyhetsbrev och få de senaste recepten, säsongstips och exklusiva erbjudanden direkt i din inkorg.',
      subscribeButton: '✨ Prenumerera nu - det är gratis!',
      benefits: {
        weekly: 'Nya recept varje vecka',
        seasonal: 'Säsongsbaserade tips',
        exclusive: 'Exklusiva recept',
        techniques: 'Matlagningstekniker'
      }
    }
  },
  footer: {
    tagline: 'MaykasKitchen',
    description: 'Mat från hjärtat & tro i själen. Assyriska/Syrianska rötter, tacksam för min familj & kokar alltid med kärlek!',
    explore: 'Utforska',
    recipes: 'Recept',
    allRecipes: 'Alla recept',
    about: 'Om mig',
    collaborations: 'Samarbeten',
    contact: 'Kontakt',
    newsletter: 'Nyhetsbrev',
    newsletterDesc: 'Få nya recept och matinspiration direkt i din inkorg!',
    emailPlaceholder: 'Din e-post',
    subscribeButton: 'Prenumerera',
    copyright: 'Alla rättigheter förbehållna.',
    madeWith: 'Skapad med',
    in: 'i Skåne, Sverige',
    createdBy: 'Skapad av',
    benefits: {
      newRecipes: 'Nya recept varje månad',
      exclusiveRecipes: 'Exklusiva recept',
      seasonalTips: 'Säsongsbaserade tips',
      techniques: 'Matlagningstekniker'
    }
  },
  common: {
    loading: 'Laddar...',
    error: 'Fel',
    success: 'Framgång',
    close: 'Stäng',
    search: 'Sök',
    menu: 'Meny',
    openMenu: 'Öppna meny',
    closeMenu: 'Stäng meny',
    skipToContent: 'Hoppa till huvudinnehåll',
    backToTop: 'Tillbaka till toppen',
    back: 'Tillbaka',
    sweden: 'Sverige',
    experience: 'erfarenhet',
    years: 'år',
    or: 'eller',
    optional: 'valfritt'
  }
};

// English translations
export const en: Translations = {
  nav: {
    home: 'Home',
    about: 'About Me',
    recipes: 'Recipes',
    collaborations: 'Collaborations',
    contact: 'Contact',
    instagram: 'Instagram'
  },
  hero: {
    tagline: 'Assyrian/Syriac culinary art',
    title: 'Food from the heart & soul',
    description: 'Authentic recipes made with love',
    subtitle: 'Seasonal cooking that creates joy around the table for the whole family – rooted in authentic Assyrian/Syriac traditions.',
    exploreRecipes: 'Explore recipes',
    followMe: 'Follow me here:',
    scrollDown: 'Explore more',
    bookPreOrder: 'Pre-order my cookbook',
    bookTitle: 'Mayka\'s Green Kitchen - Kutle, hummus and love'
  },
  about: {
    tagline: 'Get to know me',
    title: 'Passion for cooking',
    subtitle: 'With Assyrian/Syriac roots and modern influences',
    description1: 'I am a chef, creator, and food influencer with a passion for seasonal food, gardening, and culinary joy for the whole family. Through my Assyrian/Syriac background, I have inherited a rich legacy of flavors and traditions that I love to share.',
    description2: 'With over 120,000 followers on Instagram and 62,000 on TikTok, I daily inspire thousands of people to cook more at home, with heart, soul, and simple ingredients. My food philosophy is about community, tradition, and modern everyday life in harmony.',
    community: 'Community',
    communityDesc: 'Active and loyal community that loves authentic recipes and food inspiration.',
    expertise: 'Expertise',
    expertiseDesc: 'Specialized in Assyrian/Syriac cuisine and modern interpretations of traditional recipes.',
    followMeHere: 'Follow me here:',
    since: 'Sharing recipes and inspiration since 2019',
    stats: {
      instagram: 'Instagram',
      tiktok: 'TikTok',
      youtube: 'YouTube',
      facebook: 'Facebook',
      followers: 'followers',
      subscribers: 'subscribers'
    }
  },
  recipes: {
    tagline: 'FOOD INSPIRATION',
    title: 'Popular recipes',
    description: 'Discover my most beloved recipes that combine traditional Assyrian/Syriac cooking with modern flavors and simple cooking methods.',
    allRecipes: 'All Recipes',
    mainDishes: 'Main Dishes',
    stews: 'Stews & Casseroles',
    baking: 'Baking & Desserts',
    seeAllRecipes: 'See all recipes',
    discoverRecipes: 'authentic recipes from Mayka',
    minutes: 'min',
    portions: 'portions',
    difficulty: 'Difficulty',
    rating: 'Rating',
    reviews: 'reviews',
    likes: 'likes',
    showRecipe: 'View recipe',
    show: 'View',
    backToHome: 'Back to homepage',
    backToRecipes: 'Back to recipe collection',
    searchPlaceholder: 'Search for recipes...',
    noResults: 'No recipes found',
    noResultsDesc: 'We couldn\'t find any recipes matching your search.',
    showAll: 'Show all recipes',
    popularSearches: 'Popular:',
    filter: 'Filter',
    popular: 'Popular',
    showing: 'Showing',
    resultsFor: 'recipes for',
    noMatch: 'No recipes match the search',
    categories: {
      all: 'All Recipes',
      vegetarian: 'Vegetarian',
      quick: 'Quick (under 30 min)',
      assyrian: 'Assyrian',
      syrian: 'Syrian',
      middleEastern: 'Middle Eastern',
      glutenFree: 'Gluten Free',
      meat: 'Meat',
      fish: 'Fish'
    },
    filters: {
      fish: 'Fish',
      vegetarian: 'Vegetarian',
      quick: 'Quick',
      traditional: 'Traditional',
      assyrian: 'Assyrian',
      syrian: 'Syrian'
    },
    getNewsletter: 'Get new recipes directly in your inbox',
    getNewRecipes: 'Get new recipes and food inspiration directly in your inbox every month.',
    exclusiveRecipes: 'Exclusive recipes',
    seasonalTips: 'Seasonal tips',
    techniques: 'Cooking techniques'
  },
  recipeDetails: {
    adjustPortions: 'Adjust servings',
    ingredients: 'Ingredients',
    instructions: 'Instructions',
    howToMake: 'How to make',
    tips: 'Tips & variations',
    variations: 'Tips & variations',
    allergens: 'Allergens:',
    nutrition: 'Nutrition',
    personalStory: 'A personal story',
    fromHeart: 'From Mayka\'s heart',
    printRecipe: 'Print',
    seeOnInstagram: 'See on Instagram',
    saveRecipe: 'Save recipe',
    saved: 'Saved',
    save: 'Save',
    likeRecipe: 'Like recipe',
    liked: 'Liked',
    like: 'Like',
    shareRecipe: 'Share recipe',
    share: 'Share',
    linkCopied: 'Link copied to clipboard!',
    rateAndComment: 'Rate & comment',
    yourRating: 'Your rating:',
    stars: 'stars',
    star: 'star',
    yourName: 'Your name',
    yourEmail: 'Your email (not shown)',
    emailOptional: 'Your email (optional)',
    emailNotShown: '(not shown)',
    writeComment: 'Write your comment here...',
    submitComment: 'Submit comment',
    sending: 'Sending...',
    thankYou: 'Thank you for your comment! It now appears on the page.',
    commentSuccess: 'Thank you for your comment! It now appears on the page.',
    nameRequired: 'Name is required',
    commentRequired: 'Comment is required',
    pleaseRate: 'Please provide a rating',
    errorSubmitting: 'Could not save comment. Please try again.',
    tryAgain: 'Try again',
    comments: 'Comments',
    noComments: 'No comments yet. Be the first to comment!',
    beFirst: 'Be the first to comment!',
    loading: 'Loading comments...',
    calories: 'kcal',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
    fiber: 'Fiber',
    salt: 'Salt',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    backToRecipes: 'Back to recipes',
    difficulty: {
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard'
    }
  },
  collaborations: {
    tagline: 'Collaborations & Partnerships',
    title: 'Let\'s create together',
    description: 'I offer creative collaborations with brands that share my values about authentic cooking and quality.',
    whatIOffer: 'What I offer',
    myNumbers: 'My numbers',
    followers: 'followers',
    subscribers: 'subscribers',
    engagement: 'Engagement',
    ageGroup: 'Age group',
    highEngagement: 'High engagement with authentic audience that loves cooking and quality products.',
    previousCollabs: 'Previous collaborations',
    collaborateWithMe: 'Want to collaborate with me?',
    totalReach: 'total reach',
    professionalContent: 'Professional content',
    contactMe: 'Contact me',
    offers: {
      campaigns: 'Collaborations & campaigns with authentic content',
      recipedev: 'Recipe development & professional food photography',
      videos: 'Videos, reels and TikToks with high quality',
      affiliate: 'Affiliate or long-term ambassadorship',
      workshops: 'Cooking workshops & events'
    }
  },
  contact: {
    tagline: 'Reach me',
    title: 'Contact me',
    description: 'Feel free to reach out for collaborations, questions, or just to say hello!',
    sendMessage: 'Send a message',
    contactInfo: 'Contact information',
    followMe: 'Follow me',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    nameRequired: 'Name is required',
    emailRequired: 'Email is required',
    validEmail: 'Please enter a valid email address',
    messageRequired: 'Message is required',
    messageShort: 'Message is too short (minimum 10 characters)',
    subscribe: 'I want to subscribe to the newsletter and get the latest recipes directly in my inbox.',
    subscribeDesc: 'Subscribe to newsletter',
    submitButton: 'Send message',
    sending: 'Sending...',
    thankYouTitle: 'Thank you for your message!',
    thankYouMessage: 'I will get back to you as soon as possible.',
    sendNew: 'Send a new message',
    location: 'Location',
    availableSweden: 'Available for assignments throughout Sweden',
    fastestResponse: 'Fastest response via Instagram DM',
    sendDM: 'Send DM',
    errorMessage: 'Something went wrong when your message was being sent. Please try again later.',
    tryAgainLater: 'Please try again later',
    fixFormErrors: 'Please fix the errors in the form.',
    subjectPlaceholder: 'What is your message about?',
    messagePlaceholder: 'Write your message here...'
  },
  newsletter: {
    title: 'Get food inspiration directly in your inbox',
    description: 'Subscribe to my newsletter and get the latest recipes, seasonal tips and exclusive offers directly to you. I send out my newsletter about once a month.',
    emailPlaceholder: 'Your email address',
    subscribe: 'Subscribe',
    subscribeNow: '✨ Subscribe now - it\'s free!',
    subscribed: 'Thank you for your subscription!',
    sending: 'Sending...',
    thankYou: 'Thank you for your subscription!',
    thankYouMessage: 'You will now receive our latest recipes directly in your inbox.',
    validEmail: 'Please enter a valid email address.',
    errorMessage: 'Something went wrong. Please try again later.',
    privacy: 'You can unsubscribe at any time. We respect your privacy.',
    privacyPolicy: 'privacy policy',
    benefits: {
      newRecipes: 'New recipes every month',
      exclusiveRecipes: 'Exclusive recipes',
      seasonalTips: 'Seasonal tips',
      techniques: 'Cooking techniques'
    },
    popup: {
      title: '🌟 Get new recipes every week!',
      description: 'Subscribe to our newsletter and get the latest recipes, seasonal tips and exclusive offers directly in your inbox.',
      subscribeButton: '✨ Subscribe now - it\'s free!',
      benefits: {
        weekly: 'New recipes every week',
        seasonal: 'Seasonal tips',
        exclusive: 'Exclusive recipes',
        techniques: 'Cooking techniques'
      }
    }
  },
  footer: {
    tagline: 'MaykasKitchen',
    description: 'Food from the heart & faith in the soul. Assyrian/Syriac roots, grateful for my family & always cook with love!',
    explore: 'Explore',
    recipes: 'Recipes',
    allRecipes: 'All recipes',
    about: 'About me',
    collaborations: 'Collaborations',
    contact: 'Contact',
    newsletter: 'Newsletter',
    newsletterDesc: 'Get new recipes and food inspiration directly in your inbox!',
    emailPlaceholder: 'Your email',
    subscribeButton: 'Subscribe',
    copyright: 'All rights reserved.',
    madeWith: 'Made with',
    in: 'in Skåne, Sweden',
    createdBy: 'Created by',
    benefits: {
      newRecipes: 'New recipes every month',
      exclusiveRecipes: 'Exclusive recipes',
      seasonalTips: 'Seasonal tips',
      techniques: 'Cooking techniques'
    }
  },
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    close: 'Close',
    search: 'Search',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skipToContent: 'Skip to main content',
    backToTop: 'Back to top',
    back: 'Back',
    sweden: 'Sweden',
    experience: 'experience',
    years: 'years',
    or: 'or',
    optional: 'optional'
  }
};

// Translation context and hook
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage first, then browser language, default to Swedish
    const saved = localStorage.getItem('preferred-language') as Language;
    if (saved && (saved === 'sv' || saved === 'en')) {
      return saved;
    }
    
    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('en')) {
      return 'en';
    }
    
    return 'sv'; // Default to Swedish
  });

  useEffect(() => {
    localStorage.setItem('preferred-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const translations = language === 'en' ? en : sv;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
