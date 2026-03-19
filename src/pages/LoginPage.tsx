import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/i18n/LanguageContext';
import { Lock, Mail } from 'lucide-react';

const LoginPage = () => {
  const { lang } = useLanguage();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(lang === 'en' ? 'Invalid email or password' : 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <main className="pt-20 min-h-screen bg-muted flex items-center justify-center">
      <div className="glass-card p-8 md:p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-primary-foreground" />
          </div>
          <h1 className="heading-secondary">
            {lang === 'en' ? 'Admin Login' : 'تسجيل دخول المدير'}
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            {lang === 'en' ? 'Sign in to access the dashboard' : 'سجل دخولك للوصول إلى لوحة التحكم'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
              {error}
            </div>
          )}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">
              {lang === 'en' ? 'Email' : 'البريد الإلكتروني'}
            </label>
            <div className="relative">
              <Mail size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full ps-10 pe-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm"
                placeholder={lang === 'en' ? 'admin@yhml.com' : 'admin@yhml.com'}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">
              {lang === 'en' ? 'Password' : 'كلمة المرور'}
            </label>
            <div className="relative">
              <Lock size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full ps-10 pe-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading
              ? (lang === 'en' ? 'Signing in...' : 'جاري تسجيل الدخول...')
              : (lang === 'en' ? 'Sign In' : 'تسجيل الدخول')}
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
