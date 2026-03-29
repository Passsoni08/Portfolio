import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.education'), href: '#education' },
    { label: t('nav.contact'), href: '#contact' },
    { label: t('nav.docs'), href: '/docs' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      setIsHidden(currentY > lastScrollY && currentY > 100);
      setIsScrolled(currentY > window.innerHeight * 0.5);
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollTo = useCallback((href: string) => {
    setIsOpen(false);
    if (href.startsWith('/')) {
      setTimeout(() => navigate(href), 300);
      return;
    }
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  }, [navigate]);

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'pt-BR' : 'en';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  const navClasses = [
    'navbar',
    isHidden && !isOpen ? 'navbar--hidden' : '',
    isScrolled && !isOpen ? 'navbar--scrolled' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <header className={navClasses}>
        <div
          className="navbar__logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          R<span>.</span>P
        </div>

        <div className="navbar__controls">
          <button
            className="navbar__toggle"
            onClick={toggleLang}
            aria-label="Toggle language"
          >
            {i18n.language === 'en' ? 'PT' : 'EN'}
          </button>

          <button
            className="navbar__toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <button
            className={`navbar__hamburger ${isOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="nav-overlay"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="nav-overlay" className={`navbar__overlay ${isOpen ? 'navbar__overlay--open' : ''}`} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <nav>
          <ul className="navbar__nav">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  className="navbar__link"
                  onClick={() => scrollTo(item.href)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__overlay-footer">
          <span>Rafael Passoni</span>
          <a href="mailto:passonirafael08@gmail.com">passonirafael08@gmail.com</a>
        </div>
      </div>
    </>
  );
}
