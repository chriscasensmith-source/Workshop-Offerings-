import { BellRing, Search, Send } from 'lucide-react';

const steps = [
  {
    title: 'Find a workshop',
    copy: 'Search the catalog and choose the topic that fits your goals or development needs.',
    Icon: Search,
  },
  {
    title: 'Register your interest',
    copy: 'Complete the short Microsoft Form and select the workshop that interests you.',
    Icon: Send,
  },
  {
    title: 'Watch for details',
    copy: 'Training dates and session information will be shared after interest is reviewed.',
    Icon: BellRing,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="how-section" aria-labelledby="how-heading">
      <div className="section-shell">
        <div className="how-intro">
          <p className="eyebrow">A simple next step</p>
          <h2 id="how-heading">How it works</h2>
          <p>Share what interests you. We’ll follow up when session details are ready.</p>
        </div>
        <ol className="steps-grid">
          {steps.map(({ title, copy, Icon }, index) => (
            <li key={title}>
              <div className="step-topline">
                <span className="step-number">0{index + 1}</span>
                <Icon aria-hidden="true" size={22} />
              </div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
        <p className="interest-note">
          Registering your interest helps us plan future sessions. It does not guarantee a seat.
        </p>
      </div>
    </section>
  );
}
