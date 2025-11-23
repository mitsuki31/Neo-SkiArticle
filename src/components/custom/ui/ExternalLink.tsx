export interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  newTab?: boolean;  // default: true
  ariaLabel?: string;
}

export function ExternalLink({
  href,
  newTab = true,
  ariaLabel,
  children,
  rel: incomingRel = "",
  ...rest
}: ExternalLinkProps) {
  const target = newTab ? "_blank" : undefined;

  // Normalize incoming `rel`
  const normalizedRel = incomingRel
    .replace(/\bnoopener\b/g, "")
    .replace(/\bnoreferrer\b/g, "")
    .replace(/\s+/g, " ") // collapse extra spaces
    .trim();

  const rel =`${normalizedRel} noopener noreferrer`.trim();

  return (
    <a href={href} target={target} rel={rel} aria-label={ariaLabel} {...rest}>
      {children}
    </a>
  );
};

