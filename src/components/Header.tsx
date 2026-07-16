import { BookOpenText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { RegistrationLink } from './RegistrationLink';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 8);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  return (
    <header className="site-header" data-scrolled={String(scrolled)}>
      <div className="header-shell">
        <a className="wordmark" href="#top" aria-label="Workplace Learning home">
          <span className="wordmark-mark" aria-hidden="true">
            <BookOpenText size={19} strokeWidth={2.2} />
          </span>
          <span>Workplace Learning</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#courses">Courses</a>
          <a href="#how-it-works">How It Works</a>
          <RegistrationLink>Register</RegistrationLink>
        </nav>
        <RegistrationLink className="button button-header">Register</RegistrationLink>
      </div>
    </header>
  );
}
