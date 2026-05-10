import { useNavigate } from 'react-router';
import { Button } from '@figma/astraui';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { MapPin, Star } from 'lucide-react';

const hotels = [
  {
    id: 1,
    name: 'Grand Hotel Madrid',
    city: 'Madrid',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1723465308831-29da05e011f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NjU4MDgzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Elegancia y tradición en el corazón de Madrid',
  },
  {
    id: 2,
    name: 'Grand Hotel Barcelona',
    city: 'Barcelona',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1771293549382-62829fad8f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NjU4MDgzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Lujo contemporáneo frente al mar Mediterráneo',
  },
  {
    id: 3,
    name: 'Grand Hotel Sevilla',
    city: 'Sevilla',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1634041441461-a1789d008830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NjU4MDgzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Encanto andaluz con servicios de primera clase',
  },
  {
    id: 4,
    name: 'Grand Hotel Valencia',
    city: 'Valencia',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1762417422532-7bdaaf7d457a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NjU4MDgzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Modernidad y cultura en la ciudad de las artes',
  },
  {
    id: 5,
    name: 'Grand Hotel Málaga',
    city: 'Málaga',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1766164416048-ccc611d5b124?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NjU4MDgzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Esplendor mediterráneo en la Costa del Sol',
  },
  {
    id: 6,
    name: 'Grand Hotel Bilbao',
    city: 'Bilbao',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1739520081275-f893dc11fbd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NjU4MDgzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Vanguardia y tradición en el País Vasco',
  },
];

export default function Hotels() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto p-2xl">
        <div className="bg-card rounded-corner-lg p-xl mb-xl border-2 border-gold/20">
          <h1 className="text-title text-gold mb-xs font-serif">{t('hotels.title')}</h1>
          <p className="text-label-sm text-muted-foreground">
            {t('hotels.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-card rounded-corner-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer border border-gold/10 hover:border-gold/30"
              onClick={() => navigate('/search')}
            >
              <div className="h-64 relative">
                <ImageWithFallback
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-xl">
                <h2 className="text-heading text-gold mb-xs font-serif">{hotel.name}</h2>

                <div className="flex items-center gap-sm mb-lg">
                  <MapPin size={16} className="text-gold-dark" />
                  <span className="text-label-sm text-muted-foreground">{hotel.city}</span>
                </div>

                <div className="flex items-center gap-xs mb-lg">
                  {[...Array(hotel.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-gold text-gold" />
                  ))}
                </div>

                <p className="text-label-sm text-muted-foreground mb-lg">{hotel.description}</p>

                <Button variant="primary" className="w-full" onClick={() => navigate('/search')}>
                  {t('hotels.reserveNow')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
