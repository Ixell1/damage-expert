import Image from 'next/image';

/**
 * Logo komponenta sa dve varijante za light i dark mode.
 * - logo-full.png i logo-mark.png imaju beli "EXPERT" tekst (za dark mode).
 * - logo-full-light.png i logo-mark-light.png imaju crn tekst (za light mode).
 * - Narandzasti monogram je isti u obe verzije.
 */
export default function Logo({
  className = '',
  variant = 'full',
}: {
  className?: string;
  variant?: 'full' | 'mark';
}) {
  const lightSrc = variant === 'mark' ? '/logo-mark-light.png' : '/logo-full-light.png';
  const darkSrc = variant === 'mark' ? '/logo-mark.png' : '/logo-full.png';
  const dims = variant === 'mark' ? { width: 80, height: 64 } : { width: 411, height: 91 };
  const sizeClass = variant === 'mark' ? '' : 'h-9 md:h-10 w-auto';

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Light mode - default visible */}
      <Image
        src={lightSrc}
        alt="Damage Expert"
        width={dims.width}
        height={dims.height}
        className={`${sizeClass} block dark:hidden`}
        priority
      />
      {/* Dark mode - shown when html has .dark class */}
      <Image
        src={darkSrc}
        alt="Damage Expert"
        width={dims.width}
        height={dims.height}
        className={`${sizeClass} hidden dark:block`}
        priority
      />
    </span>
  );
}
