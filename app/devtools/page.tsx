import { ExternalLinkIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { FrameInput } from '../../src/components/devtools/FrameInput';
import Header from '../../src/components/header/Header';
import { FRAME_SPEC_URL } from '../../src/constants';

export default function DevTools() {
  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col px-8 py-28">
        <FrameInput />
        <Link href={FRAME_SPEC_URL}>
          <span className="flex items-center gap-1">
            Frame spec <ExternalLinkIcon />
          </span>
        </Link>
      </main>
    </>
  );
}
