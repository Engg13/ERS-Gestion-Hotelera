import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, InputField } from '@figma/astraui';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

export default function Register() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    // Validación básica
    if (!formData.nombre || !formData.correo || !formData.password) {
      alert(t('validation.required'));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert(t('validation.passwordMismatch'));
      return;
    }

    // Registrar usuario
    const result = await register({
      nombre: formData.nombre,
      correo: formData.correo,
      password: formData.password,
    });

    if (result.success) {
      navigate('/search');
    } else {
      alert(result.error || t('validation.registerError'));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center p-2xl" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div className="bg-card rounded-corner-lg p-xl w-full max-w-2xl border-2 border-gold/20 shadow-lg">
          <h1 className="text-title text-gold text-center mb-xs font-serif" style={{ letterSpacing: '2px' }}>
            {t('register.title')}
          </h1>
          <p className="text-label-sm text-gold-dark text-center mb-xl">{t('register.subtitle')}</p>

          <div className="flex flex-col gap-lg">
            <InputField
              label={t('register.name')}
              placeholder={t('register.namePlaceholder')}
              value={formData.nombre}
              onChange={handleChange('nombre')}
            />

            <InputField
              label={t('register.email')}
              type="email"
              placeholder={t('register.emailPlaceholder')}
              value={formData.correo}
              onChange={handleChange('correo')}
            />

            <InputField
              label={t('register.password')}
              type="password"
              placeholder={t('login.passwordPlaceholder')}
              value={formData.password}
              onChange={handleChange('password')}
            />

            <InputField
              label={t('register.confirmPassword')}
              type="password"
              placeholder={t('login.passwordPlaceholder')}
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
            />

            <div className="flex flex-col gap-md mt-lg">
              <Button variant="primary" onClick={handleRegister} disabled={loading}>
                {loading ? t('login.loading') : t('register.registerButton')}
              </Button>

              <div className="text-center">
                <span className="text-label-sm text-muted-foreground">
                  {t('register.alreadyHaveAccount')}{' '}
                </span>
                <button
                  onClick={() => navigate('/')}
                  className="text-label-sm text-gold hover:text-gold-dark transition-colors font-medium"
                >
                  {t('register.loginHere')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
