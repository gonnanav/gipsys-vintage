import Image from 'next/image';

export function HeroImage() {
  return (
    <Image
      src="/images/hero.webp"
      alt="תמונה ראשית של ג'יפסיז וינטג'"
      width={437}
      height={663}
      priority
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
}
