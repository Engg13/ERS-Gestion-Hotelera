import { useNavigate } from 'react-router';
import { Button } from '@figma/astraui';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Calendar, Percent, Gift } from 'lucide-react';

const offers = [
  {
    id: 1,
    title: 'Escapada Romántica',
    discount: 30,
    validUntil: '30 de Mayo, 2026',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzc2NjA4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Suite con champagne, chocolates y desayuno incluido',
    terms: 'Válido para reservas de 2 noches o más',
  },
  {
    id: 2,
    title: 'Verano en la Costa',
    discount: 25,
    validUntil: '15 de Agosto, 2026',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzc2NjA4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Descuento especial en hoteles de playa',
    terms: 'Reserva anticipada hasta Junio',
  },
  {
    id: 3,
    title: 'Escapada de Negocios',
    discount: 20,
    validUntil: '31 de Diciembre, 2026',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzc2NjA4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Habitaciones ejecutivas con espacios de trabajo',
    terms: 'Reservas corporativas de lunes a viernes',
  },
  {
    id: 4,
    title: 'Paquete Familiar',
    discount: 35,
    validUntil: '30 de Junio, 2026',
    image: 'https://images.unsplash.com/photo-1607712617949-8c993d290809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzc2NjA4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Suites familiares con actividades para niños incluidas',
    terms: 'Mínimo 3 noches, hasta 2 niños gratis',
  },
  {
    id: 5,
    title: 'Fin de Semana Largo',
    discount: 15,
    validUntil: '31 de Mayo, 2026',
    image: 'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzc2NjA4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Descuento en estancias de viernes a domingo',
    terms: 'No válido en festivos nacionales',
  },
  {
    id: 6,
    title: 'Spa & Relax',
    discount: 40,
    validUntil: '30 de Abril, 2026',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzc2NjA4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Incluye masaje, acceso a spa y cena romántica',
    terms: 'Reserva con 15 días de anticipación',
  },
];

export default function Offers() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto p-2xl">
        <div className="bg-card rounded-corner-lg p-xl mb-xl border-2 border-gold/20">
          <h1 className="text-title text-gold mb-xs font-serif">{t('offers.title')}</h1>
          <p className="text-label-sm text-muted-foreground">
            {t('offers.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-card rounded-corner-lg overflow-hidden hover:shadow-xl transition-all border border-gold/10 hover:border-gold/30"
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-gold text-foreground px-lg py-sm rounded-corner-full flex items-center gap-xs border-2 border-gold-dark shadow-lg">
                  <Percent size={16} />
                  <span className="text-label font-semibold">{offer.discount}% OFF</span>
                </div>
              </div>

              <div className="p-xl">
                <h2 className="text-heading text-gold mb-xs font-serif">{offer.title}</h2>
                <p className="text-label text-muted-foreground mb-lg">{offer.description}</p>

                <div className="flex flex-col gap-sm mb-lg">
                  <div className="flex items-center gap-sm text-label-sm text-muted-foreground">
                    <Calendar size={16} className="text-gold" />
                    <span>{t('offers.validUntil')}: {offer.validUntil}</span>
                  </div>
                  <div className="flex items-center gap-sm text-label-sm text-muted-foreground">
                    <Gift size={16} className="text-gold" />
                    <span>{offer.terms}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => navigate('/search')}
                >
                  {t('offers.reserveDiscount')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
