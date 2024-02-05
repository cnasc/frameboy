import { ExternalLinkIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { DevToolsPageContent } from '../../src/components/devtools/DevToolsPageContent';
import { FRAME_SPEC_URL } from '../../src/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'frameboy | devtools',
  manifest: '/manifest.json',
};

export default function DevTools() {
  return (
    <main className="py-88 container flex flex-col gap-4 px-8">
      <h1 className="text-xl">Wherein we determine if your frame is valid</h1>
      <DevToolsPageContent />
      <Link href={FRAME_SPEC_URL}>
        <span className="flex items-center gap-1">
          Frame spec <ExternalLinkIcon />
        </span>
      </Link>
    </main>
  );
}
