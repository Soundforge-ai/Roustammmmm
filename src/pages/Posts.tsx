import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import OptimizedImage from '../components/ui/OptimizedImage';

// Hardcoded blog posts voor directe SEO impact
const BLOG_POSTS = [
  {
    id: 'ramen-prijzen-2025',
    title: 'Hoeveel kosten nieuwe ramen in 2025? Prijzen per m² + Premies',
    slug: 'ramen-prijzen-2025',
    excerpt: 'Ontdek de actuele prijzen voor PVC en aluminium ramen. Alles over de kosten, montage en de Mijn VerbouwPremie in 2025.',
    image: '/images/c042e299-3e07-4212-b6a2-5c6297e61d69.jpg',
    date: '2025-01-07',
    category: 'Ramen & Deuren',
    readTime: '5 min'
  },
  {
    id: 'pvc-vs-aluminium',
    title: 'PVC of Aluminium ramen? De eerlijke vergelijking (2025)',
    slug: 'pvc-vs-aluminium',
    excerpt: 'Wat is de beste keuze voor uw woning? Wij vergelijken isolatie, prijs, levensduur en uitstraling in een helder overzicht.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80',
    date: '2025-01-07',
    category: 'Keuzehulp',
    readTime: '7 min'
  },
  // Hier kunnen we later meer posts toevoegen
];

const Posts: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Bouwadvies & Tips | Yannova Blog</title>
        <meta name="description" content="Lees onze laatste artikelen over renovatie, ramen, deuren en isolatie. Expert advies van Yannova Bouw voor uw project in Zoersel en omgeving." />
      </Helmet>

      {/* Hero */}
      <section className="bg-brand-dark text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kennisbank & Advies</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Antwoorden op al uw vragen over bouwen en verbouwen. Van prijzen en premies tot materiaalkeuzes.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col">
                <Link to={`/posts/${post.slug}`} className="block overflow-hidden h-56 relative">
                  <div className="absolute top-4 left-4 z-10 bg-brand-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {post.category}
                  </div>
                  <OptimizedImage 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                  />
                </Link>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date(post.date).toLocaleDateString('nl-BE')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <Link to={`/posts/${post.slug}`} className="block">
                    <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  <Link 
                    to={`/posts/${post.slug}`}
                    className="inline-flex items-center gap-2 text-brand-accent font-bold hover:text-orange-700 transition-colors mt-auto"
                  >
                    Lees volledig artikel <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Posts;