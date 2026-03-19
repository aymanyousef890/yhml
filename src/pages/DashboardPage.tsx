import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { getCompanyData, getServices, getStats, getSocialLinks, getAboutData, saveStatsToDB } from '@/lib/dataService';
import { Settings, FileText, BarChart3, Share2, Info, Home as HomeIcon, LogOut, Phone, MessageSquare, Image, Plus, Trash2, GripVertical, Eye, EyeOff, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

type Tab = 'slider' | 'home' | 'about' | 'services' | 'stats' | 'social' | 'contact' | 'messages';

const DashboardPage = () => {
  const { lang } = useLanguage();
  const { user, loading, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>('slider');

  if (loading) {
    return (
      <main className="pt-20 min-h-screen bg-muted flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const tabs = [
    { id: 'slider' as Tab, label: 'Slider / السلايدر', icon: Image },
    { id: 'home' as Tab, label: 'Home / الرئيسية', icon: HomeIcon },
    { id: 'about' as Tab, label: 'About / من نحن', icon: Info },
    { id: 'services' as Tab, label: 'Services / الخدمات', icon: FileText },
    { id: 'stats' as Tab, label: 'Stats / الإحصائيات', icon: BarChart3 },
    { id: 'social' as Tab, label: 'Social / التواصل', icon: Share2 },
    { id: 'contact' as Tab, label: 'Contact Info / بيانات التواصل', icon: Phone },
    { id: 'messages' as Tab, label: 'Messages / الرسائل', icon: MessageSquare },
  ];

  const handleSave = () => {
    toast.success('Changes saved (demo) / تم حفظ التغييرات (تجريبي)');
  };

  return (
    <main className="pt-20 min-h-screen bg-muted">
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Settings size={28} className="text-primary" />
            <h1 className="heading-secondary">Dashboard / لوحة التحكم</h1>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all border border-destructive/30"
          >
            <LogOut size={16} />
            Sign Out / تسجيل الخروج
          </button>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          <nav className="glass-card p-4 h-fit">
            <ul className="space-y-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <button
                    onClick={() => setTab(id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      tab === id ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="glass-card p-8">
            {tab === 'slider' && <SliderTab />}
            {tab === 'home' && <HomeTab onSave={handleSave} />}
            {tab === 'about' && <AboutTab onSave={handleSave} />}
            {tab === 'services' && <ServicesTab onSave={handleSave} />}
            {tab === 'stats' && <StatsTab onSave={handleSave} />}
            {tab === 'social' && <SocialTab onSave={handleSave} />}
            {tab === 'contact' && <ContactInfoTab onSave={handleSave} />}
            {tab === 'messages' && <MessagesTab />}
          </div>
        </div>
      </div>
    </main>
  );
};

const FieldGroup = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-foreground">{label}</label>
    {children}
  </div>
);

const BilingualField = ({
  labelEn, labelAr, valueEn, valueAr, onChangeEn, onChangeAr, multiline = false,
}: {
  labelEn: string; labelAr: string; valueEn: string; valueAr: string;
  onChangeEn: (v: string) => void; onChangeAr: (v: string) => void; multiline?: boolean;
}) => (
  <div className="grid md:grid-cols-2 gap-4">
    <FieldGroup label={`${labelEn} (English)`}>
      {multiline ? (
        <textarea value={valueEn} onChange={e => onChangeEn(e.target.value)} rows={3} dir="ltr"
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm resize-none" />
      ) : (
        <input value={valueEn} onChange={e => onChangeEn(e.target.value)} dir="ltr"
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm" />
      )}
    </FieldGroup>
    <FieldGroup label={`${labelAr} (العربية)`}>
      {multiline ? (
        <textarea value={valueAr} onChange={e => onChangeAr(e.target.value)} rows={3} dir="rtl"
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm resize-none"
          style={{ fontFamily: 'Cairo, sans-serif' }} />
      ) : (
        <input value={valueAr} onChange={e => onChangeAr(e.target.value)} dir="rtl"
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm"
          style={{ fontFamily: 'Cairo, sans-serif' }} />
      )}
    </FieldGroup>
  </div>
);

const Input = ({ value, onChange, type, dir }: { value: string; onChange: (v: string) => void; type?: string; dir?: string }) => (
  <input type={type} value={value} onChange={e => onChange(e.target.value)} dir={dir}
    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm" />
);

const SaveBtn = ({ onClick, loading }: { onClick: () => void; loading?: boolean }) => (
  <button onClick={onClick} disabled={loading} className="btn-primary mt-6 disabled:opacity-50">
    {loading ? 'Saving...' : 'Save Changes / حفظ التغييرات'}
  </button>
);

interface SlideData {
  id: string;
  title_en: string;
  title_ar: string;
  subtitle_en: string;
  subtitle_ar: string;
  cta_en: string;
  cta_ar: string;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
}

function SliderTab() {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  const fetchSlides = async () => {
    const { data } = await supabase
      .from('hero_slides')
      .select('*')
      .order('sort_order', { ascending: true });
    if (data) setSlides(data as SlideData[]);
    setLoading(false);
  };

  useEffect(() => { fetchSlides(); }, []);

  const updateSlide = (id: string, field: keyof SlideData, value: any) => {
    setSlides(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addSlide = async () => {
    const newOrder = slides.length;
    const { data, error } = await supabase
      .from('hero_slides')
      .insert({ title_en: 'New Slide', title_ar: 'شريحة جديدة', subtitle_en: '', subtitle_ar: '', cta_en: 'Contact Us', cta_ar: 'تواصل معنا', sort_order: newOrder, is_active: true })
      .select()
      .single();
    if (data) {
      setSlides(prev => [...prev, data as SlideData]);
      toast.success('Slide added / تم إضافة شريحة');
    }
    if (error) toast.error('Error adding slide');
  };

  const deleteSlide = async (id: string) => {
    const { error } = await supabase.from('hero_slides').delete().eq('id', id);
    if (!error) {
      setSlides(prev => prev.filter(s => s.id !== id));
      toast.success('Slide deleted / تم حذف الشريحة');
    }
  };

  const moveSlide = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= slides.length) return;
    const updated = [...slides];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    updated.forEach((s, i) => s.sort_order = i);
    setSlides(updated);
  };

  const handleImageUpload = async (slideId: string, file: File) => {
    setUploading(slideId);
    const ext = file.name.split('.').pop();
    const filePath = `${slideId}.${ext}`;

    // Delete old file if exists
    await supabase.storage.from('slider-images').remove([filePath]);

    const { error } = await supabase.storage.from('slider-images').upload(filePath, file, { upsert: true });
    if (error) {
      toast.error('Upload failed');
      setUploading(null);
      return;
    }

    const { data: urlData } = supabase.storage.from('slider-images').getPublicUrl(filePath);
    const imageUrl = urlData.publicUrl + '?t=' + Date.now();
    updateSlide(slideId, 'image_url', imageUrl);
    setUploading(null);
    toast.success('Image uploaded / تم رفع الصورة');
  };

  const removeImage = (slideId: string) => {
    updateSlide(slideId, 'image_url', null);
  };

  const saveAll = async () => {
    setSaving(true);
    for (const slide of slides) {
      await supabase.from('hero_slides').update({
        title_en: slide.title_en,
        title_ar: slide.title_ar,
        subtitle_en: slide.subtitle_en,
        subtitle_ar: slide.subtitle_ar,
        cta_en: slide.cta_en,
        cta_ar: slide.cta_ar,
        image_url: slide.image_url,
        sort_order: slide.sort_order,
        is_active: slide.is_active,
      }).eq('id', slide.id);
    }
    setSaving(false);
    toast.success('All slides saved / تم حفظ جميع الشرائح');
  };

  if (loading) return <div className="text-muted-foreground">Loading slides...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Hero Slider / السلايدر الرئيسي</h2>
        <button onClick={addSlide} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all">
          <Plus size={16} /> Add Slide / إضافة شريحة
        </button>
      </div>

      {slides.map((slide, index) => (
        <div key={slide.id} className="p-6 rounded-xl border border-border space-y-4 bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1">
                <button onClick={() => moveSlide(index, -1)} disabled={index === 0}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30 text-xs">▲</button>
                <button onClick={() => moveSlide(index, 1)} disabled={index === slides.length - 1}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30 text-xs">▼</button>
              </div>
              <GripVertical size={16} className="text-muted-foreground" />
              <span className="text-sm font-semibold text-primary">Slide {index + 1}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateSlide(slide.id, 'is_active', !slide.is_active)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${slide.is_active ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
                {slide.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                {slide.is_active ? 'Active' : 'Hidden'}
              </button>
              <button onClick={() => deleteSlide(slide.id)}
                className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-all">
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Slide Image / صورة الشريحة</label>
            {slide.image_url ? (
              <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border">
                <img src={slide.image_url} alt="" className="w-full h-full object-cover" />
                <button onClick={() => removeImage(slide.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-destructive text-destructive-foreground text-xs hover:opacity-90">
                  <Trash2 size={14} />
                </button>
              </div>
            ) : (
              <div className="w-full h-40 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted">
                <p className="text-sm text-muted-foreground">No image — gradient background will be used<br/>لا توجد صورة — سيتم استخدام خلفية لونية</p>
              </div>
            )}
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium cursor-pointer hover:bg-muted transition-all">
              <Upload size={16} />
              {uploading === slide.id ? 'Uploading...' : 'Upload Image / رفع صورة'}
              <input type="file" accept="image/*" className="hidden"
                onChange={e => { if (e.target.files?.[0]) handleImageUpload(slide.id, e.target.files[0]); }} />
            </label>
          </div>

          {/* Text fields */}
          <BilingualField labelEn="Title" labelAr="العنوان" valueEn={slide.title_en} valueAr={slide.title_ar}
            onChangeEn={v => updateSlide(slide.id, 'title_en', v)} onChangeAr={v => updateSlide(slide.id, 'title_ar', v)} />
          <BilingualField labelEn="Subtitle" labelAr="العنوان الفرعي" valueEn={slide.subtitle_en} valueAr={slide.subtitle_ar}
            onChangeEn={v => updateSlide(slide.id, 'subtitle_en', v)} onChangeAr={v => updateSlide(slide.id, 'subtitle_ar', v)} multiline />
          <BilingualField labelEn="Button Text" labelAr="نص الزر" valueEn={slide.cta_en} valueAr={slide.cta_ar}
            onChangeEn={v => updateSlide(slide.id, 'cta_en', v)} onChangeAr={v => updateSlide(slide.id, 'cta_ar', v)} />
        </div>
      ))}

      <SaveBtn onClick={saveAll} loading={saving} />
    </div>
  );
}

function HomeTab({ onSave }: { onSave: () => void }) {
  const company = getCompanyData();
  const [sloganEn, setSloganEn] = useState(company.slogan.en);
  const [sloganAr, setSloganAr] = useState(company.slogan.ar);
  const [descEn, setDescEn] = useState(company.description.en);
  const [descAr, setDescAr] = useState(company.description.ar);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Home Page / الصفحة الرئيسية</h2>
      <BilingualField labelEn="Company Slogan" labelAr="شعار الشركة" valueEn={sloganEn} valueAr={sloganAr} onChangeEn={setSloganEn} onChangeAr={setSloganAr} />
      <BilingualField labelEn="Company Description" labelAr="وصف الشركة" valueEn={descEn} valueAr={descAr} onChangeEn={setDescEn} onChangeAr={setDescAr} multiline />
      <SaveBtn onClick={onSave} />
    </div>
  );
}

function AboutTab({ onSave }: { onSave: () => void }) {
  const about = getAboutData();
  const [storyEn, setStoryEn] = useState(about.story.en);
  const [storyAr, setStoryAr] = useState(about.story.ar);
  const [visionEn, setVisionEn] = useState(about.vision.en);
  const [visionAr, setVisionAr] = useState(about.vision.ar);
  const [missionEn, setMissionEn] = useState(about.mission.en);
  const [missionAr, setMissionAr] = useState(about.mission.ar);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">About Page / صفحة من نحن</h2>
      <BilingualField labelEn="Company Story" labelAr="قصة الشركة" valueEn={storyEn} valueAr={storyAr} onChangeEn={setStoryEn} onChangeAr={setStoryAr} multiline />
      <BilingualField labelEn="Vision" labelAr="الرؤية" valueEn={visionEn} valueAr={visionAr} onChangeEn={setVisionEn} onChangeAr={setVisionAr} multiline />
      <BilingualField labelEn="Mission" labelAr="المهمة" valueEn={missionEn} valueAr={missionAr} onChangeEn={setMissionEn} onChangeAr={setMissionAr} multiline />
      <SaveBtn onClick={onSave} />
    </div>
  );
}

function ServicesTab({ onSave }: { onSave: () => void }) {
  const services = getServices();
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Services / إدارة الخدمات</h2>
      {services.map((s) => (
        <div key={s.id} className="p-5 rounded-lg border border-border space-y-4">
          <p className="text-sm font-semibold text-primary">{s.title.en} / {s.title.ar}</p>
          <BilingualField labelEn="Title" labelAr="العنوان" valueEn={s.title.en} valueAr={s.title.ar} onChangeEn={() => {}} onChangeAr={() => {}} />
          <BilingualField labelEn="Description" labelAr="الوصف" valueEn={s.description.en} valueAr={s.description.ar} onChangeEn={() => {}} onChangeAr={() => {}} multiline />
        </div>
      ))}
      <SaveBtn onClick={onSave} />
    </div>
  );
}

function StatsTab({ onSave }: { onSave: () => void }) {
  const initialStats = getStats();
  const [stats, setStats] = useState(initialStats);
  const [saving, setSaving] = useState(false);

  const updateStat = (index: number, value: number) => {
    setStats(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], value };
      return updated;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save stats to Supabase
      const success = await saveStatsToDB(stats);
      if (success) {
        toast.success('Statistics updated and saved / تم تحديث وحفظ الإحصائيات');
        onSave();
      } else {
        toast.error('Failed to save statistics / فشل حفظ الإحصائيات');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save statistics / فشل حفظ الإحصائيات');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Statistics / الإحصائيات</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="p-4 rounded-lg border border-border space-y-3">
            <p className="text-sm font-semibold text-primary">{s.label.en} / {s.label.ar}</p>
            <FieldGroup label="Value / القيمة">
              <Input type="number" value={String(s.value)} onChange={(val) => updateStat(i, parseInt(val) || 0)} />
            </FieldGroup>
          </div>
        ))}
      </div>
      <button onClick={handleSave} disabled={saving} className="btn-primary mt-6 disabled:opacity-50">
        {saving ? 'Saving...' : 'Save Changes / حفظ التغييرات'}
      </button>
    </div>
  );
}

function SocialTab({ onSave }: { onSave: () => void }) {
  const initialSocial = getSocialLinks();
  const [social, setSocial] = useState(initialSocial);
  const [saving, setSaving] = useState(false);
  const entries = Object.entries(social);

  const updateSocial = (key: string, value: string) => {
    setSocial(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // In a real app, you'd save to a database here
      toast.success('Social media links updated / تم تحديث روابط التواصل الاجتماعي');
      onSave();
    } catch (error) {
      toast.error('Failed to save social links / فشل حفظ روابط التواصل');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Social Media / روابط التواصل الاجتماعي</h2>
      {entries.map(([key, val]) => (
        <FieldGroup key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
          <Input value={val} onChange={(newVal) => updateSocial(key, newVal)} />
        </FieldGroup>
      ))}
      <button onClick={handleSave} disabled={saving} className="btn-primary mt-6 disabled:opacity-50">
        {saving ? 'Saving...' : 'Save Changes / حفظ التغييرات'}
      </button>
    </div>
  );
}

function ContactInfoTab({ onSave }: { onSave: () => void }) {
  const company = getCompanyData();
  const [email, setEmail] = useState(company.email);
  const [addressEn, setAddressEn] = useState(company.address.en);
  const [addressAr, setAddressAr] = useState(company.address.ar);
  const [mapUrl, setMapUrl] = useState(company.mapUrl);
  const [whatsapp, setWhatsapp] = useState(company.whatsapp.join('\n'));
  const [callPhones, setCallPhones] = useState(company.callPhones.join('\n'));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Contact Information / بيانات التواصل</h2>
      <FieldGroup label="Email / البريد الإلكتروني">
        <Input value={email} onChange={setEmail} type="email" />
      </FieldGroup>
      <BilingualField labelEn="Address" labelAr="العنوان" valueEn={addressEn} valueAr={addressAr} onChangeEn={setAddressEn} onChangeAr={setAddressAr} multiline />
      <FieldGroup label="Google Maps URL / رابط خرائط جوجل">
        <Input value={mapUrl} onChange={setMapUrl} />
      </FieldGroup>
      <FieldGroup label="WhatsApp Numbers / أرقام واتساب (one per line)">
        <textarea value={whatsapp} onChange={e => setWhatsapp(e.target.value)} rows={3} dir="ltr"
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm resize-none" />
      </FieldGroup>
      <FieldGroup label="Call Numbers / أرقام الاتصال (one per line)">
        <textarea value={callPhones} onChange={e => setCallPhones(e.target.value)} rows={4} dir="ltr"
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm resize-none" />
      </FieldGroup>
      <SaveBtn onClick={onSave} />
    </div>
  );
}

function MessagesTab() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingMsgs, setLoadingMsgs] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setMessages(data);
      setLoadingMsgs(false);
    };
    fetchMessages();
  }, []);

  if (loadingMsgs) return <div className="text-muted-foreground">Loading messages...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Contact Messages / رسائل التواصل</h2>
      {messages.length === 0 ? (
        <p className="text-muted-foreground">No messages yet / لا توجد رسائل بعد</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="p-5 rounded-lg border border-border space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-foreground">{msg.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(msg.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{msg.email} {msg.phone && `• ${msg.phone}`}</p>
              <p className="text-sm text-foreground bg-muted p-3 rounded-lg">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
