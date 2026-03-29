import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import SplitText from '../ui/SplitText';
import RevealOnScroll from '../ui/RevealOnScroll';
import MagneticButton from '../ui/MagneticButton';
import { submitContact } from '../../services/api';
import '../../styles/contact.css';

interface ContactProps {
  email?: string;
  phone?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact({ email, phone, githubUrl, linkedinUrl }: ContactProps) {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    if (!data.name || !data.email || !data.subject || !data.message) return;

    setStatus('sending');
    try {
      await submitContact(data);
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="section container" id="contact">
      <div className="contact">
        <div>
          <SplitText as="h2" type="words" className="contact__heading">
            {t('contact.title')}
          </SplitText>

          <RevealOnScroll delay={0.2}>
            <p className="contact__subtext">
              {t('contact.subtitle')}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <div className="contact__links">
              {email && (
                <MagneticButton className="contact__link-btn" onClick={() => window.open(`mailto:${email}`)}>
                  {t('contact.email')}
                </MagneticButton>
              )}
              {phone && (
                <MagneticButton className="contact__link-btn" onClick={() => window.open(`tel:${phone}`)}>
                  {t('contact.phone')}
                </MagneticButton>
              )}
              {githubUrl && (
                <MagneticButton className="contact__link-btn" onClick={() => window.open(githubUrl, '_blank')}>
                  {t('contact.github')}
                </MagneticButton>
              )}
              {linkedinUrl && (
                <MagneticButton className="contact__link-btn" onClick={() => window.open(linkedinUrl, '_blank')}>
                  {t('contact.linkedin')}
                </MagneticButton>
              )}
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.2} x={30} y={0}>
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__field">
              <input type="text" name="name" id="contact-name" placeholder=" " required aria-required="true" minLength={2} />
              <label htmlFor="contact-name">{t('contact.name')}</label>
            </div>
            <div className="contact__field">
              <input type="email" name="email" id="contact-email" placeholder=" " required aria-required="true" />
              <label htmlFor="contact-email">{t('contact.email')}</label>
            </div>
            <div className="contact__field">
              <input type="text" name="subject" id="contact-subject" placeholder=" " required aria-required="true" minLength={3} />
              <label htmlFor="contact-subject">{t('contact.subject')}</label>
            </div>
            <div className="contact__field">
              <textarea name="message" id="contact-message" placeholder=" " rows={4} required aria-required="true" minLength={10} />
              <label htmlFor="contact-message">{t('contact.message')}</label>
            </div>

            {status === 'success' && (
              <div className="contact__success" role="status">{t('contact.success')}</div>
            )}
            {status === 'error' && (
              <div className="contact__error" role="alert">{t('contact.error')}</div>
            )}

            <MagneticButton
              className="contact__submit"
              strength={0.15}
            >
              {status === 'sending' ? t('contact.sending') : t('contact.send')}
            </MagneticButton>
          </form>
        </RevealOnScroll>
      </div>
    </section>
  );
}
