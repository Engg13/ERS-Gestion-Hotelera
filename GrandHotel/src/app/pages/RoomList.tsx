import { useNavigate, useLocation } from 'react-router';
import { Button } from '@figma/astraui';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import Header from '../components/Header';

const rooms = [
  {
    id: 1,
    name: 'Suite Presidencial',
    price: 350,
    capacity: 4,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzc2NjA4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Habitación lujosa con vista panorámica',
  },
  {
    id: 2,
    name: 'Suite Deluxe',
    price: 250,
    capacity: 3,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzc2NjA4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Elegancia y confort en cada detalle',
  },
  {
    id: 3,
    name: 'Habitación Ejecutiva',
    price: 180,
    capacity: 2,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzc2NjA4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Perfecta para viajes de negocios',
  },
  {
    id: 4,
    name: 'Suite Junior',
    price: 220,
    capacity: 2,
    image: 'https://images.unsplash.com/photo-1607712617949-8c993d290809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzc2NjA4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Espacio acogedor y moderno',
  },
  {
    id: 5,
    name: 'Habitación Estándar',
    price: 120,
    capacity: 2,
    image: 'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzc2NjA4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Comodidad a buen precio',
  },
];

export default function RoomList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { city, checkIn, checkOut } = location.state || {};

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto p-2xl">
        <div className="bg-card rounded-corner-lg p-xl mb-xl border-2 border-gold/20">
          <h1 className="text-title text-gold mb-xs font-serif">{t('rooms.title')}</h1>
          <p className="text-label-sm text-muted-foreground">
            {city && `${city} • `}
            {checkIn && checkOut && `${checkIn} - ${checkOut}`}
          </p>
        </div>

        <div className="flex flex-col gap-xl">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-card rounded-corner-lg overflow-hidden flex flex-col md:flex-row cursor-pointer hover:shadow-xl transition-all border border-gold/10 hover:border-gold/30"
              onClick={() => navigate(`/room/${room.id}`)}
            >
              <div className="w-full md:w-80 h-64 md:h-auto flex-shrink-0">
                <ImageWithFallback
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-xl flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-heading text-gold mb-xs font-serif">{room.name}</h2>
                  <p className="text-label-sm text-muted-foreground mb-lg">{room.description}</p>

                  <div className="flex gap-xl text-label-sm text-muted-foreground">
                    <span>{t('rooms.capacity')}: {room.capacity} {t('rooms.people')}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-lg">
                  <div>
                    <span className="text-heading text-gold font-semibold">
                      €{room.price}
                    </span>
                    <span className="text-label-sm text-gold-dark"> {t('rooms.perNight')}</span>
                  </div>
                  <Button variant="primary" onClick={() => navigate(`/room/${room.id}`)}>
                    {t('rooms.viewDetails')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-xl flex justify-center">
          <Button variant="neutral" onClick={() => navigate('/search')}>
            {t('rooms.backToSearch')}
          </Button>
        </div>
      </div>
    </div>
  );
}
