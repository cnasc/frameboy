'use client';

import { useAtom } from 'jotai';
import { frameAtom, frameErrorsAtom } from '../../../store/frameAtom';
import { Frame } from '../Frame';
import { FrameErrors } from '../FrameErrors';
import { FrameInput } from '../FrameInput';
import { ParsedFrameDefinition } from '../ParsedFrameDefinition';

export function DevToolsPageContent() {
  const [frameDefinition] = useAtom(frameAtom);
  const [errors] = useAtom(frameErrorsAtom);
  return (
    <>
      <FrameInput />
      {!!frameDefinition && <Frame frameDefinition={frameDefinition} />}
      {!!frameDefinition && <ParsedFrameDefinition frameDefinition={frameDefinition} />}
      <FrameErrors errors={errors} />
    </>
  );
}
