import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, SelectField, InputField } from '@figma/astraui';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';

export default function Search() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleSearch = () => {
    // Validar que todos los campos estén completos
    if (!city) {
      alert(t('validation.selectCity'));
      return;
    }
    if (!checkIn) {
      alert(t('validation.selectCheckIn'));
      return;
    }
    if (!checkOut) {
      alert(t('validation.selectCheckOut'));
      return;
    }

    navigate('/rooms', { state: { city, checkIn, checkOut } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center p-2xl" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div className="bg-card rounded-corner-lg p-xl w-full max-w-2xl border-2 border-gold/20 shadow-lg">
        <h1 className="text-title text-gold mb-xs font-serif">{t('search.title')}</h1>
        <p className="text-label-sm text-muted-foreground mb-xl">
          {t('search.subtitle')}
        </p>

        <div className="flex flex-col gap-lg">
          <SelectField
            label={t('search.city')}
            placeholder={t('search.cityPlaceholder')}
            options={[
              { value: 'Santiago', label: t('city.santiago') },
              { value: 'Valparaíso', label: t('city.valparaiso') },
              { value: 'Viña del Mar', label: t('city.vinaDelMar') },
              { value: 'Concepción', label: t('city.concepcion') },
              { value: 'La Serena', label: t('city.laSerena') },
            ]}
            value={city}
            onChange={(val) => setCity(val)}
          />

          <div className="flex gap-xl">
            <div className="flex-1">
              <InputField
                label={t('search.checkIn')}
                type="date"
                value={checkIn}
                onChange={(val) => setCheckIn(val)}
              />
            </div>

            <div className="flex-1">
              <InputField
                label={t('search.checkOut')}
                type="date"
                value={checkOut}
                onChange={(val) => setCheckOut(val)}
              />
            </div>
          </div>

          <div className="flex justify-end mt-lg">
            <Button variant="primary" onClick={handleSearch}>
              {t('search.searchButton')}
            </Button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
