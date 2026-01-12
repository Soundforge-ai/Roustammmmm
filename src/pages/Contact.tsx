import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, Send } from 'lucide-react';
// import emailjs from '@emailjs/browser'; // Removed in favor of FormSubmit
import GoogleMap from '../components/ui/GoogleMap';
import SEO from '@/components/seo/SEO';

// Company location
const COMPANY_ADDRESS = 'De Beemdekens 39, 2980 Zoersel, België';
const COMPANY_COORDINATES = { lat: 51.2667, lng: 4.6167 }; // Zoersel coordinates

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    houseType: '',
    budget: '',
    profileType: '',
  });
  const [errors, setErrors] = useState<FormErrors & { houseType?: string; budget?: string; profileType?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: any = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Vul een geldige naam in';
    }
    const phoneRegex = /^(\+32|0)[1-9][0-9]{7,8}$/;
    const cleanPhone = formData.phone.replace(/\s/g, '');
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      newErrors.phone = 'Vul een geldig Belgisch telefoonnummer in';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Vul een geldig e-mailadres in';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Selecteer een onderwerp';
    }
    if (formData.subject !== 'andere' && !formData.houseType) {
      // newErrors.houseType = 'Selecteer type woning'; // Optional to make strictly required
    }

    // Message validation less strict if other fields are filled
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      newErrors.message = 'Vul een kort bericht in';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      // FormSubmit implementatie (geen API keys nodig)
      const response = await fetch("https://formsubmit.co/ajax/info@yannova.be", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          houseType: formData.houseType, // NEW
          budget: formData.budget,       // NEW
          profileType: formData.profileType, // NEW
          message: formData.message,
          _subject: `Nieuwe aanvraag: ${formData.subject} - ${formData.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', phone: '', email: '', subject: '', message: '', houseType: '', budget: '', profileType: '' });
      } else {
        throw new Error(result.message || 'Verzenden mislukt');
      }

    } catch (error) {
      console.error('FormSubmit Error:', error);
      alert('Er is een fout opgetreden bij het versturen van uw bericht. Probeer het later opnieuw of contacteer ons telefonisch.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClasses = (fieldName: keyof FormErrors) =>
    `w-full px-4 py-3 border rounded-lg transition-all focus:outline-none ${errors[fieldName]
      ? 'border-red-400 focus:ring-2 focus:ring-red-200'
      : 'border-gray-300 focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent'
    }`;


  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Contacteer Ons | Offerte Aanvragen"
        description="Neem contact op met Yannova Bouw voor een vrijblijvende offerte voor ramen, deuren, renovatie of gevelwerken in regio Zoersel, Antwerpen & Mechelen."
      />
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-brand-dark via-slate-800 to-brand-dark">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Contact Yannova Bouw
              <span className="block text-brand-accent mt-2 text-3xl md:text-4xl">Zoersel, Antwerpen & Mechelen</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              Vertel ons kort wat u wil aanpakken. We luisteren, denken mee en helpen u graag verder met duidelijk advies en een vrijblijvende offerte.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-brand-dark mb-6">Contactgegevens</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-brand-accent" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-dark">Adres</h3>
                        <p className="text-gray-600">De Beemdekens 39<br />2980 Zoersel, België</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="text-brand-accent" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-dark">Telefoon</h3>
                        <a href="tel:+32489960001" className="text-gray-600 hover:text-brand-accent">
                          +32 489 96 00 01
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="text-brand-accent" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-dark">Email</h3>
                        <a href="mailto:info@yannova.be" className="text-gray-600 hover:text-brand-accent">
                          info@yannova.be
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="text-brand-accent" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-dark">Openingsuren</h3>
                        <p className="text-gray-600">Ma - Vr: 08:00 - 18:00<br />Za: Op afspraak</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <GoogleMap
                  address={COMPANY_ADDRESS}
                  coordinates={COMPANY_COORDINATES}
                  className="h-64"
                />
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-gray-50 p-8 rounded-xl">
                  <h2 className="text-2xl font-bold text-brand-dark mb-6">Stuur ons een bericht</h2>

                  {submitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-green-800 mb-2">Bedankt voor uw bericht!</h3>
                      <p className="text-green-700">We nemen zo snel mogelijk contact met u op.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Naam *</label>
                          <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={inputClasses('name')}
                            placeholder="Uw naam"
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle size={14} /> {errors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Telefoon *</label>
                          <input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputClasses('phone')}
                            placeholder="0489 96 00 01"
                          />
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle size={14} /> {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={inputClasses('email')}
                          placeholder="uw@email.be"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} /> {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Onderwerp *</label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={inputClasses('subject')}
                        >
                          <option value="">Selecteer een onderwerp</option>
                          <option value="offerte">Offerte aanvragen</option>
                          <option value="ramen-deuren">Ramen & Deuren</option>
                          <option value="gevelwerken">Gevelwerken</option>
                          <option value="isolatie">Isolatie</option>
                          <option value="renovatie">Renovatie</option>
                          <option value="andere">Andere vraag</option>
                        </select>
                        {errors.subject && (
                          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} /> {errors.subject}
                          </p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="houseType" className="block text-sm font-medium text-gray-700 mb-2">Type Woning</label>
                          <select
                            id="houseType"
                            name="houseType"
                            value={formData.houseType}
                            onChange={handleChange}
                            className={inputClasses('houseType' as keyof FormErrors)}
                          >
                            <option value="">Selecteer type</option>
                            <option value="vrijstaand">Vrijstaande woning</option>
                            <option value="halfopen">Halfopen bebouwing</option>
                            <option value="rijwoning">Rijwoning</option>
                            <option value="appartement">Appartement</option>
                            <option value="handelspand">Handelspand</option>
                            <option value="andere">Andere</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">Geschat Budget</label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className={inputClasses('budget' as keyof FormErrors)}
                          >
                            <option value="">Selecteer budget</option>
                            <option value="<5000">Minder dan €5.000</option>
                            <option value="5000-10000">€5.000 - €10.000</option>
                            <option value="10000-25000">€10.000 - €25.000</option>
                            <option value="25000-50000">€25.000 - €50.000</option>
                            <option value=">50000">Meer dan €50.000</option>
                            <option value="onbekend">Nog niet bepaald</option>
                          </select>
                        </div>
                      </div>

                      {/* Profielsoort - Alleen zichtbaar bij Ramen & Deuren */}
                      {(formData.subject === 'ramen-deuren' || formData.subject === 'offerte') && (
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                          <label htmlFor="profileType" className="block text-sm font-medium text-blue-900 mb-2">Welk materiaal verkiest u?</label>
                          <select
                            id="profileType"
                            name="profileType"
                            value={formData.profileType}
                            onChange={handleChange}
                            className={`${inputClasses('profileType' as keyof FormErrors)} border-blue-200 focus:ring-blue-500`}
                          >
                            <option value="">Selecteer materiaal</option>
                            <option value="pvc">PVC (Onderhoudsvriendelijk & Isolerend)</option>
                            <option value="aluminium">Aluminium (Strak & Modern)</option>
                            <option value="hout">Hout (Authentiek)</option>
                            <option value="combinatie">Combinatie / Advies nodig</option>
                          </select>
                        </div>
                      )}

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Extra opmerkingen</label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className={inputClasses('message')}
                          placeholder="Beschrijf uw project in detail..."
                        />
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} /> {errors.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto flex items-center justify-center gap-2 bg-brand-accent hover:bg-orange-700 disabled:bg-orange-400 text-white font-bold py-4 px-8 rounded-lg transition-colors"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Verzenden...
                          </>
                        ) : (
                          <>
                            <Send size={20} /> Verstuur bericht
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
