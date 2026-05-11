import { useNavigate, useLocation } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const publicMenuItems = [
  { labelKey: 'nav.home', path: '/' },
  { labelKey: 'nav.hotels', path: '/hotels' },
  { labelKey: 'nav.offers', path: '/offers' },
  { labelKey: 'nav.gallery', path: '/gallery' },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const { user, isGuest } = useAuth();

  // Build menu items dynamically
  const menuItems = [...publicMenuItems];

  // Add profile link only if user is logged in and not a guest
  if (user && !isGuest) {
    menuItems.push({ labelKey: 'nav.profile', path: '/profile' });
  }

  return (
    <header className="bg-card border-b-2 border-gold">
      <div className="max-w-7xl mx-auto px-2xl py-lg flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center hover:opacity-80 transition-opacity"
          aria-label="Ir a inicio"
        >
          <Logo className="h-14 w-auto" />
        </button>

        <div className="flex items-center gap-2xl">
          <nav className="flex gap-xl">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`text-label transition-all font-medium ${
                    isActive
                      ? 'text-gold font-semibold border-b-2 border-gold pb-1'
                      : 'text-foreground hover:text-gold'
                  }`}
                >
                  {t(item.labelKey)}
                </button>
              );
            })}
          </nav>

          <div className="flex gap-sm">
            <button
              onClick={() => setCurrency('CLP')}
              className={`px-md py-xs rounded-corner-sm text-label-sm font-medium transition-colors ${
                currency === 'CLP'
                  ? 'bg-gold text-foreground'
                  : 'text-muted-foreground hover:text-gold'
              }`}
            >
              CLP
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-md py-xs rounded-corner-sm text-label-sm font-medium transition-colors ${
                currency === 'USD'
                  ? 'bg-gold text-foreground'
                  : 'text-muted-foreground hover:text-gold'
              }`}
            >
              USD
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
