import Image from 'next/image';

export const Logo = (props: { className?: string; }) => (
  <Image
    src="/TMU logo.png"
    alt="Toronto Metropolitan University"
    width={32}
    height={32}
    className={`object-contain ${props.className || ''}`}
    priority
  />
);
