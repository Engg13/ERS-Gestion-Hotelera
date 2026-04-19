import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { X } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1560768999-fa392f9440bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGludGVyaW9yJTIwbHV4dXJ5fGVufDF8fHx8MTc3NjYxNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Lobby Elegante',
    category: 'Áreas Comunes',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1650634664813-cf873d3a59ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxob3RlbCUyMGludGVyaW9yJTIwbHV4dXJ5fGVufDF8fHx8MTc3NjYxNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Fachada Exterior',
    category: 'Exterior',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxob3RlbCUyMGludGVyaW9yJTIwbHV4dXJ5fGVufDF8fHx8MTc3NjYxNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Suite Deluxe',
    category: 'Habitaciones',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1560768999-d320214cc764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxob3RlbCUyMGludGVyaW9yJTIwbHV4dXJ5fGVufDF8fHx8MTc3NjYxNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Habitación con Vista',
    category: 'Habitaciones',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1525578309444-30d2f67cf02f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxob3RlbCUyMGludGVyaW9yJTIwbHV4dXJ5fGVufDF8fHx8MTc3NjYxNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Baño de Lujo',
    category: 'Baños',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1775866914767-7e4646f2481a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxob3RlbCUyMGludGVyaW9yJTIwbHV4dXJ5fGVufDF8fHx8MTc3NjYxNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Lounge Ejecutivo',
    category: 'Áreas Comunes',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1723465313715-586dd9689b8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxob3RlbCUyMGludGVyaW9yJTIwbHV4dXJ5fGVufDF8fHx8MTc3NjYxNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Sala de Estar',
    category: 'Áreas Comunes',
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1592494804071-faea15d93a8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxob3RlbCUyMGludGVyaW9yJTIwbHV4dXJ5fGVufDF8fHx8MTc3NjYxNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Restaurante',
    category: 'Gastronomía',
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1663659510284-e579a203416e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxob3RlbCUyMGludGVyaW9yJTIwbHV4dXJ5fGVufDF8fHx8MTc3NjYxNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Sala de Conferencias',
    category: 'Servicios',
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto p-2xl">
        <div className="bg-card rounded-corner-lg p-xl mb-xl border-2 border-gold/20">
          <h1 className="text-title text-gold mb-xs font-serif">{t('gallery.title')}</h1>
          <p className="text-label-sm text-muted-foreground">
            {t('gallery.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="bg-card rounded-corner-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all border border-gold/10 hover:border-gold/30"
              onClick={() => setSelectedImage(image.id)}
            >
              <div className="h-64 relative">
                <ImageWithFallback
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-lg">
                <h3 className="text-label text-gold font-semibold mb-xs">
                  {image.title}
                </h3>
                <p className="text-label-sm text-muted-foreground">{image.category}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-modal-scrim flex items-center justify-center p-2xl z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 bg-card border-2 border-gold rounded-full p-md hover:bg-gold transition-colors"
              aria-label="Cerrar"
            >
              <X size={24} className="text-gold hover:text-foreground" />
            </button>

            <div className="bg-card rounded-corner-lg overflow-hidden border-2 border-gold/30 shadow-2xl">
              <ImageWithFallback
                src={galleryImages.find((img) => img.id === selectedImage)?.url || ''}
                alt={galleryImages.find((img) => img.id === selectedImage)?.title || ''}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="p-xl">
                <h2 className="text-heading text-gold mb-xs font-serif">
                  {galleryImages.find((img) => img.id === selectedImage)?.title}
                </h2>
                <p className="text-label-sm text-muted-foreground">
                  {galleryImages.find((img) => img.id === selectedImage)?.category}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
