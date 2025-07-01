import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, Calendar, User, ArrowLeft, BookOpen, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const BlogArticle = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [article, setArticle] = useState(null);

  // Mock articles data (in real app, this would come from API)
  const articlesData = {
    'art-excellence-metiers-francais': {
      id: 1,
      title: "L'Art de l'Excellence : Découverte des Métiers d'Art Français",
      subtitle: "Un voyage au cœur du patrimoine artisanal français",
      author: {
        name: "Marie Dubois",
        role: "Experte en Patrimoine Culturel",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      publishDate: "15 Juillet 2024",
      readTime: "8 min de lecture",
      category: "Patrimoine",
      tags: ["Art", "Patrimoine", "France", "Artisanat"],
      coverImages: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
      ],
      content: `
        <p>Dans un monde où la technologie règne en maître, les métiers d'art français continuent de fasciner par leur authenticité et leur excellence. Ces savoir-faire ancestraux, transmis de génération en génération, représentent l'âme même de notre patrimoine culturel.</p>

        <h2>Un Héritage Millénaire</h2>
        <p>La France compte plus de 300 métiers d'art officiellement reconnus, de la marqueterie à la verrerie d'art, en passant par la tapisserie et l'orfèvrerie. Chacun de ces métiers raconte une histoire, celle d'hommes et de femmes passionnés qui ont su préserver et faire évoluer des techniques séculaires.</p>

        <blockquote>
          "L'artisanat d'art, c'est la rencontre entre la tradition et l'innovation, entre le geste ancestral et la créativité contemporaine."
          <cite>— Jean-Claude Bellanger, Maître Artisan</cite>
        </blockquote>

        <h2>Les Gardiens de la Tradition</h2>
        <p>Dans les ateliers dispersés aux quatre coins de l'Hexagone, les artisans d'art perpétuent des gestes millénaires. Leurs mains expertes façonnent la matière avec une précision que seule l'expérience peut conférer.</p>

        <h3>Les Régions d'Excellence</h3>
        <p>Chaque région de France possède ses spécialités : la cristallerie en Lorraine, la dentelle en Normandie, la céramique en Provence. Cette diversité géographique enrichit notre patrimoine artisanal et lui confère une identité unique.</p>

        <h2>Un Avenir Prometteur</h2>
        <p>Loin d'être figés dans le passé, les métiers d'art évoluent et s'adaptent aux défis contemporains. Les nouvelles générations d'artisans intègrent les technologies modernes tout en préservant l'essence de leur art.</p>
      `,
      stats: {
        views: 2547,
        likes: 189,
        comments: 23
      }
    },
    'chateaux-loire-renaissance': {
      id: 2,
      title: "Les Châteaux de la Loire : Joyaux de la Renaissance",
      subtitle: "Architecture et histoire des merveilles de la vallée de la Loire",
      author: {
        name: "Pierre Moreau",
        role: "Historien de l'Architecture",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      publishDate: "12 Juillet 2024",
      readTime: "6 min de lecture",
      category: "Architecture",
      tags: ["Châteaux", "Loire", "Renaissance", "Histoire"],
      coverImages: [
        "https://images.unsplash.com/photo-1549813069-f95e44d7f498?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1549813069-f95e44d7f498?w=800&h=600&fit=crop"
      ],
      content: `
        <p>Les châteaux de la Loire incarnent l'apogée de l'art de vivre français, témoins d'une époque où l'art et le pouvoir se conjuguaient dans la pierre. Ces merveilles architecturales nous racontent l'histoire de la Renaissance française.</p>

        <h2>L'Héritage de la Renaissance</h2>
        <p>Au XVIe siècle, la vallée de la Loire devient le théâtre d'une révolution architecturale. Les rois de France, inspirés par les merveilles italiennes, transforment leurs résidences en véritables joyaux artistiques.</p>

        <blockquote>
          "Les châteaux de la Loire ne sont pas seulement des monuments, ils sont la cristallisation d'un rêve royal, celui d'une France rayonnante."
          <cite>— André Malraux</cite>
        </blockquote>

        <h2>Chambord : Le Rêve de François Ier</h2>
        <p>Chambord demeure l'exemple le plus spectaculaire de cette ambition royale. Son escalier à vis double, attribué à Léonard de Vinci, symbolise l'ingéniosité française.</p>

        <h3>Un Patrimoine Vivant</h3>
        <p>Aujourd'hui, ces châteaux continuent d'émerveiller les visiteurs du monde entier, témoignant de la grandeur passée et de l'excellence française en matière de patrimoine.</p>
      `,
      stats: {
        views: 1823,
        likes: 145,
        comments: 18
      }
    }
  };

  const recentArticles = [
    {
      id: 3,
      slug: 'gastronomie-francaise-art-vivre',
      title: "Gastronomie Française : L'Art de Vivre à la Française",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop",
      date: "10 Juillet 2024",
      readTime: "5 min"
    },
    {
      id: 4,
      slug: 'festivals-ete-celebration-culture',
      title: "Les Festivals d'Été : Célébration de la Culture",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
      date: "8 Juillet 2024",
      readTime: "7 min"
    },
    {
      id: 5,
      slug: 'jardins-francais-art-paysage',
      title: "Jardins à la Française : L'Art du Paysage",
      image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=300&h=200&fit=crop",
      date: "5 Juillet 2024",
      readTime: "9 min"
    }
  ];

  useEffect(() => {
    // In real app, fetch article by slug from API
    const articleData = articlesData[slug];
    if (articleData) {
      setArticle(articleData);
    } else {
      // Handle article not found
      navigate('/blog');
    }
  }, [slug, navigate]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#242328] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold mb-2">Article introuvable</h2>
          <p className="text-gray-400 mb-6">L'article que vous recherchez n'existe pas.</p>
          <Button
            onClick={() => navigate('/blog')}
            className="bg-[#D6B769] text-black hover:bg-[#D6B769]/90"
          >
            Retour au blog
          </Button>
        </div>
      </div>
    );
  }

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShare = () => {
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000);
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.subtitle,
        url: window.location.href
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#242328] text-white">
      {/* Header */}
      <header className="border-b border-[#27282C] bg-[#242328]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#D6B769] hover:bg-[#D6B769]/10 hover:text-[#D6B769]"
                onClick={() => navigate('/blog')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au blog
              </Button>
              <div className="h-6 w-px bg-[#27282C]" />
              <div className="text-2xl font-bold text-[#D6B769]">VALENTIA</div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavorite}
                className={`transition-all duration-300 ${
                  isFavorited 
                    ? 'text-[#D6B769] bg-[#D6B769]/10' 
                    : 'text-gray-400 hover:text-[#D6B769] hover:bg-[#D6B769]/10'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className={`transition-all duration-300 ${
                  isShared 
                    ? 'text-[#D6B769] bg-[#D6B769]/10' 
                    : 'text-gray-400 hover:text-[#D6B769] hover:bg-[#D6B769]/10'
                }`}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-2">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge variant="secondary" className="bg-[#D6B769] text-black hover:bg-[#D6B769]/90">
                  {article.category}
                </Badge>
                {article.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-[#27282C] text-gray-300 hover:border-[#D6B769] hover:text-[#D6B769]">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight text-white">
                {article.title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {article.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <img 
                    src={article.author.avatar} 
                    alt={article.author.name}
                    className="w-10 h-10 rounded-full border-2 border-[#D6B769]"
                  />
                  <div>
                    <div className="text-white font-medium">{article.author.name}</div>
                    <div className="text-xs">{article.author.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {article.publishDate}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </div>
              </div>
            </div>

            {/* Cover Images */}
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-[#27282C] rounded-lg border border-[#27282C]">
                {article.coverImages.map((image, index) => (
                  <div key={index} className="aspect-[4/3] overflow-hidden rounded-md border border-[#D6B769]/20">
                    <img 
                      src={image} 
                      alt={`Cover ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg prose-invert max-w-none"
              style={{
                '--tw-prose-body': '#e5e7eb',
                '--tw-prose-headings': '#ffffff',
                '--tw-prose-quotes': '#D6B769',
                '--tw-prose-quote-borders': '#D6B769',
                '--tw-prose-captions': '#9ca3af',
                '--tw-prose-code': '#D6B769',
                '--tw-prose-pre-code': '#e5e7eb',
                '--tw-prose-pre-bg': '#27282C',
              }}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Article Stats */}
            <div className="mt-12 pt-8 border-t border-[#27282C]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <span>{article.stats.views} vues</span>
                  <span>{article.stats.likes} j'aime</span>
                  <span>{article.stats.comments} commentaires</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFavorite}
                    className={`border-[#D6B769] transition-all duration-300 ${
                      isFavorited 
                        ? 'text-black bg-[#D6B769] hover:bg-[#D6B769]/90' 
                        : 'text-[#D6B769] hover:bg-[#D6B769] hover:text-black'
                    }`}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                    {isFavorited ? 'Ajouté aux favoris' : 'Ajouter aux favoris'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="border-[#D6B769] text-[#D6B769] hover:bg-[#D6B769] hover:text-black transition-all duration-300"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* About Section */}
            <Card className="bg-[#27282C] border-[#27282C]">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-[#D6B769]">À Propos</h3>
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={article.author.avatar} 
                    alt={article.author.name}
                    className="w-16 h-16 rounded-full border-2 border-[#D6B769]"
                  />
                  <div>
                    <h4 className="font-bold text-white">{article.author.name}</h4>
                    <p className="text-sm text-gray-400 mb-2">{article.author.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Spécialiste du patrimoine culturel français avec plus de 15 ans d'expérience dans la valorisation des métiers d'art traditionnels.
                </p>
              </CardContent>
            </Card>

            {/* Recent Articles */}
            <Card className="bg-[#27282C] border-[#27282C]">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 text-[#D6B769] flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Articles Récents
                </h3>
                <div className="space-y-4">
                  {recentArticles.map((recentArticle) => (
                    <div 
                      key={recentArticle.id} 
                      className="group cursor-pointer"
                      onClick={() => navigate(`/blog/${recentArticle.slug}`)}
                    >
                      <div className="flex gap-3">
                        <div className="w-16 h-16 rounded-md overflow-hidden border border-[#D6B769]/20">
                          <img 
                            src={recentArticle.image} 
                            alt={recentArticle.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white group-hover:text-[#D6B769] transition-colors duration-300 line-clamp-2">
                            {recentArticle.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                            <span>{recentArticle.date}</span>
                            <span>•</span>
                            <span>{recentArticle.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="bg-gradient-to-br from-[#D6B769]/10 to-[#D6B769]/5 border-[#D6B769]/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-[#D6B769]">Newsletter</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Recevez nos derniers articles sur le patrimoine français directement dans votre boîte mail.
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Votre adresse email"
                    className="w-full px-3 py-2 bg-[#242328] border border-[#27282C] rounded-md text-white placeholder-gray-400 focus:border-[#D6B769] focus:outline-none focus:ring-1 focus:ring-[#D6B769] transition-colors duration-300"
                  />
                  <Button className="w-full bg-[#D6B769] text-black hover:bg-[#D6B769]/90 transition-colors duration-300">
                    S'abonner
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

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

export default BlogArticle;