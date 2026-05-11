import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Button, InputField } from '@figma/astraui';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { Calendar, MapPin, User, Mail, Phone, Users } from 'lucide-react';
import Header from '../components/Header';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface BookingState {
  room: {
    id_habitacion: string;
    numero: string;
    tipo: string;
    precio_diario: number;
    ciudad: string;
    imagen_url?: string;
  };
  checkIn: string;
  checkOut: string;
}

export default function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { user, isGuest } = useAuth();
  const { formatPrice } = useCurrency();

  const bookingData = location.state as BookingState;

  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    correo: user?.correo || '',
    telefono: user?.telefono || '',
  });
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Redirect if no booking data or not authenticated
    if (!bookingData || !user || isGuest) {
      navigate('/search');
      return;
    }
  }, [bookingData, user, isGuest, navigate]);

  if (!bookingData || !user || isGuest) {
    return null;
  }

  const calculateNights = () => {
    const start = new Date(bookingData.checkIn);
    const end = new Date(bookingData.checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nights = calculateNights();
  const subtotal = bookingData.room.precio_diario * nights;
  const total = subtotal;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = t('booking.nameRequired');
    }

    if (!formData.correo.trim()) {
      newErrors.correo = t('booking.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = t('booking.emailInvalid');
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = t('booking.phoneRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPayment = () => {
    if (!validateForm()) {
      return;
    }

    navigate('/payment', {
      state: {
        bookingData: {
          ...bookingData,
          guestInfo: formData,
          numberOfGuests,
          total,
          nights,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto p-2xl">
        <div className="bg-card rounded-corner-lg p-xl mb-xl border-2 border-gold/20">
          <h1 className="text-title text-gold mb-xs font-serif">{t('booking.title')}</h1>
          <p className="text-label-sm text-muted-foreground">{t('booking.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-lg">
            {/* Guest Information */}
            <div className="bg-card rounded-corner-lg p-xl border-2 border-gold/20">
              <h2 className="text-heading text-gold mb-lg font-serif">
                {t('booking.guestInformation')}
              </h2>

              <div className="space-y-lg">
                <div>
                  <label className="flex items-center gap-sm text-label-sm text-muted-foreground mb-xs">
                    <User size={16} className="text-gold" />
                    {t('booking.fullName')}
                  </label>
                  <InputField
                    type="text"
                    value={formData.nombre}
                    onChange={(val) => setFormData({ ...formData, nombre: val })}
                    placeholder={t('booking.fullName')}
                  />
                  {errors.nombre && (
                    <p className="text-label-sm text-red-600 mt-xs">{errors.nombre}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-sm text-label-sm text-muted-foreground mb-xs">
                    <Mail size={16} className="text-gold" />
                    {t('booking.email')}
                  </label>
                  <InputField
                    type="email"
                    value={formData.correo}
                    onChange={(val) => setFormData({ ...formData, correo: val })}
                    placeholder={t('booking.email')}
                  />
                  {errors.correo && (
                    <p className="text-label-sm text-red-600 mt-xs">{errors.correo}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-sm text-label-sm text-muted-foreground mb-xs">
                    <Phone size={16} className="text-gold" />
                    {t('booking.phone')}
                  </label>
                  <InputField
                    type="tel"
                    value={formData.telefono}
                    onChange={(val) => setFormData({ ...formData, telefono: val })}
                    placeholder={t('profile.phonePlaceholder')}
                  />
                  {errors.telefono && (
                    <p className="text-label-sm text-red-600 mt-xs">{errors.telefono}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-sm text-label-sm text-muted-foreground mb-md">
                    <Users size={16} className="text-gold" />
                    {t('booking.numberOfGuests')}
                  </label>
                  <div className="flex items-center gap-md">
                    <Button
                      variant="neutral"
                      size="small"
                      onClick={() => setNumberOfGuests(Math.max(1, numberOfGuests - 1))}
                      disabled={numberOfGuests <= 1}
                    >
                      -
                    </Button>
                    <span className="text-label font-medium w-12 text-center">
                      {numberOfGuests}
                    </span>
                    <Button
                      variant="neutral"
                      size="small"
                      onClick={() => setNumberOfGuests(Math.min(4, numberOfGuests + 1))}
                      disabled={numberOfGuests >= 4}
                    >
                      +
                    </Button>
                    <span className="text-label-sm text-muted-foreground ml-md">
                      {t('booking.maxGuests')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-corner-lg p-xl border-2 border-gold/20 sticky top-24">
              <h2 className="text-heading text-gold mb-lg font-serif">
                {t('booking.reservationSummary')}
              </h2>

              {/* Room Image */}
              {bookingData.room.imagen_url && (
                <div className="h-48 rounded-corner-md overflow-hidden mb-lg">
                  <ImageWithFallback
                    src={bookingData.room.imagen_url}
                    alt={bookingData.room.tipo}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Room Details */}
              <div className="space-y-md mb-lg">
                <h3 className="text-label font-semibold text-foreground">
                  {bookingData.room.tipo}
                </h3>
                <div className="flex items-center gap-xs text-label-sm text-muted-foreground">
                  <MapPin size={14} className="text-gold" />
                  <span>{bookingData.room.ciudad}</span>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-md mb-lg pb-lg border-b border-gold/20">
                <div className="flex items-start gap-sm">
                  <Calendar size={16} className="text-gold mt-1" />
                  <div className="flex-1">
                    <p className="text-label-sm text-muted-foreground">{t('booking.checkIn')}</p>
                    <p className="text-label text-foreground">{formatDate(bookingData.checkIn)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-sm">
                  <Calendar size={16} className="text-gold mt-1" />
                  <div className="flex-1">
                    <p className="text-label-sm text-muted-foreground">{t('booking.checkOut')}</p>
                    <p className="text-label text-foreground">{formatDate(bookingData.checkOut)}</p>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-md mb-lg">
                <div className="flex items-center justify-between text-label-sm">
                  <span className="text-muted-foreground">
                    {formatPrice(bookingData.room.precio_diario)} × {nights}{' '}
                    {nights === 1 ? t('booking.night') : t('booking.nights')}
                  </span>
                  <span className="text-foreground font-medium">{formatPrice(subtotal)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-lg border-t border-gold/20 mb-lg">
                <div className="flex items-center justify-between">
                  <span className="text-label font-semibold text-foreground">
                    {t('booking.total')}
                  </span>
                  <span className="text-heading text-gold font-bold">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Payment Button */}
              <Button variant="primary" className="w-full" onClick={handleProceedToPayment}>
                {t('booking.proceedToPayment')}
              </Button>

              <p className="text-label-sm text-muted-foreground text-center mt-md">
                {t('booking.noCancelFee')}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
