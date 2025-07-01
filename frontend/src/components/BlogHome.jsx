import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Heart, Share2, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const BlogHome = () => {
  const navigate = useNavigate();
  const [visibleArticles, setVisibleArticles] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  // Mock articles data
  const articles = [
    {
      id: 1,
      slug: 'art-excellence-metiers-francais',
      title: "L'Art de l'Excellence : Découverte des Métiers d'Art Français",
      subtitle: "Un voyage au cœur du patrimoine artisanal français",
      excerpt: "Dans un monde où la technologie règne en maître, les métiers d'art français continuent de fasciner par leur authenticité et leur excellence...",
      author: {
        name: "Marie Dubois",
        role: "Experte en Patrimoine Culturel",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      publishDate: "15 Juillet 2024",
      readTime: "8 min",
      category: "Patrimoine",
      tags: ["Art", "Patrimoine", "France", "Artisanat"],
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      featured: true,
      stats: { views: 2547, likes: 189 }
    },
    {
      id: 2,
      slug: 'chateaux-loire-renaissance',
      title: "Les Châteaux de la Loire : Joyaux de la Renaissance",
      subtitle: "Architecture et histoire des merveilles de la vallée de la Loire",
      excerpt: "Les châteaux de la Loire incarnent l'apogée de l'art de vivre français, témoins d'une époque où l'art et le pouvoir se conjuguaient dans la pierre...",
      author: {
        name: "Pierre Moreau",
        role: "Historien de l'Architecture",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      publishDate: "12 Juillet 2024",
      readTime: "6 min",
      category: "Architecture",
      tags: ["Châteaux", "Loire", "Renaissance", "Histoire"],
      thumbnail: "https://images.unsplash.com/photo-1549813069-f95e44d7f498?w=600&h=400&fit=crop",
      featured: false,
      stats: { views: 1823, likes: 145 }
    },
    {
      id: 3,
      slug: 'gastronomie-francaise-art-vivre',
      title: "Gastronomie Française : L'Art de Vivre à la Française",
      subtitle: "Découverte des secrets de la cuisine française",
      excerpt: "La gastronomie française est bien plus qu'une simple cuisine : c'est un art de vivre, une philosophie qui célèbre les plaisirs de la table...",
      author: {
        name: "Sophie Laurent",
        role: "Critique Gastronomique",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      publishDate: "10 Juillet 2024",
      readTime: "5 min",
      category: "Gastronomie",
      tags: ["Cuisine", "France", "Tradition", "Culture"],
      thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
      featured: false,
      stats: { views: 2156, likes: 203 }
    },
    {
      id: 4,
      slug: 'festivals-ete-celebration-culture',
      title: "Les Festivals d'Été : Célébration de la Culture",
      subtitle: "Guide des événements culturels incontournables",
      excerpt: "L'été français vibre au rythme des festivals, ces rendez-vous magiques où la culture prend vie dans des cadres exceptionnels...",
      author: {
        name: "Antoine Dubois",
        role: "Critique Culturel",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      publishDate: "8 Juillet 2024",
      readTime: "7 min",
      category: "Culture",
      tags: ["Festivals", "Été", "Musique", "Théâtre"],
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      featured: false,
      stats: { views: 1654, likes: 127 }
    },
    {
      id: 5,
      slug: 'jardins-francais-art-paysage',
      title: "Jardins à la Française : L'Art du Paysage",
      subtitle: "Histoire et secrets des jardins royaux",
      excerpt: "Les jardins à la française représentent l'apogée de l'art paysager, où la nature domestiquée révèle sa beauté géométrique...",
      author: {
        name: "Isabelle Martin",
        role: "Paysagiste Historienne",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      publishDate: "5 Juillet 2024",
      readTime: "9 min",
      category: "Paysage",
      tags: ["Jardins", "Paysage", "Histoire", "Design"],
      thumbnail: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=600&h=400&fit=crop",
      featured: true,
      stats: { views: 1432, likes: 98 }
    },
    {
      id: 6,
      slug: 'mode-francaise-elegance-intemporelle',
      title: "Mode Française : Élégance Intemporelle",
      subtitle: "L'influence de Paris sur la mode mondiale",
      excerpt: "Paris, capitale mondiale de la mode, continue d'inspirer et de définir les tendances avec son élégance intemporelle...",
      author: {
        name: "Camille Rousseau",
        role: "Journaliste Mode",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
      },
      publishDate: "3 Juillet 2024",
      readTime: "6 min",
      category: "Mode",
      tags: ["Mode", "Paris", "Élégance", "Design"],
      thumbnail: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
      featured: false,
      stats: { views: 2891, likes: 267 }
    }
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const articleId = parseInt(entry.target.getAttribute('data-article-id'));
            setVisibleArticles(prev => new Set([...prev, articleId]));
          }
        });
      },
      { threshold: 0.3, rootMargin: '-50px' }
    );

    const articleElements = document.querySelectorAll('[data-article-id]');
    articleElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredArticles]);

  const handleArticleClick = (slug) => {
    navigate(`/blog/${slug}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString.split(' ').reverse().join(' '));
    const day = date.getDate();
    const month = date.toLocaleDateString('fr-FR', { month: 'long' });
    const year = date.getFullYear();
    return { day, month, year };
  };

  return (
    <div className="min-h-screen bg-[#242328] text-white">
      {/* Header */}
      <header className="border-b border-[#27282C] bg-[#242328]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="text-3xl font-bold text-[#D6B769]">VALENTIA</div>
              <nav className="hidden md:flex items-center space-x-8">
                <a href="/" className="text-gray-300 hover:text-[#D6B769] transition-colors duration-300">Accueil</a>
                <a href="/blog" className="text-[#D6B769] font-medium">Blog</a>
                <a href="/experiences" className="text-gray-300 hover:text-[#D6B769] transition-colors duration-300">Expériences</a>
                <a href="/patrimoine" className="text-gray-300 hover:text-[#D6B769] transition-colors duration-300">Patrimoine</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-[#27282C] border border-[#27282C] rounded-lg text-white placeholder-gray-400 focus:border-[#D6B769] focus:outline-none focus:ring-1 focus:ring-[#D6B769] transition-colors duration-300 w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-[#D6B769] to-white bg-clip-text text-transparent">
            Journal Valentia
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Découvrez l'excellence du patrimoine français à travers nos récits d'experts
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D6B769] to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative max-w-6xl mx-auto px-6 pb-20">
        {/* Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#D6B769] via-[#D6B769]/30 to-transparent transform md:-translate-x-1/2"></div>

        {/* Articles */}
        <div className="space-y-16">
          {filteredArticles.map((article, index) => {
            const isVisible = visibleArticles.has(article.id);
            const isLeft = index % 2 === 0;
            const dateInfo = formatDate(article.publishDate);

            return (
              <div
                key={article.id}
                data-article-id={article.id}
                className={`relative transition-all duration-1000 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index % 3 * 200}ms` }}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-8 md:left-1/2 w-6 h-6 bg-[#D6B769] rounded-full border-4 border-[#242328] transform md:-translate-x-1/2 z-10 transition-all duration-500 ${
                  isVisible ? 'scale-100 shadow-lg shadow-[#D6B769]/50' : 'scale-75'
                }`}>
                  <div className="absolute inset-1 bg-[#242328] rounded-full"></div>
                </div>

                {/* Article Card */}
                <div className={`md:w-1/2 ml-16 md:ml-0 ${
                  isLeft ? 'md:pr-12' : 'md:ml-auto md:pl-12'
                }`}>
                  <Card 
                    className={`bg-[#27282C] border-[#27282C] hover:border-[#D6B769]/30 transition-all duration-500 cursor-pointer group overflow-hidden ${
                      isVisible ? 'hover:shadow-2xl hover:shadow-[#D6B769]/10' : ''
                    } ${article.featured ? 'ring-1 ring-[#D6B769]/20' : ''}`}
                    onClick={() => handleArticleClick(article.slug)}
                  >
                    <CardContent className="p-0">
                      {/* Date Badge */}
                      <div className={`absolute top-4 ${isLeft ? 'md:right-4' : 'md:left-4'} right-4 z-10`}>
                        <div className="bg-[#D6B769] text-black px-4 py-2 rounded-lg font-bold text-center shadow-lg">
                          <div className="text-2xl leading-none">{dateInfo.day}</div>
                          <div className="text-xs uppercase">{dateInfo.month}</div>
                          <div className="text-xs">{dateInfo.year}</div>
                        </div>
                      </div>

                      {/* Featured Badge */}
                      {article.featured && (
                        <div className={`absolute top-4 ${isLeft ? 'md:left-4' : 'md:right-4'} left-4 z-10`}>
                          <Badge className="bg-gradient-to-r from-[#D6B769] to-[#D6B769]/80 text-black font-bold">
                            ✨ À la une
                          </Badge>
                        </div>
                      )}

                      {/* Thumbnail */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#242328]/80 via-transparent to-transparent"></div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="secondary" className="bg-[#D6B769]/20 text-[#D6B769] hover:bg-[#D6B769]/30">
                            {article.category}
                          </Badge>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {article.readTime}
                            </span>
                            <span>{article.stats.views} vues</span>
                          </div>
                        </div>
                        
                        <h2 className="text-2xl font-bold mb-3 group-hover:text-[#D6B769] transition-colors duration-300 line-clamp-2">
                          {article.title}
                        </h2>
                        
                        <p className="text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                          {article.subtitle}
                        </p>
                        
                        <p className="text-sm text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>

                        {/* Author & Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={article.author.avatar}
                              alt={article.author.name}
                              className="w-10 h-10 rounded-full border-2 border-[#D6B769]/30"
                            />
                            <div>
                              <div className="text-sm font-medium text-white">{article.author.name}</div>
                              <div className="text-xs text-gray-400">{article.author.role}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-[#D6B769] hover:bg-[#D6B769]/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                            >
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-[#D6B769] hover:bg-[#D6B769]/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#D6B769] hover:bg-[#D6B769]/10 ml-2"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#242328]">
                          {article.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              variant="outline"
                              className="border-[#D6B769]/20 text-gray-400 hover:border-[#D6B769] hover:text-[#D6B769] text-xs transition-colors duration-300"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">Aucun article trouvé</h3>
            <p className="text-gray-400">Essayez une autre recherche ou explorez nos catégories</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-[#27282C] border-t border-[#27282C] mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold text-[#D6B769] mb-4">VALENTIA</div>
              <p className="text-gray-400 mb-6 max-w-md">
                Découvrez l'excellence du patrimoine français à travers nos expériences authentiques et nos guides experts.
              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                  <Button key={social} variant="ghost" size="sm" className="text-gray-400 hover:text-[#D6B769] hover:bg-[#D6B769]/10">
                    {social}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Découvrir</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#D6B769] transition-colors duration-300">Expériences</a></li>
                <li><a href="#" className="hover:text-[#D6B769] transition-colors duration-300">Patrimoine</a></li>
                <li><a href="#" className="hover:text-[#D6B769] transition-colors duration-300">Culture</a></li>
                <li><a href="#" className="hover:text-[#D6B769] transition-colors duration-300">Gastronomie</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#D6B769] transition-colors duration-300">Contact</a></li>
                <li><a href="#" className="hover:text-[#D6B769] transition-colors duration-300">FAQ</a></li>
                <li><a href="#" className="hover:text-[#D6B769] transition-colors duration-300">Aide</a></li>
                <li><a href="#" className="hover:text-[#D6B769] transition-colors duration-300">Conditions</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#242328] mt-8 pt-6 text-center text-sm text-gray-400">
            <p>&copy; 2024 Valentia. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogHome;