import { useState } from "react";
import { Link } from "react-router-dom";
import { ChefHat, Clock, Users, Search, Filter } from "lucide-react";

const Recept = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("alla");

  const recipes = [
    {
      id: "lax-risbowl",
      title: "Kryddig Lax- & Risbowl",
      image: "https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC8y19NS5037zrR9qXSut4TKmZEpjlBcOhHew0",
      time: "30 min",
      servings: "4",
      category: "huvudratt",
      description: "En vårig smakexplosion! Perfekt som fräsch vardagsmiddag eller när du vill lyxa till lunchen."
    },
    {
      id: "mellanoestern-koettbullar",
      title: "Mellanöstern-köttbullar",
      image: "https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC2bVVcBHX4Xuw0sOU5gWozk6clEfde8bBYInQ",
      time: "45 min",
      servings: "5-6",
      category: "huvudratt",
      description: "Köttbullar som får koka tillsammans med potatis i en smakrik tomatsås. En barndomsfavorit!"
    },
    {
      id: "pasta-pesto-halloumi",
      title: "Pasta Pesto med Ugnsbakade Tomater & Stekt Halloumi",
      image: "https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCfVuc1HC48dYxTFVG4qu9OSWrN21vZPBkJiCo",
      time: "25 min",
      servings: "4",
      category: "huvudratt",
      description: "En smakrik, krämig och färgsprakande pastarätt som snabbt blivit en favorit hos både stora och små."
    }
  ];

  const categories = [
    { id: "alla", name: "Alla recept" },
    { id: "huvudratt", name: "Huvudrätter" }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "alla" || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-orange-50" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fed7aa' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <ChefHat className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                  MaykasKitchen
                </h1>
                <p className="text-sm text-orange-600">Autentisk Assyrisk & Syriansk Matlagning</p>
              </div>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                Hem
              </Link>
              <Link to="/recept" className="text-orange-600 font-medium">
                Recept
              </Link>
              <Link to="/om" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                Om oss
              </Link>
            </nav>

            <div className="flex space-x-4">
              <a href="https://www.instagram.com/maykaskitchen" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 text-xl transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/maykaskitchen" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-xl transition-colors">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.tiktok.com/@maykaskitchen" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900 text-xl transition-colors">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20" style={{ 
        background: 'linear-gradient(135deg, #fef7ec, #fcd34d, #f97316)',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fed7aa' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Alla Recept ✨
          </h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
            Upptäck vårt kompletta bibliotek med läckra recept från assyriskt/syrianskt kök. 
            Från snabba vardagsrätter till festliga desserter - här hittar du inspiration för alla måltider.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8" style={{ boxShadow: '0 10px 25px rgba(251, 146, 60, 0.2)' }}>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Sök efter recept..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-orange-100 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-8 py-4 border-2 border-orange-100 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-lg min-w-48"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-8">
          <p className="text-gray-600 text-lg">
            Visar <span className="font-semibold text-orange-600">{filteredRecipes.length}</span> av <span className="font-semibold">{recipes.length}</span> recept
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <article
              key={recipe.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2"
              style={{ boxShadow: '0 10px 25px rgba(251, 146, 60, 0.2)' }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={recipe.image}
                  alt={`Bild på ${recipe.title}`}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-orange-600 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <Link to={`/recept/${recipe.id}`} className="hover:underline">
                    {recipe.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {recipe.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-orange-600">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{recipe.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-orange-600">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{recipe.servings} port</span>
                  </div>
                </div>

                <Link 
                  to={`/recept/${recipe.id}`}
                  className="mt-4 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 text-center block"
                >
                  Visa recept
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Inga recept hittades
            </h3>
            <p className="text-gray-500 text-lg mb-6">Inga recept matchar din sökning just nu.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("alla");
              }}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
            >
              Rensa filter
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <ChefHat className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>MaykasKitchen</h3>
                  <p className="text-gray-400">Autentisk Assyrisk & Syriansk Matlagning</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Digital creator & kock som delar kärlek för traditionell matlagning med moderna influenser. 
                Mamma, fru och full av energi.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/maykaskitchen" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 text-2xl transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.facebook.com/maykaskitchen" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 text-2xl transition-colors">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="https://www.tiktok.com/@maykaskitchen" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200 text-2xl transition-colors">
                  <i className="fab fa-tiktok"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Snabblänkar</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-orange-400 transition-colors">Hem</Link></li>
                <li><Link to="/recept" className="text-gray-400 hover:text-orange-400 transition-colors">Recept</Link></li>
                <li><Link to="/om" className="text-gray-400 hover:text-orange-400 transition-colors">Om oss</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Populära Kategorier</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-400">Assyriska rätter</span></li>
                <li><span className="text-gray-400">Syrianska specialiteter</span></li>
                <li><span className="text-gray-400">Vegetariska recept</span></li>
                <li><span className="text-gray-400">Familjemiddagar</span></li>
                <li><span className="text-gray-400">Helgbak</span></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 MaykasKitchen. Med kärlek från Skåne, Sverige 🇸🇪
            </p>
            <p className="text-gray-500 text-sm mt-2">
              "Alltså, om någon är i Kristus är han en ny skapelse. Det gamla är förbi, något nytt har kommit." - 2 Kor 5:17
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Recept;