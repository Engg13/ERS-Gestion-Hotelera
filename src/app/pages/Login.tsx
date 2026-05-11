import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, InputField, SelectField } from '@figma/astraui';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import CurrencySelector from '../components/CurrencySelector';

export default function Login() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { login, loginAsGuest, loading } = useAuth();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (correo && password) {
      const result = await login(correo, password);
      if (result.success) {
        navigate('/search');
      } else {
        alert(result.error || t('validation.loginError'));
      }
    } else {
      alert(t('validation.required'));
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate('/search');
  };

  const handleLanguageChange = (val: string) => {
    setLanguage(val as 'es' | 'en' | 'fr' | 'de');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center p-2xl" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div className="bg-card rounded-corner-lg p-xl w-full max-w-md border-2 border-gold/20 shadow-lg">
        <h1 className="text-title text-gold text-center mb-xs font-serif" style={{ letterSpacing: '2px' }}>{t('login.title')}</h1>
        <p className="text-label-sm text-gold-dark text-center mb-xl">{t('login.welcome')}</p>

        <div className="flex flex-col gap-lg">
          <div className="flex gap-lg">
            <div className="flex-1">
              <SelectField
                label={t('login.language')}
                options={[
                  { value: 'es', label: 'Español' },
                  { value: 'en', label: 'English' },
                  { value: 'fr', label: 'Français' },
                  { value: 'de', label: 'Deutsch' },
                ]}
                value={language}
                onChange={handleLanguageChange}
              />
            </div>
            <div className="flex-1">
              <CurrencySelector />
            </div>
          </div>

          <InputField
            label={t('login.email')}
            placeholder={t('login.emailPlaceholder')}
            value={correo}
            onChange={(val) => setCorreo(val)}
            type="email"
          />

          <InputField
            label={t('login.password')}
            type="password"
            placeholder={t('login.passwordPlaceholder')}
            value={password}
            onChange={(val) => setPassword(val)}
          />

          <div className="flex flex-col gap-md mt-lg">
            <Button variant="primary" onClick={handleLogin} disabled={loading}>
              {loading ? t('login.loading') : t('login.loginButton')}
            </Button>

            <Button variant="neutral" onClick={() => navigate('/register')}>
              {t('login.createAccount')}
            </Button>

            <Button variant="subtle" onClick={handleGuestLogin}>
              {t('login.guestLogin')}
            </Button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
