import { ExternalLinkIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { FrameInput } from '../../src/components/devtools/FrameInput';
import Header from '../../src/components/header/Header';
import { FRAME_SPEC_URL } from '../../src/constants';

export default function DevTools() {
  return (
    <>
      <Header />
      <main className="py-88 container flex flex-col gap-4 px-8">
        <h1 className="text-xl">Wherein we determine if your frame is valid</h1>
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
