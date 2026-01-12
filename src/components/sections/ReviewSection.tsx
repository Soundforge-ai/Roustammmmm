import React from 'react';
import { Star, MessageSquare, ExternalLink, ThumbsUp } from 'lucide-react';

const ReviewSection: React.FC = () => {
    const reviewUrl = 'https://search.google.com/local/writereview?placeid=ChIJo-X_Z-_Aw0cRMLZNmZxNbZ0';
    const googleBusinessUrl = 'https://g.page/yannova-bouw';

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-brand-light rounded-3xl p-8 md:p-12 border border-brand-accent/10 relative overflow-hidden">
                        {/* Decoratie */}
                        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl"></div>

                        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-sm font-bold mb-6">
                                    <Star size={14} className="fill-brand-accent" />
                                    <span>KLANTTEVREDENHEID</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                                    Bent u tevreden over ons werk?
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                    Uw feedback helpt ons niet alleen om te groeien, maar helpt ook anderen bij het kiezen van de juiste partner voor hun project. 
                                    Een kleine moeite voor u, een wereld van verschil voor ons familiebedrijf.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={reviewUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-brand-accent hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:-translate-y-1"
                                    >
                                        <MessageSquare size={20} />
                                        Schrijf een review
                                    </a>
                                    <a
                                        href={googleBusinessUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white text-brand-dark border border-gray-200 px-8 py-4 rounded-xl font-bold transition-all hover:bg-gray-50 flex items-center justify-center gap-2"
                                    >
                                        Bekijk alle reviews
                                        <ExternalLink size={18} />
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-brand-dark rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                        G
                                    </div>
                                    <div>
                                        <div className="flex text-yellow-400 gap-0.5 mb-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={18} className="fill-current" />
                                            ))}
                                        </div>
                                        <p className="font-bold text-brand-dark">Yannova Bouw op Google</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="p-4 bg-gray-50 rounded-lg italic text-gray-600 text-sm">
                                        "Heel professioneel team. De ramen zijn perfect geplaatst en de afwerking van de crepi is boven verwachting. Een aanrader!"
                                    </div>
                                    
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <ThumbsUp size={16} className="text-brand-accent" />
                                            <span>4.9/5 op basis van 47+ ervaringen</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;
