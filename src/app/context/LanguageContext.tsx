import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en' | 'fr' | 'de';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Login page
  'login.title': { es: 'GRAND HOTEL', en: 'GRAND HOTEL', fr: 'GRAND HOTEL', de: 'GRAND HOTEL' },
  'login.welcome': { es: 'Bienvenido', en: 'Welcome', fr: 'Bienvenue', de: 'Willkommen' },
  'login.language': { es: 'Idioma / Language', en: 'Language / Idioma', fr: 'Langue / Language', de: 'Sprache / Language' },
  'login.username': { es: 'Usuario', en: 'Username', fr: 'Utilisateur', de: 'Benutzername' },
  'login.email': { es: 'Correo Electrónico', en: 'Email', fr: 'E-mail', de: 'E-Mail' },
  'login.password': { es: 'Contraseña', en: 'Password', fr: 'Mot de passe', de: 'Passwort' },
  'login.usernamePlaceholder': { es: 'Ingrese su usuario...', en: 'Enter your username...', fr: 'Entrez votre nom d\'utilisateur...', de: 'Geben Sie Ihren Benutzernamen ein...' },
  'login.emailPlaceholder': { es: 'correo@ejemplo.com', en: 'email@example.com', fr: 'email@exemple.com', de: 'email@beispiel.de' },
  'login.passwordPlaceholder': { es: 'Ingrese su contraseña...', en: 'Enter your password...', fr: 'Entrez votre mot de passe...', de: 'Geben Sie Ihr Passwort ein...' },
  'login.loginButton': { es: 'Ingresar', en: 'Login', fr: 'Connexion', de: 'Anmelden' },
  'login.loading': { es: 'Cargando...', en: 'Loading...', fr: 'Chargement...', de: 'Laden...' },
  'login.createAccount': { es: 'Crear Cuenta', en: 'Create Account', fr: 'Créer un compte', de: 'Konto erstellen' },
  'login.guestLogin': { es: 'Ingresar como Invitado', en: 'Login as Guest', fr: 'Connexion en tant qu\'invité', de: 'Als Gast anmelden' },

  // Search page
  'search.title': { es: 'Búsqueda de Habitaciones', en: 'Room Search', fr: 'Recherche de chambres', de: 'Zimmersuche' },
  'search.subtitle': { es: 'Encuentra tu habitación ideal', en: 'Find your ideal room', fr: 'Trouvez votre chambre idéale', de: 'Finden Sie Ihr ideales Zimmer' },
  'search.city': { es: 'Ciudad', en: 'City', fr: 'Ville', de: 'Stadt' },
  'search.cityPlaceholder': { es: 'Selecciona una ciudad', en: 'Select a city', fr: 'Sélectionnez une ville', de: 'Wählen Sie eine Stadt' },
  'search.checkIn': { es: 'Fecha de Llegada', en: 'Check-in Date', fr: 'Date d\'arrivée', de: 'Anreisedatum' },
  'search.checkOut': { es: 'Fecha de Salida', en: 'Check-out Date', fr: 'Date de départ', de: 'Abreisedatum' },
  'search.searchButton': { es: 'Buscar', en: 'Search', fr: 'Rechercher', de: 'Suchen' },

  // Room list page
  'rooms.title': { es: 'Habitaciones Disponibles', en: 'Available Rooms', fr: 'Chambres disponibles', de: 'Verfügbare Zimmer' },
  'rooms.capacity': { es: 'Capacidad', en: 'Capacity', fr: 'Capacité', de: 'Kapazität' },
  'rooms.people': { es: 'personas', en: 'people', fr: 'personnes', de: 'Personen' },
  'rooms.perNight': { es: '/ noche', en: '/ night', fr: '/ nuit', de: '/ Nacht' },
  'rooms.viewDetails': { es: 'Ver Detalles', en: 'View Details', fr: 'Voir les détails', de: 'Details anzeigen' },
  'rooms.backToSearch': { es: 'Volver a la Búsqueda', en: 'Back to Search', fr: 'Retour à la recherche', de: 'Zurück zur Suche' },

  // Room detail page
  'room.description': { es: 'Descripción', en: 'Description', fr: 'Description', de: 'Beschreibung' },
  'room.amenities': { es: 'Amenidades', en: 'Amenities', fr: 'Équipements', de: 'Annehmlichkeiten' },
  'room.reserve': { es: 'Reservar', en: 'Reserve', fr: 'Réserver', de: 'Reservieren' },
  'room.back': { es: 'Volver', en: 'Back', fr: 'Retour', de: 'Zurück' },
  'room.notFound': { es: 'Habitación no encontrada', en: 'Room not found', fr: 'Chambre non trouvée', de: 'Zimmer nicht gefunden' },

  // Hotels page
  'hotels.title': { es: 'Nuestros Hoteles', en: 'Our Hotels', fr: 'Nos hôtels', de: 'Unsere Hotels' },
  'hotels.subtitle': { es: 'Descubre nuestra red de hoteles de lujo en las principales ciudades de España', en: 'Discover our network of luxury hotels in Spain\'s main cities', fr: 'Découvrez notre réseau d\'hôtels de luxe dans les principales villes d\'Espagne', de: 'Entdecken Sie unser Netzwerk von Luxushotels in Spaniens Hauptstädten' },
  'hotels.reserveNow': { es: 'Reservar Ahora', en: 'Reserve Now', fr: 'Réserver maintenant', de: 'Jetzt reservieren' },

  // Offers page
  'offers.title': { es: 'Ofertas de Viaje', en: 'Travel Offers', fr: 'Offres de voyage', de: 'Reiseangebote' },
  'offers.subtitle': { es: 'Aprovecha nuestras promociones especiales y ahorra en tu próxima estancia', en: 'Take advantage of our special promotions and save on your next stay', fr: 'Profitez de nos promotions spéciales et économisez sur votre prochain séjour', de: 'Nutzen Sie unsere Sonderaktionen und sparen Sie bei Ihrem nächsten Aufenthalt' },
  'offers.validUntil': { es: 'Válido hasta', en: 'Valid until', fr: 'Valable jusqu\'au', de: 'Gültig bis' },
  'offers.reserveDiscount': { es: 'Reservar con Descuento', en: 'Reserve with Discount', fr: 'Réserver avec réduction', de: 'Mit Rabatt reservieren' },

  // Gallery page
  'gallery.title': { es: 'Galería del Hotel', en: 'Hotel Gallery', fr: 'Galerie de l\'hôtel', de: 'Hotelgalerie' },
  'gallery.subtitle': { es: 'Descubre los espacios y servicios de nuestros hoteles', en: 'Discover the spaces and services of our hotels', fr: 'Découvrez les espaces et services de nos hôtels', de: 'Entdecken Sie die Räume und Dienstleistungen unserer Hotels' },

  // Navigation
  'nav.home': { es: 'Inicio', en: 'Home', fr: 'Accueil', de: 'Startseite' },
  'nav.hotels': { es: 'Hoteles', en: 'Hotels', fr: 'Hôtels', de: 'Hotels' },
  'nav.offers': { es: 'Ofertas de Viaje', en: 'Travel Offers', fr: 'Offres de voyage', de: 'Reiseangebote' },
  'nav.gallery': { es: 'Galería del Hotel', en: 'Hotel Gallery', fr: 'Galerie de l\'hôtel', de: 'Hotelgalerie' },

  // Register page
  'register.title': { es: 'Crear Cuenta', en: 'Create Account', fr: 'Créer un compte', de: 'Konto erstellen' },
  'register.subtitle': { es: 'Únete a Grand Hotel', en: 'Join Grand Hotel', fr: 'Rejoignez Grand Hotel', de: 'Werden Sie Mitglied bei Grand Hotel' },
  'register.name': { es: 'Nombre Completo', en: 'Full Name', fr: 'Nom complet', de: 'Vollständiger Name' },
  'register.firstName': { es: 'Nombre', en: 'First Name', fr: 'Prénom', de: 'Vorname' },
  'register.lastName': { es: 'Apellido', en: 'Last Name', fr: 'Nom', de: 'Nachname' },
  'register.email': { es: 'Correo Electrónico', en: 'Email', fr: 'E-mail', de: 'E-Mail' },
  'register.phone': { es: 'Teléfono', en: 'Phone', fr: 'Téléphone', de: 'Telefon' },
  'register.username': { es: 'Usuario', en: 'Username', fr: 'Utilisateur', de: 'Benutzername' },
  'register.password': { es: 'Contraseña', en: 'Password', fr: 'Mot de passe', de: 'Passwort' },
  'register.confirmPassword': { es: 'Confirmar Contraseña', en: 'Confirm Password', fr: 'Confirmer le mot de passe', de: 'Passwort bestätigen' },
  'register.namePlaceholder': { es: 'Ingrese su nombre completo...', en: 'Enter your full name...', fr: 'Entrez votre nom complet...', de: 'Geben Sie Ihren vollständigen Namen ein...' },
  'register.firstNamePlaceholder': { es: 'Ingrese su nombre...', en: 'Enter your first name...', fr: 'Entrez votre prénom...', de: 'Geben Sie Ihren Vornamen ein...' },
  'register.lastNamePlaceholder': { es: 'Ingrese su apellido...', en: 'Enter your last name...', fr: 'Entrez votre nom...', de: 'Geben Sie Ihren Nachnamen ein...' },
  'register.emailPlaceholder': { es: 'correo@ejemplo.com', en: 'email@example.com', fr: 'email@exemple.com', de: 'email@beispiel.de' },
  'register.phonePlaceholder': { es: '+34 600 000 000', en: '+1 555 000 0000', fr: '+33 6 00 00 00 00', de: '+49 000 0000000' },
  'register.registerButton': { es: 'Registrarse', en: 'Register', fr: 'S\'inscrire', de: 'Registrieren' },
  'register.alreadyHaveAccount': { es: '¿Ya tienes cuenta?', en: 'Already have an account?', fr: 'Vous avez déjà un compte ?', de: 'Haben Sie bereits ein Konto?' },
  'register.loginHere': { es: 'Inicia sesión aquí', en: 'Login here', fr: 'Connectez-vous ici', de: 'Hier anmelden' },

  // Validation messages
  'validation.required': { es: 'Este campo es obligatorio', en: 'This field is required', fr: 'Ce champ est obligatoire', de: 'Dieses Feld ist erforderlich' },
  'validation.selectCity': { es: 'Por favor selecciona una ciudad', en: 'Please select a city', fr: 'Veuillez sélectionner une ville', de: 'Bitte wählen Sie eine Stadt' },
  'validation.selectCheckIn': { es: 'Por favor selecciona la fecha de llegada', en: 'Please select check-in date', fr: 'Veuillez sélectionner la date d\'arrivée', de: 'Bitte wählen Sie das Anreisedatum' },
  'validation.selectCheckOut': { es: 'Por favor selecciona la fecha de salida', en: 'Please select check-out date', fr: 'Veuillez sélectionner la date de départ', de: 'Bitte wählen Sie das Abreisedatum' },
  'validation.passwordMismatch': { es: 'Las contraseñas no coinciden', en: 'Passwords do not match', fr: 'Les mots de passe ne correspondent pas', de: 'Passwörter stimmen nicht überein' },
  'validation.loginError': { es: 'Error al iniciar sesión', en: 'Login error', fr: 'Erreur de connexion', de: 'Anmeldefehler' },
  'validation.registerError': { es: 'Error al registrar usuario', en: 'Registration error', fr: 'Erreur d\'inscription', de: 'Registrierungsfehler' },

  // Reservation messages
  'reservation.guestPrompt': { es: 'Necesitas crear una cuenta para realizar una reserva. ¿Deseas registrarte ahora?', en: 'You need to create an account to make a reservation. Do you want to register now?', fr: 'Vous devez créer un compte pour effectuer une réservation. Voulez-vous vous inscrire maintenant ?', de: 'Sie müssen ein Konto erstellen, um eine Reservierung vorzunehmen. Möchten Sie sich jetzt registrieren?' },
  'reservation.confirmed': { es: 'Reserva confirmada para', en: 'Reservation confirmed for', fr: 'Réservation confirmée pour', de: 'Reservierung bestätigt für' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
