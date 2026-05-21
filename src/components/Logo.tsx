import Image from 'next/image';

export default function Logo({
  className = '',
  variant = 'full',
}: {
  className?: string;
  variant?: 'full' | 'mark';
}) {
  if (variant === 'mark') {
    return (
      <Image
        src="/logo-mark.png"
        alt="Damage Expert"
        width={80}
        height={64}
        className={className}
        priority
      />
    );
  }
  return (
    <Image
      src="/logo-full.png"
      alt="Damage Expert — Procena štete na vozilima"
      width={411}
      height={91}
      className={`h-9 md:h-10 w-auto ${className}`}
      priority
    />
  );
}
