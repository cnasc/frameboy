import NextLink from 'next/link';

export function NavbarLink({
  href,
  children,
  target,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
}) {
  return (
    <NextLink
      href={href}
      className="font-robotoMono px-0 text-center text-base font-normal text-white no-underline"
      target={target}
    >
      {children}
    </NextLink>
  );
}
