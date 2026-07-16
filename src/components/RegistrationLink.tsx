import { ExternalLink } from 'lucide-react';
import type { ReactNode } from 'react';
import { formUrl, isFormConfigured } from '../lib/registration';

interface RegistrationLinkProps {
  children: ReactNode;
  className?: string;
  courseTitle?: string;
}

export function RegistrationLink({
  children,
  className,
  courseTitle,
}: RegistrationLinkProps) {
  const accessibleLabel = courseTitle ? `Register for ${courseTitle}` : undefined;

  return (
    <a
      aria-label={accessibleLabel}
      className={className}
      href={formUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span>{children}</span>
      <ExternalLink aria-hidden="true" size={16} strokeWidth={2} />
      {!isFormConfigured && <span className="sr-only">Registration URL needs configuration.</span>}
    </a>
  );
}
