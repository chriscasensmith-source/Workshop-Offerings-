import { ArrowUpRight } from 'lucide-react';
import { RegistrationLink } from './RegistrationLink';

export function RegistrationCTA() {
  return (
    <section id="register" className="registration-section" aria-labelledby="registration-heading">
      <div className="registration-shell">
        <div>
          <p className="eyebrow">Choose your next workshop</p>
          <h2 id="registration-heading">Ready to keep learning?</h2>
          <p>
            Choose the workshop that would make the biggest difference in your work and let us know
            you are interested.
          </p>
        </div>
        <RegistrationLink className="button registration-button">
          Register Through Microsoft Forms
          <ArrowUpRight aria-hidden="true" size={18} />
        </RegistrationLink>
      </div>
    </section>
  );
}
