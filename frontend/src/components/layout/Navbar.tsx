import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/navbar.css';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
  { label: 'Docs', href: '/docs' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      </header>

      <div id="nav-overlay" className={`navbar__overlay ${isOpen ? 'navbar__overlay--open' : ''}`} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <nav>
          <ul className="navbar__nav">
            {NAV_ITEMS.map((item) => (
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
