'use client';

import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { Frame } from '../../src/components/devtools/Frame';
import { FrameErrors } from '../../src/components/devtools/FrameErrors';
import { FrameInput } from '../../src/components/devtools/FrameInput';
import { ParsedFrameDefinition } from '../../src/components/devtools/ParsedFrameDefinition';
import { FRAME_SPEC_URL } from '../../src/constants';
import { frameAtom, frameErrorsAtom } from '../../src/store/frameAtom';

export default function DevTools() {
  const [frameDefinition] = useAtom(frameAtom);
  const [errors] = useAtom(frameErrorsAtom);
  return (
    <main className="py-88 container flex flex-col gap-4 px-8">
      <h1 className="text-xl">Wherein we determine if your frame is valid</h1>
      <FrameInput />
      {!!frameDefinition && <Frame frameDefinition={frameDefinition} />}
      {!!frameDefinition && <ParsedFrameDefinition frameDefinition={frameDefinition} />}
      <FrameErrors errors={errors} />
      <Link href={FRAME_SPEC_URL}>
        <span className="flex items-center gap-1">
          Frame spec <ExternalLinkIcon />
        </span>
      </Link>
    </main>
  );
}
