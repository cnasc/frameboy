import NextLink from 'next/link';
import { APP_NAME } from '../../constants';
import AccountConnect from './AccountConnect';

function Menu() {
  return (
    <>
      <div className="flex h-8 items-center justify-start gap-4">
        <NextLink href="/" passHref className="relative h-8 w-8">
          <div className="absolute size-8 rounded-full bg-white" />
        </NextLink>
        <NextLink
          href="/"
          passHref
          className="font-robotoMono text-center text-xl font-medium text-white no-underline"
        >
          {APP_NAME}
        </NextLink>
      </div>

      <div className="flex items-center justify-start gap-8">
        <AccountConnect />
      </div>
    </>
  );
}

export default Menu;
