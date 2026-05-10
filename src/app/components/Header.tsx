import { useNavigate, useLocation } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';

const menuItems = [
  { labelKey: 'nav.home', path: '/' },
  { labelKey: 'nav.hotels', path: '/hotels' },
  { labelKey: 'nav.offers', path: '/offers' },
  { labelKey: 'nav.gallery', path: '/gallery' },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

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
      </div>
    </header>
  );
}
