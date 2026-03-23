import { useState, type FormEvent } from 'react';
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
            Let's Work Together
          </SplitText>

          <RevealOnScroll delay={0.2}>
            <p className="contact__subtext">
              Have a project in mind or want to collaborate? Feel free to reach out.
              I'm always open to discussing new ideas and opportunities.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <div className="contact__links">
              {email && (
                <MagneticButton className="contact__link-btn" onClick={() => window.open(`mailto:${email}`)}>
                  Email
                </MagneticButton>
              )}
              {phone && (
                <MagneticButton className="contact__link-btn" onClick={() => window.open(`tel:${phone}`)}>
                  Phone
                </MagneticButton>
              )}
              {githubUrl && (
                <MagneticButton className="contact__link-btn" onClick={() => window.open(githubUrl, '_blank')}>
                  GitHub
                </MagneticButton>
              )}
              {linkedinUrl && (
                <MagneticButton className="contact__link-btn" onClick={() => window.open(linkedinUrl, '_blank')}>
                  LinkedIn
                </MagneticButton>
              )}
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.2} x={30} y={0}>
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__field">
              <input type="text" name="name" placeholder=" " required />
              <label>Name</label>
            </div>
            <div className="contact__field">
              <input type="email" name="email" placeholder=" " required />
              <label>Email</label>
            </div>
            <div className="contact__field">
              <input type="text" name="subject" placeholder=" " required />
              <label>Subject</label>
            </div>
            <div className="contact__field">
              <textarea name="message" placeholder=" " rows={4} required />
              <label>Message</label>
            </div>

            {status === 'success' && (
              <div className="contact__success">Message sent successfully!</div>
            )}
            {status === 'error' && (
              <div className="contact__error">Something went wrong. Try again later.</div>
            )}

            <MagneticButton
              className="contact__submit"
              strength={0.15}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </MagneticButton>
          </form>
        </RevealOnScroll>
      </div>
    </section>
  );
}
