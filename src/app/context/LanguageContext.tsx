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
  'hotels.subtitle': { es: 'Descubre nuestra red de hoteles de lujo en las principales ciudades de Chile', en: 'Discover our network of luxury hotels in Chile\'s main cities', fr: 'Découvrez notre réseau d\'hôtels de luxe dans les principales villes du Chili', de: 'Entdecken Sie unser Netzwerk von Luxushotels in Chiles Hauptstädten' },
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
  'nav.profile': { es: 'Mi Perfil', en: 'My Profile', fr: 'Mon Profil', de: 'Mein Profil' },

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

  // Chilean Cities
  'city.santiago': { es: 'Santiago', en: 'Santiago', fr: 'Santiago', de: 'Santiago' },
  'city.valparaiso': { es: 'Valparaíso', en: 'Valparaíso', fr: 'Valparaíso', de: 'Valparaíso' },
  'city.vinaDelMar': { es: 'Viña del Mar', en: 'Viña del Mar', fr: 'Viña del Mar', de: 'Viña del Mar' },
  'city.concepcion': { es: 'Concepción', en: 'Concepción', fr: 'Concepción', de: 'Concepción' },
  'city.laSerena': { es: 'La Serena', en: 'La Serena', fr: 'La Serena', de: 'La Serena' },

  // Currency
  'currency.title': { es: 'Moneda', en: 'Currency', fr: 'Devise', de: 'Währung' },
  'currency.clp': { es: 'Peso Chileno (CLP)', en: 'Chilean Peso (CLP)', fr: 'Peso Chilien (CLP)', de: 'Chilenischer Peso (CLP)' },
  'currency.usd': { es: 'Dólar Estadounidense (USD)', en: 'US Dollar (USD)', fr: 'Dollar Américain (USD)', de: 'US-Dollar (USD)' },
  'currency.perNight': { es: 'por noche', en: 'per night', fr: 'par nuit', de: 'pro Nacht' },

  // Profile page
  'profile.title': { es: 'Mi Perfil', en: 'My Profile', fr: 'Mon Profil', de: 'Mein Profil' },
  'profile.subtitle': { es: 'Gestiona tu información personal', en: 'Manage your personal information', fr: 'Gérez vos informations personnelles', de: 'Verwalten Sie Ihre persönlichen Informationen' },
  'profile.personalInfo': { es: 'Información Personal', en: 'Personal Information', fr: 'Informations Personnelles', de: 'Persönliche Informationen' },
  'profile.name': { es: 'Nombre Completo', en: 'Full Name', fr: 'Nom Complet', de: 'Vollständiger Name' },
  'profile.email': { es: 'Correo Electrónico', en: 'Email', fr: 'E-mail', de: 'E-Mail' },
  'profile.phone': { es: 'Teléfono', en: 'Phone', fr: 'Téléphone', de: 'Telefon' },
  'profile.memberSince': { es: 'Miembro desde', en: 'Member since', fr: 'Membre depuis', de: 'Mitglied seit' },
  'profile.accountType': { es: 'Tipo de Cuenta', en: 'Account Type', fr: 'Type de Compte', de: 'Kontotyp' },
  'profile.client': { es: 'Cliente', en: 'Client', fr: 'Client', de: 'Kunde' },
  'profile.admin': { es: 'Administrador', en: 'Administrator', fr: 'Administrateur', de: 'Administrator' },
  'profile.editProfile': { es: 'Editar Perfil', en: 'Edit Profile', fr: 'Modifier le Profil', de: 'Profil Bearbeiten' },
  'profile.logout': { es: 'Cerrar Sesión', en: 'Logout', fr: 'Déconnexion', de: 'Abmelden' },
  'profile.myReservations': { es: 'Mis Reservas', en: 'My Reservations', fr: 'Mes Réservations', de: 'Meine Reservierungen' },
  'profile.edit': { es: 'Editar', en: 'Edit', fr: 'Modifier', de: 'Bearbeiten' },
  'profile.save': { es: 'Guardar', en: 'Save', fr: 'Enregistrer', de: 'Speichern' },
  'profile.cancel': { es: 'Cancelar', en: 'Cancel', fr: 'Annuler', de: 'Abbrechen' },
  'profile.changePhoto': { es: 'Cambiar Foto', en: 'Change Photo', fr: 'Changer la Photo', de: 'Foto Ändern' },
  'profile.uploadPhoto': { es: 'Subir Foto', en: 'Upload Photo', fr: 'Télécharger Photo', de: 'Foto Hochladen' },
  'profile.removePhoto': { es: 'Eliminar Foto', en: 'Remove Photo', fr: 'Supprimer Photo', de: 'Foto Entfernen' },
  'profile.updateSuccess': { es: 'Perfil actualizado correctamente', en: 'Profile updated successfully', fr: 'Profil mis à jour avec succès', de: 'Profil erfolgreich aktualisiert' },
  'profile.updateError': { es: 'Error al actualizar perfil', en: 'Error updating profile', fr: 'Erreur de mise à jour du profil', de: 'Fehler beim Aktualisieren des Profils' },
  'profile.phonePlaceholder': { es: '+56 9 1234 5678', en: '+1 555 000 0000', fr: '+33 6 00 00 00 00', de: '+49 000 0000000' },

  // Reservations
  'reservations.title': { es: 'Mis Reservas', en: 'My Reservations', fr: 'Mes Réservations', de: 'Meine Reservierungen' },
  'reservations.subtitle': { es: 'Historial de tus reservas', en: 'Your reservation history', fr: 'Historique de vos réservations', de: 'Ihre Reservierungshistorie' },
  'reservations.noReservations': { es: 'No tienes reservas todavía', en: 'You don\'t have any reservations yet', fr: 'Vous n\'avez pas encore de réservations', de: 'Sie haben noch keine Reservierungen' },
  'reservations.startBooking': { es: 'Buscar Habitaciones', en: 'Search Rooms', fr: 'Rechercher des Chambres', de: 'Zimmer Suchen' },
  'reservations.room': { es: 'Habitación', en: 'Room', fr: 'Chambre', de: 'Zimmer' },
  'reservations.checkIn': { es: 'Entrada', en: 'Check-in', fr: 'Arrivée', de: 'Anreise' },
  'reservations.checkOut': { es: 'Salida', en: 'Check-out', fr: 'Départ', de: 'Abreise' },
  'reservations.total': { es: 'Total', en: 'Total', fr: 'Total', de: 'Gesamt' },
  'reservations.status': { es: 'Estado', en: 'Status', fr: 'Statut', de: 'Status' },
  'reservations.confirmed': { es: 'Confirmada', en: 'Confirmed', fr: 'Confirmée', de: 'Bestätigt' },
  'reservations.cancelled': { es: 'Cancelada', en: 'Cancelled', fr: 'Annulée', de: 'Storniert' },
  'reservations.bookingDate': { es: 'Fecha de Reserva', en: 'Booking Date', fr: 'Date de Réservation', de: 'Buchungsdatum' },
  'reservations.viewDetails': { es: 'Ver Detalles', en: 'View Details', fr: 'Voir Détails', de: 'Details Anzeigen' },
  'reservations.cancel': { es: 'Cancelar Reserva', en: 'Cancel Reservation', fr: 'Annuler la Réservation', de: 'Reservierung Stornieren' },
  'reservations.cancelConfirm': { es: '¿Estás seguro de que deseas cancelar esta reserva?', en: 'Are you sure you want to cancel this reservation?', fr: 'Êtes-vous sûr de vouloir annuler cette réservation ?', de: 'Möchten Sie diese Reservierung wirklich stornieren?' },

  // Booking page
  'booking.title': { es: 'Confirmar Reserva', en: 'Confirm Reservation', fr: 'Confirmer la Réservation', de: 'Reservierung Bestätigen' },
  'booking.subtitle': { es: 'Verifica y completa tu información', en: 'Verify and complete your information', fr: 'Vérifiez et complétez vos informations', de: 'Überprüfen und vervollständigen Sie Ihre Informationen' },
  'booking.personalInfo': { es: 'Información Personal', en: 'Personal Information', fr: 'Informations Personnelles', de: 'Persönliche Informationen' },
  'booking.reservationDetails': { es: 'Detalles de la Reserva', en: 'Reservation Details', fr: 'Détails de la Réservation', de: 'Reservierungsdetails' },
  'booking.guestInfo': { es: 'Información del Huésped', en: 'Guest Information', fr: 'Informations sur l\'invité', de: 'Gästeinformationen' },
  'booking.numberOfGuests': { es: 'Número de Personas', en: 'Number of Guests', fr: 'Nombre de Personnes', de: 'Anzahl der Gäste' },
  'booking.guests': { es: 'personas', en: 'guests', fr: 'personnes', de: 'Gäste' },
  'booking.nights': { es: 'noches', en: 'nights', fr: 'nuits', de: 'Nächte' },
  'booking.pricePerNight': { es: 'Precio por noche', en: 'Price per night', fr: 'Prix par nuit', de: 'Preis pro Nacht' },
  'booking.totalNights': { es: 'Total noches', en: 'Total nights', fr: 'Total nuits', de: 'Gesamtnächte' },
  'booking.totalAmount': { es: 'Monto Total', en: 'Total Amount', fr: 'Montant Total', de: 'Gesamtbetrag' },
  'booking.proceedToPayment': { es: 'Proceder al Pago', en: 'Proceed to Payment', fr: 'Procéder au Paiement', de: 'Zur Zahlung Gehen' },
  'booking.backToRoom': { es: 'Volver a la Habitación', en: 'Back to Room', fr: 'Retour à la Chambre', de: 'Zurück zum Zimmer' },
  'booking.guestInformation': { es: 'Información del Huésped', en: 'Guest Information', fr: 'Informations sur l\'Invité', de: 'Gästeinformationen' },
  'booking.fullName': { es: 'Nombre Completo', en: 'Full Name', fr: 'Nom Complet', de: 'Vollständiger Name' },
  'booking.email': { es: 'Correo Electrónico', en: 'Email', fr: 'E-mail', de: 'E-Mail' },
  'booking.phone': { es: 'Teléfono', en: 'Phone', fr: 'Téléphone', de: 'Telefon' },
  'booking.maxGuests': { es: 'Máximo 4 personas', en: 'Maximum 4 guests', fr: 'Maximum 4 personnes', de: 'Maximal 4 Gäste' },
  'booking.reservationSummary': { es: 'Resumen de Reserva', en: 'Reservation Summary', fr: 'Résumé de la Réservation', de: 'Reservierungsübersicht' },
  'booking.checkIn': { es: 'Entrada', en: 'Check-in', fr: 'Arrivée', de: 'Anreise' },
  'booking.checkOut': { es: 'Salida', en: 'Check-out', fr: 'Départ', de: 'Abreise' },
  'booking.night': { es: 'noche', en: 'night', fr: 'nuit', de: 'Nacht' },
  'booking.total': { es: 'Total', en: 'Total', fr: 'Total', de: 'Gesamt' },
  'booking.noCancelFee': { es: 'Cancelación gratuita hasta 24h antes', en: 'Free cancellation up to 24h before', fr: 'Annulation gratuite jusqu\'à 24h avant', de: 'Kostenlose Stornierung bis 24h vorher' },
  'booking.nameRequired': { es: 'El nombre es obligatorio', en: 'Name is required', fr: 'Le nom est obligatoire', de: 'Name ist erforderlich' },
  'booking.emailRequired': { es: 'El correo es obligatorio', en: 'Email is required', fr: 'L\'e-mail est obligatoire', de: 'E-Mail ist erforderlich' },
  'booking.emailInvalid': { es: 'El correo no es válido', en: 'Email is invalid', fr: 'L\'e-mail n\'est pas valide', de: 'E-Mail ist ungültig' },
  'booking.phoneRequired': { es: 'El teléfono es obligatorio', en: 'Phone is required', fr: 'Le téléphone est obligatoire', de: 'Telefon ist erforderlich' },
  'booking.selectDatesFirst': { es: 'Por favor selecciona fechas primero desde la página de búsqueda', en: 'Please select dates first from the search page', fr: 'Veuillez d\'abord sélectionner les dates depuis la page de recherche', de: 'Bitte wählen Sie zuerst Daten von der Suchseite aus' },

  // Payment page
  'payment.title': { es: 'Selecciona tu Banco', en: 'Select Your Bank', fr: 'Sélectionnez Votre Banque', de: 'Wählen Sie Ihre Bank' },
  'payment.subtitle': { es: 'Elige tu banco para completar el pago', en: 'Choose your bank to complete payment', fr: 'Choisissez votre banque pour finaliser le paiement', de: 'Wählen Sie Ihre Bank zur Zahlungsabwicklung' },
  'payment.processing': { es: 'Procesando pago...', en: 'Processing payment...', fr: 'Traitement du paiement...', de: 'Zahlung wird verarbeitet...' },
  'payment.success': { es: '¡Pago Exitoso!', en: 'Payment Successful!', fr: 'Paiement Réussi !', de: 'Zahlung Erfolgreich!' },
  'payment.successMessage': { es: 'Tu reserva ha sido confirmada', en: 'Your reservation has been confirmed', fr: 'Votre réservation a été confirmée', de: 'Ihre Reservierung wurde bestätigt' },
  'payment.viewReservations': { es: 'Ver Mis Reservas', en: 'View My Reservations', fr: 'Voir Mes Réservations', de: 'Meine Reservierungen Anzeigen' },
  'payment.backToHome': { es: 'Volver al Inicio', en: 'Back to Home', fr: 'Retour à l\'Accueil', de: 'Zurück zur Startseite' },
  'payment.selectBank': { es: 'Selecciona un banco para continuar', en: 'Select a bank to continue', fr: 'Sélectionnez une banque pour continuer', de: 'Wählen Sie eine Bank zum Fortfahren' },
  'payment.amountToPay': { es: 'Monto a Pagar', en: 'Amount to Pay', fr: 'Montant à Payer', de: 'Zu Zahlender Betrag' },
  'payment.choosePaymentMethod': { es: 'Elige tu Método de Pago', en: 'Choose Your Payment Method', fr: 'Choisissez Votre Méthode de Paiement', de: 'Wählen Sie Ihre Zahlungsmethode' },
  'payment.securePayment': { es: 'Pago 100% seguro y encriptado', en: '100% secure and encrypted payment', fr: 'Paiement 100% sécurisé et crypté', de: '100% sichere und verschlüsselte Zahlung' },
  'payment.error': { es: 'Error al procesar el pago. Intenta nuevamente.', en: 'Error processing payment. Please try again.', fr: 'Erreur lors du traitement du paiement. Veuillez réessayer.', de: 'Fehler bei der Zahlungsabwicklung. Bitte versuchen Sie es erneut.' },
  'payment.reservationNumber': { es: 'Número de Reserva', en: 'Reservation Number', fr: 'Numéro de Réservation', de: 'Reservierungsnummer' },
  'payment.totalPaid': { es: 'Total Pagado', en: 'Total Paid', fr: 'Total Payé', de: 'Gesamt Bezahlt' },
  'payment.room': { es: 'Habitación', en: 'Room', fr: 'Chambre', de: 'Zimmer' },
  'payment.guests': { es: 'Personas', en: 'Guests', fr: 'Personnes', de: 'Gäste' },
  'payment.guest': { es: 'Persona', en: 'Guest', fr: 'Personne', de: 'Gast' },
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
