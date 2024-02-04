import Link from 'next/link';
import Header from '../../src/components/header/Header';
import { FRAME_SPEC_URL } from '../../src/constants';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
export default function DevTools() {
  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col px-8 py-28">
        <Link href={FRAME_SPEC_URL}>
          <span className="flex items-center gap-1">
            Frame spec <ExternalLinkIcon />
          </span>
        </Link>
      </main>
    </>
  );
}
