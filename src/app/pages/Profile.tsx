import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Button, ButtonGroup, InputField } from '@figma/astraui';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { User, Calendar, Mail, Phone, Shield, LogOut, Camera, Edit2 } from 'lucide-react';
import Header from '../components/Header';
import { getReservasByUsuario } from '../../services/reservaService';
import { updateUser } from '../../services/userService';
import { Reserva } from '../../lib/supabase';

export default function Profile() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout, isGuest } = useAuth();
  const { formatPrice } = useCurrency();
  const [reservations, setReservations] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'info' | 'reservations'>('info');
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    correo: user?.correo || '',
    telefono: user?.telefono || '',
  });
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Si no hay usuario o es invitado, redirigir a login
    if (!user || isGuest) {
      navigate('/');
      return;
    }

    // Cargar reservas del usuario
    loadReservations();

    // Cargar foto de perfil desde localStorage si existe
    const savedPhoto = localStorage.getItem(`profile_photo_${user.id_usuario}`);
    if (savedPhoto) {
      setPhotoUrl(savedPhoto);
    }
  }, [user, isGuest, navigate]);

  useEffect(() => {
    if (user) {
      setEditedData({
        correo: user.correo,
        telefono: user.telefono || '',
      });
    }
  }, [user]);

  const loadReservations = async () => {
    if (!user) return;

    setLoading(true);
    const result = await getReservasByUsuario(user.id_usuario);
    if (result.success && result.reservas) {
      setReservations(result.reservas);
    }
    setLoading(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({
      correo: user?.correo || '',
      telefono: user?.telefono || '',
    });
  };

  const handleSave = async () => {
    if (!user) return;

    const result = await updateUser(user.id_usuario, {
      correo: editedData.correo,
      telefono: editedData.telefono,
    });

    if (result.success && result.user) {
      // Actualizar el usuario en el contexto
      const updatedUser = {
        ...user,
        correo: result.user.correo,
        telefono: result.user.telefono,
      };
      localStorage.setItem('grandhotel_user', JSON.stringify(updatedUser));

      alert(t('profile.updateSuccess'));
      setIsEditing(false);

      // Recargar la página para actualizar el contexto
      window.location.reload();
    } else {
      alert(result.error || t('profile.updateError'));
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona una imagen');
        return;
      }

      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen debe ser menor a 5MB');
        return;
      }

      // Leer y guardar la imagen como base64 en localStorage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPhotoUrl(base64String);
        localStorage.setItem(`profile_photo_${user.id_usuario}`, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    if (user) {
      setPhotoUrl(null);
      localStorage.removeItem(`profile_photo_${user.id_usuario}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!user || isGuest) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto p-2xl">
        <div className="bg-card rounded-corner-lg p-xl mb-xl border-2 border-gold/20 shadow-lg">
          <h1 className="text-title text-gold mb-xs font-serif">{t('profile.title')}</h1>
          <p className="text-label-sm text-muted-foreground">{t('profile.subtitle')}</p>
        </div>

        <div className="flex gap-xl">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-card rounded-corner-lg p-xl border-2 border-gold/20">
              <div className="flex flex-col items-center mb-xl">
                <div className="relative mb-lg">
                  <div className="w-24 h-24 rounded-full bg-gold/20 flex items-center justify-center overflow-hidden border-2 border-gold/40">
                    {photoUrl ? (
                      <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={48} className="text-gold" />
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gold text-foreground flex items-center justify-center hover:bg-gold-dark transition-colors border-2 border-card"
                  >
                    <Camera size={16} />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                {photoUrl && (
                  <button
                    onClick={handleRemovePhoto}
                    className="text-label-sm text-muted-foreground hover:text-gold transition-colors mb-md"
                  >
                    {t('profile.removePhoto')}
                  </button>
                )}
                <h2 className="text-heading text-gold font-serif mb-xs">{user.nombre}</h2>
                <p className="text-label-sm text-muted-foreground">{user.correo}</p>
              </div>

              <div className="flex flex-col gap-md">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`px-lg py-md rounded-corner-sm text-label transition-colors text-left ${
                    activeTab === 'info'
                      ? 'bg-gold text-foreground font-medium'
                      : 'text-muted-foreground hover:text-gold hover:bg-gold/10'
                  }`}
                >
                  {t('profile.personalInfo')}
                </button>
                <button
                  onClick={() => setActiveTab('reservations')}
                  className={`px-lg py-md rounded-corner-sm text-label transition-colors text-left ${
                    activeTab === 'reservations'
                      ? 'bg-gold text-foreground font-medium'
                      : 'text-muted-foreground hover:text-gold hover:bg-gold/10'
                  }`}
                >
                  {t('profile.myReservations')}
                </button>
              </div>

              <div className="mt-xl pt-xl border-t border-gold/20">
                <Button variant="destructive" onClick={handleLogout} className="w-full">
                  <LogOut size={16} className="mr-sm" />
                  {t('profile.logout')}
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'info' && (
              <div className="bg-card rounded-corner-lg p-xl border-2 border-gold/20">
                <div className="flex items-center justify-between mb-xl">
                  <h2 className="text-heading text-gold font-serif">{t('profile.personalInfo')}</h2>
                  {!isEditing && (
                    <Button variant="neutral" onClick={handleEdit} size="small">
                      <Edit2 size={16} className="mr-sm" />
                      {t('profile.edit')}
                    </Button>
                  )}
                </div>

                <div className="space-y-lg">
                  <div className="flex items-start gap-lg p-lg rounded-corner-md bg-bg-faint">
                    <User size={20} className="text-gold mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-label-sm text-muted-foreground mb-xs">{t('profile.name')}</p>
                      <p className="text-label text-foreground font-medium">{user.nombre}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-lg p-lg rounded-corner-md bg-bg-faint">
                    <Mail size={20} className="text-gold mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-label-sm text-muted-foreground mb-xs">{t('profile.email')}</p>
                      {isEditing ? (
                        <InputField
                          type="email"
                          value={editedData.correo}
                          onChange={(val) => setEditedData({ ...editedData, correo: val })}
                          placeholder={t('register.emailPlaceholder')}
                        />
                      ) : (
                        <p className="text-label text-foreground font-medium">{user.correo}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-lg p-lg rounded-corner-md bg-bg-faint">
                    <Phone size={20} className="text-gold mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-label-sm text-muted-foreground mb-xs">{t('profile.phone')}</p>
                      {isEditing ? (
                        <InputField
                          type="tel"
                          value={editedData.telefono}
                          onChange={(val) => setEditedData({ ...editedData, telefono: val })}
                          placeholder={t('profile.phonePlaceholder')}
                        />
                      ) : (
                        <p className="text-label text-foreground font-medium">
                          {user.telefono || '-'}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-lg p-lg rounded-corner-md bg-bg-faint">
                    <Shield size={20} className="text-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-label-sm text-muted-foreground mb-xs">{t('profile.accountType')}</p>
                      <p className="text-label text-foreground font-medium">
                        {user.tipo_usuario === 'admin' ? t('profile.admin') : t('profile.client')}
                      </p>
                    </div>
                  </div>

                  {user.created_at && (
                    <div className="flex items-start gap-lg p-lg rounded-corner-md bg-bg-faint">
                      <Calendar size={20} className="text-gold mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-label-sm text-muted-foreground mb-xs">{t('profile.memberSince')}</p>
                        <p className="text-label text-foreground font-medium">{formatDate(user.created_at)}</p>
                      </div>
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="flex gap-md mt-xl pt-xl border-t border-gold/20">
                    <Button variant="primary" onClick={handleSave} className="flex-1">
                      {t('profile.save')}
                    </Button>
                    <Button variant="neutral" onClick={handleCancel} className="flex-1">
                      {t('profile.cancel')}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reservations' && (
              <div className="bg-card rounded-corner-lg p-xl border-2 border-gold/20">
                <h2 className="text-heading text-gold mb-xl font-serif">{t('reservations.title')}</h2>

                {loading ? (
                  <div className="text-center py-2xl">
                    <p className="text-label text-muted-foreground">{t('login.loading')}</p>
                  </div>
                ) : reservations.length === 0 ? (
                  <div className="text-center py-2xl">
                    <p className="text-label text-muted-foreground mb-xl">{t('reservations.noReservations')}</p>
                    <Button variant="primary" onClick={() => navigate('/search')}>
                      {t('reservations.startBooking')}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-lg">
                    {reservations.map((reservation) => (
                      <div
                        key={reservation.id_reserva}
                        className="p-lg border border-gold/20 rounded-corner-md hover:border-gold/40 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-lg">
                          <div>
                            <p className="text-label text-foreground font-medium mb-xs">
                              {t('reservations.bookingDate')}: {formatDate(reservation.fecha_reserva)}
                            </p>
                            <div className="flex gap-lg text-label-sm text-muted-foreground">
                              <span>
                                {t('reservations.checkIn')}: {formatDate(reservation.fecha_inicio)}
                              </span>
                              <span>•</span>
                              <span>
                                {t('reservations.checkOut')}: {formatDate(reservation.fecha_fin)}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`px-lg py-xs rounded-corner-sm text-label-sm font-medium ${
                              reservation.estado === 'confirmada'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {reservation.estado === 'confirmada'
                              ? t('reservations.confirmed')
                              : t('reservations.cancelled')}
                          </div>
                        </div>

                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-label-sm text-muted-foreground mb-xs">{t('reservations.total')}</p>
                            <p className="text-heading text-gold font-semibold">{formatPrice(reservation.total)}</p>
                          </div>
                          {reservation.estado === 'confirmada' && (
                            <ButtonGroup>
                              <Button variant="neutral" size="small">
                                {t('reservations.viewDetails')}
                              </Button>
                            </ButtonGroup>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
