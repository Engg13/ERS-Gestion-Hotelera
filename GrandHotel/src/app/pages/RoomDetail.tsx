import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button, ButtonGroup } from '@figma/astraui';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ChevronLeft, ChevronRight, Wifi, Tv, Coffee, Wind } from 'lucide-react';
import Header from '../components/Header';

const roomsData: Record<
  string,
  {
    id: number;
    name: string;
    price: number;
    capacity: number;
    images: string[];
    description: string;
    amenities: string[];
    size: string;
  }
> = {
  '1': {
    id: 1,
    name: 'Suite Presidencial',
    price: 350,
    capacity: 4,
    size: '85 m²',
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzc2NjA4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzc2NjA4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzc2NjA4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description:
      'Nuestra Suite Presidencial ofrece la máxima expresión de lujo y confort. Con amplios espacios, decoración elegante y vistas panorámicas espectaculares, esta suite es perfecta para quienes buscan una experiencia inolvidable. Incluye sala de estar separada, comedor privado, dos baños completos con bañera de hidromasaje, y acceso exclusivo al club lounge ejecutivo.',
    amenities: ['WiFi de alta velocidad', 'TV LED 65"', 'Minibar premium', 'Aire acondicionado', 'Caja fuerte', 'Servicio de habitaciones 24h'],
  },
  '2': {
    id: 2,
    name: 'Suite Deluxe',
    price: 250,
    capacity: 3,
    size: '60 m²',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzc2NjA4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzc2NjA4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description:
      'La Suite Deluxe combina elegancia y funcionalidad en un espacio diseñado para su máximo confort. Cuenta con un dormitorio principal amplio, zona de estar independiente y baño completo con ducha de lluvia. Perfecta para estancias prolongadas o para quienes buscan un extra de espacio y comodidad.',
    amenities: ['WiFi gratis', 'Smart TV', 'Cafetera Nespresso', 'Climatización', 'Escritorio ejecutivo'],
  },
  '3': {
    id: 3,
    name: 'Habitación Ejecutiva',
    price: 180,
    capacity: 2,
    size: '40 m²',
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzc2NjA4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description:
      'Diseñada pensando en el viajero de negocios, nuestra Habitación Ejecutiva ofrece un espacio funcional y confortable con todas las comodidades necesarias para trabajar y descansar. Incluye escritorio amplio, silla ergonómica y conexión de alta velocidad.',
    amenities: ['WiFi premium', 'TV LED', 'Minibar', 'Aire acondicionado', 'Plancha'],
  },
  '4': {
    id: 4,
    name: 'Suite Junior',
    price: 220,
    capacity: 2,
    size: '50 m²',
    images: [
      'https://images.unsplash.com/photo-1607712617949-8c993d290809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzc2NjA4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description:
      'La Suite Junior ofrece un espacio acogedor y moderno con un diseño contemporáneo. Perfecta para parejas que buscan una experiencia especial, cuenta con una cama king size, zona de estar y baño completo con acabados de primera calidad.',
    amenities: ['WiFi', 'Smart TV', 'Cafetera', 'Climatización', 'Balcón privado'],
  },
  '5': {
    id: 5,
    name: 'Habitación Estándar',
    price: 120,
    capacity: 2,
    size: '30 m²',
    images: [
      'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzc2NjA4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description:
      'Nuestra Habitación Estándar ofrece comodidad y funcionalidad a un excelente precio. Equipada con todas las amenidades esenciales, es perfecta para viajeros que buscan una opción confortable sin sacrificar calidad.',
    amenities: ['WiFi', 'TV', 'Minibar', 'Aire acondicionado'],
  },
};

export default function RoomDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const room = id ? roomsData[id] : null;

  if (!room) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center p-2xl">
        <div className="bg-card rounded-corner-lg p-xl border-2 border-gold/20">
          <p className="text-label text-foreground">{t('room.notFound')}</p>
          <Button variant="neutral" onClick={() => navigate('/rooms')} className="mt-lg">
            {t('room.back')}
          </Button>
        </div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  const handleReservation = () => {
    alert('Reserva confirmada');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto p-2xl flex flex-col gap-xl">
        <div className="bg-card rounded-corner-lg overflow-hidden border-2 border-gold/20 shadow-lg">
          <div className="relative h-96 bg-bg-faint">
            <ImageWithFallback
              src={room.images[currentImageIndex]}
              alt={`${room.name} - Imagen ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {room.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/90 border-2 border-gold rounded-full p-md hover:bg-gold hover:text-foreground transition-colors"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft size={24} className="text-gold" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/90 border-2 border-gold rounded-full p-md hover:bg-gold hover:text-foreground transition-colors"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight size={24} className="text-gold" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-sm">
                  {room.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex
                          ? 'bg-gold'
                          : 'bg-card opacity-60 hover:opacity-100'
                      }`}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="p-xl">
            <div className="flex items-start justify-between mb-lg">
              <div>
                <h1 className="text-title text-gold mb-xs font-serif">{room.name}</h1>
                <div className="flex gap-xl text-label-sm text-muted-foreground">
                  <span>{room.size}</span>
                  <span>Capacidad: {room.capacity} personas</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-heading text-gold font-semibold">€{room.price}</span>
                <span className="text-label-sm text-gold-dark"> {t('rooms.perNight')}</span>
              </div>
            </div>

            <div className="mb-xl">
              <h2 className="text-heading text-gold mb-lg font-serif">{t('room.description')}</h2>
              <p className="text-label text-muted-foreground leading-relaxed">{room.description}</p>
            </div>

            <div className="mb-xl">
              <h2 className="text-heading text-gold mb-lg font-serif">{t('room.amenities')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-md">
                    {index % 4 === 0 && <Wifi size={20} className="text-gold" />}
                    {index % 4 === 1 && <Tv size={20} className="text-gold" />}
                    {index % 4 === 2 && <Coffee size={20} className="text-gold" />}
                    {index % 4 === 3 && <Wind size={20} className="text-gold" />}
                    <span className="text-label text-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ButtonGroup align="end">
          <Button variant="neutral" onClick={() => navigate('/rooms')}>
            {t('room.back')}
          </Button>
          <Button variant="primary" onClick={handleReservation}>
            {t('room.reserve')}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
