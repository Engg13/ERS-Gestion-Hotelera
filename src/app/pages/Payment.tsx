import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Button } from '@figma/astraui';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { Check } from 'lucide-react';
import Header from '../components/Header';
import { createReserva } from '../../services/reservaService';
import { createPago } from '../../services/pagoService';
import { createTicket } from '../../services/ticketService';
import { updateHabitacionEstado } from '../../services/habitacionService';

interface PaymentState {
  bookingData: {
    room: {
      id_habitacion: string;
      numero: string;
      tipo: string;
      precio_diario: number;
      ciudad: string;
    };
    checkIn: string;
    checkOut: string;
    guestInfo: {
      nombre: string;
      correo: string;
      telefono: string;
    };
    numberOfGuests: number;
    total: number;
    nights: number;
  };
}

const chileanBanks = [
  {
    id: 'banco-chile',
    name: 'Banco de Chile',
    url: 'https://www.bancochile.cl',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Banco_de_Chile_logo.svg/200px-Banco_de_Chile_logo.svg.png',
  },
  {
    id: 'santander',
    name: 'Santander',
    url: 'https://www.santander.cl',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/200px-Banco_Santander_Logotipo.svg.png',
  },
  {
    id: 'bci',
    name: 'BCI',
    url: 'https://www.bci.cl',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Banco_BCI_logo.svg/200px-Banco_BCI_logo.svg.png',
  },
  {
    id: 'banco-estado',
    name: 'Banco Estado',
    url: 'https://www.bancoestado.cl',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/BancoEstado_logo.svg/200px-BancoEstado_logo.svg.png',
  },
  {
    id: 'scotiabank',
    name: 'Scotiabank',
    url: 'https://www.scotiabank.cl',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Scotiabank.svg/200px-Scotiabank.svg.png',
  },
  {
    id: 'itau',
    name: 'Itaú',
    url: 'https://www.itau.cl',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Banco_Ita%C3%BA_logo.svg/200px-Banco_Ita%C3%BA_logo.svg.png',
  },
];

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { formatPrice } = useCurrency();

  const paymentData = location.state as PaymentState;

  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [reservationId, setReservationId] = useState<string | null>(null);

  useEffect(() => {
    if (!paymentData || !user) {
      navigate('/search');
      return;
    }
  }, [paymentData, user, navigate]);

  if (!paymentData || !user) {
    return null;
  }

  const handleBankClick = async (bankUrl: string) => {
    setProcessing(true);

    // Simulate bank redirection and payment processing
    // In production, this would redirect to the bank's payment gateway
    // For now, we'll simulate a 2-second delay

    setTimeout(async () => {
      try {
        // Create reservation
        const reservaResult = await createReserva({
          id_usuario: user.id_usuario,
          id_habitacion: paymentData.bookingData.room.id_habitacion,
          fecha_inicio: paymentData.bookingData.checkIn,
          fecha_fin: paymentData.bookingData.checkOut,
          total: paymentData.bookingData.total,
          estado: 'confirmada',
        });

        if (reservaResult.success && reservaResult.reserva) {
          const reservaId = reservaResult.reserva.id_reserva;
          setReservationId(reservaId);

          // Create payment record
          await createPago({
            id_reserva: reservaId,
            monto: paymentData.bookingData.total,
            metodo_pago: 'transferencia',
            estado: 'completado',
          });

          // Create ticket
          await createTicket({
            id_reserva: reservaId,
            codigo_qr: `GH-${reservaId}-${Date.now()}`,
          });

          // Update room status to occupied
          await updateHabitacionEstado(
            paymentData.bookingData.room.id_habitacion,
            'ocupada'
          );

          setPaymentSuccess(true);
        } else {
          alert(t('payment.error'));
          setProcessing(false);
        }
      } catch (error) {
        console.error('Payment processing error:', error);
        alert(t('payment.error'));
        setProcessing(false);
      }
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="max-w-3xl mx-auto p-2xl">
          <div className="bg-card rounded-corner-lg p-2xl border-2 border-gold/20 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-xl">
              <Check size={48} className="text-green-600" />
            </div>

            <h1 className="text-title text-gold mb-md font-serif">{t('payment.success')}</h1>
            <p className="text-label text-muted-foreground mb-2xl">
              {t('payment.successMessage')}
            </p>

            <div className="bg-bg-faint rounded-corner-md p-xl mb-xl">
              <div className="grid grid-cols-2 gap-lg text-left">
                <div>
                  <p className="text-label-sm text-muted-foreground mb-xs">
                    {t('payment.reservationNumber')}
                  </p>
                  <p className="text-label font-semibold text-foreground">
                    {reservationId?.slice(0, 8).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-label-sm text-muted-foreground mb-xs">
                    {t('payment.totalPaid')}
                  </p>
                  <p className="text-label font-semibold text-gold">
                    {formatPrice(paymentData.bookingData.total)}
                  </p>
                </div>
                <div>
                  <p className="text-label-sm text-muted-foreground mb-xs">
                    {t('payment.room')}
                  </p>
                  <p className="text-label font-semibold text-foreground">
                    {paymentData.bookingData.room.tipo}
                  </p>
                </div>
                <div>
                  <p className="text-label-sm text-muted-foreground mb-xs">
                    {t('payment.guests')}
                  </p>
                  <p className="text-label font-semibold text-foreground">
                    {paymentData.bookingData.numberOfGuests}{' '}
                    {paymentData.bookingData.numberOfGuests === 1
                      ? t('payment.guest')
                      : t('payment.guests')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-md justify-center">
              <Button variant="primary" onClick={() => navigate('/profile')}>
                {t('payment.viewReservations')}
              </Button>
              <Button variant="neutral" onClick={() => navigate('/')}>
                {t('payment.backToHome')}
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto p-2xl">
        <div className="bg-card rounded-corner-lg p-xl mb-xl border-2 border-gold/20">
          <h1 className="text-title text-gold mb-xs font-serif">{t('payment.title')}</h1>
          <p className="text-label-sm text-muted-foreground">{t('payment.selectBank')}</p>
        </div>

        {/* Payment Summary */}
        <div className="bg-card rounded-corner-lg p-xl mb-xl border-2 border-gold/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-label text-muted-foreground mb-xs">{t('payment.amountToPay')}</p>
              <p className="text-title text-gold font-bold">
                {formatPrice(paymentData.bookingData.total)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-label-sm text-muted-foreground">
                {paymentData.bookingData.room.tipo}
              </p>
              <p className="text-label-sm text-muted-foreground">
                {paymentData.bookingData.nights}{' '}
                {paymentData.bookingData.nights === 1
                  ? t('booking.night')
                  : t('booking.nights')}
              </p>
            </div>
          </div>
        </div>

        {/* Bank Selection */}
        <div className="bg-card rounded-corner-lg p-xl border-2 border-gold/20">
          <h2 className="text-heading text-gold mb-lg font-serif">
            {t('payment.choosePaymentMethod')}
          </h2>

          {processing ? (
            <div className="text-center py-2xl">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent mb-lg"></div>
              <p className="text-label text-muted-foreground">{t('payment.processing')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-lg">
              {chileanBanks.map((bank) => (
                <button
                  key={bank.id}
                  onClick={() => handleBankClick(bank.url)}
                  className="bg-white rounded-corner-md p-xl border-2 border-gold/20 hover:border-gold/60 transition-all hover:shadow-lg flex items-center justify-center h-32"
                >
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    className="max-w-full max-h-20 object-contain"
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<span class="text-label font-semibold text-gold">${bank.name}</span>`;
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          <div className="mt-xl pt-xl border-t border-gold/20">
            <p className="text-label-sm text-muted-foreground text-center">
              {t('payment.securePayment')}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
