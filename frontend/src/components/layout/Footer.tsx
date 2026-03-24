import MagneticButton from '../ui/MagneticButton';
import '../../styles/footer.css';

interface FooterProps {
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
}

export default function Footer({ githubUrl, linkedinUrl, email }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__copyright">
          &copy; {new Date().getFullYear()} Rafael Passoni
          <span> &middot; Built with Django &amp; React</span>
        </div>

        <div className="footer__links" aria-label="Social links">
          {githubUrl && (
            <MagneticButton
              className="footer__link"
              onClick={() => window.open(githubUrl, '_blank')}
              aria-label="GitHub"
            >
              GH
            </MagneticButton>
          )}
          {linkedinUrl && (
            <MagneticButton
              className="footer__link"
              onClick={() => window.open(linkedinUrl, '_blank')}
              aria-label="LinkedIn"
            >
              LI
            </MagneticButton>
          )}
          {email && (
            <MagneticButton
              className="footer__link"
              onClick={() => window.open(`mailto:${email}`)}
              aria-label="Email"
            >
              @
            </MagneticButton>
          )}
        </div>
      </div>
    </footer>
  );
}
