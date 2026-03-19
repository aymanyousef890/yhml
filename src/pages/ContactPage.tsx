import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { getCompanyData, getSocialLinks, t } from '@/lib/dataService';
import ScrollAnimate from '@/components/ScrollAnimate';
import { MapPin, Phone, Mail, Send, Facebook, Instagram, Linkedin, Twitter, MessageCircle, Music, PinIcon } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const ContactPage = () => {
  const { lang } = useLanguage();
  const company = getCompanyData();
  const social = getSocialLinks();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);

  // Update meta tags for SEO
  useEffect(() => {
    const title = lang === 'en' 
      ? 'Contact Y.H.M.L - Get in Touch with Our Trading Experts'
      : 'تواصل مع Y.H.M.L - تواصل مع خبرائنا في التجارة الدولية';
    
    const description = lang === 'en'
      ? 'Contact Y.H.M.L for import, export, and trading inquiries. Call us, email, WhatsApp, or visit our office in Cairo. Fast response guaranteed.'
      : 'تواصل مع Y.H.M.L لاستفسارات الاستيراد والتصدير. اتصل بنا أو أرسل بريداً إلكترونياً أو رسالة واتساب. نضمن الرد السريع.';

    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = lang === 'en' ? 'https://yhml.com/contact' : 'https://yhml.com/ar/contact';

    // Return cleanup function to restore original meta tags on unmount
    return () => {
      document.title = 'Y.H.M.L — Global Import & Export Trading Company Since 1995';
    };
  }, [lang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.message,
      });
      if (error) throw error;
      toast.success(lang === 'en' ? 'Message sent successfully!' : 'تم إرسال الرسالة بنجاح!');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      toast.error(lang === 'en' ? 'Failed to send message. Please try again.' : 'فشل إرسال الرسالة. حاول مرة أخرى.');
    } finally {
      setSending(false);
    }
  };

  const socialItems = [
    { icon: Facebook, url: social.facebook, label: 'Facebook' },
    { icon: Instagram, url: social.instagram, label: 'Instagram' },
    { icon: Music, url: social.tiktok, label: 'TikTok' },
    { icon: PinIcon, url: social.pinterest, label: 'Pinterest' },
    { icon: Linkedin, url: social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, url: social.twitter, label: 'X' },
  ];

  return (
    <main className="pt-20">
      <section className="gradient-hero section-padding text-center">
        <div className="container-custom max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
            {lang === 'en' ? 'Contact Us' : 'تواصل معنا'}
          </h1>
          <p className="text-lg text-primary-foreground/80">
            {lang === 'en' ? "We'd love to hear from you" : 'يسعدنا سماع رأيك'}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <ScrollAnimate animation="slide-left">
              <div className="glass-card p-8 md:p-10">
                <h2 className="heading-secondary mb-6">
                  {lang === 'en' ? 'Send a Message' : 'أرسل رسالة'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      {lang === 'en' ? 'Full Name' : 'الاسم الكامل'}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        {lang === 'en' ? 'Email' : 'البريد الإلكتروني'}
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        {lang === 'en' ? 'Phone' : 'الهاتف'}
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      {lang === 'en' ? 'Message' : 'الرسالة'}
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary flex items-center gap-2 w-full justify-center disabled:opacity-60"
                  >
                    <Send size={18} />
                    {sending
                      ? (lang === 'en' ? 'Sending...' : 'جاري الإرسال...')
                      : (lang === 'en' ? 'Send Message' : 'إرسال الرسالة')}
                  </button>
                </form>
              </div>
            </ScrollAnimate>

            {/* Info */}
            <ScrollAnimate animation="slide-right">
              <div className="space-y-8">
                <div className="glass-card p-8">
                  <h3 className="heading-secondary mb-6">
                    {lang === 'en' ? 'Contact Information' : 'معلومات التواصل'}
                  </h3>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{lang === 'en' ? 'Address' : 'العنوان'}</p>
                        <a
                          href={company.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          title={lang === 'en' ? 'View our location on Google Maps' : 'عرض موقعنا على خرائط جوجل'}
                          aria-label={lang === 'en' ? `Visit Y.H.M.L office at ${t(company.address, lang)}` : `زيارة مكتب Y.H.M.L في ${t(company.address, lang)}`}
                        >
                          {t(company.address, lang)}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{lang === 'en' ? 'Email' : 'البريد الإلكتروني'}</p>
                        <a 
                          href={`mailto:${company.email}`} 
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          title={lang === 'en' ? 'Send us an email' : 'أرسل لنا بريداً إلكترونياً'}
                          aria-label={lang === 'en' ? `Email Y.H.M.L at ${company.email}` : `البريد الإلكتروني إلى Y.H.M.L: ${company.email}`}
                        >
                          {company.email}
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Phone Numbers */}
                <div className="glass-card p-8">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {lang === 'en' ? 'Call Us' : 'اتصل بنا'}
                  </h3>
                  <div className="space-y-2">
                    {company.callPhones.map((phone: string) => (
                      <a
                        key={phone}
                        href={`tel:${phone}`}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                        dir="ltr"
                        title={lang === 'en' ? 'Call Y.H.M.L' : 'اتصل بـ Y.H.M.L'}
                        aria-label={lang === 'en' ? `Call Y.H.M.L at ${phone}` : `اتصل بـ Y.H.M.L على ${phone}`}
                      >
                        <Phone size={16} className="text-primary shrink-0" />
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="glass-card p-8">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {lang === 'en' ? 'WhatsApp' : 'واتساب'}
                  </h3>
                  <div className="space-y-2">
                    {company.whatsapp.map((phone: string) => (
                      <a
                        key={phone}
                        href={`https://wa.me/${phone.replace(/\+/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={lang === 'en' ? 'Message Y.H.M.L on WhatsApp' : 'أرسل رسالة لـ Y.H.M.L على واتساب'}
                        aria-label={lang === 'en' ? `Message Y.H.M.L on WhatsApp at ${phone}` : `أرسل رسالة لـ Y.H.M.L على واتساب: ${phone}`}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-green-600 transition-colors"
                        dir="ltr"
                      >
                        <MessageCircle size={16} className="text-green-600 shrink-0" />
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Social */}
                <div className="glass-card p-8">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {lang === 'en' ? 'Follow Us' : 'تابعنا'}
                  </h3>
                  <div className="flex gap-3">
                    {socialItems.map(({ icon: Icon, url, label }) => (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all text-primary"
                        title={lang === 'en' ? `Follow Y.H.M.L on ${label}` : `تابع Y.H.M.L على ${label}`}
                        aria-label={lang === 'en' ? `Visit Y.H.M.L on ${label}` : `زيارة Y.H.M.L على ${label}`}
                      >
                        <Icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Google Map */}
                <div className="glass-card p-0 overflow-hidden h-96">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.768722332952!2d30.917543299999995!3d29.9573304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458578549b21f1b%3A0x405f7bdb0975b5cb!2z2LTYsdmD2KkgWS5ILk0uTCDZhNmE2KrYrNin2LHYqSDZiCDYp9mE2KrYtdiv2YrYsQ!5e0!3m2!1sar!2seg!4v1773567578641!5m2!1sar!2seg"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={lang === 'en' ? 'Y.H.M.L Location on Google Maps' : 'موقع Y.H.M.L على خرائط جوجل'}
                  />
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
