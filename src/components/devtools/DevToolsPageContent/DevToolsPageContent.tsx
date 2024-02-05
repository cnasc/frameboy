'use client';

import { useAtom } from 'jotai';
import { useSignInWithNeynar } from '../../../hooks/useSignInWithNeynar';
import { frameAtom, frameErrorsAtom, neynarSignerAtom } from '../../../store/atoms';
import { Frame } from '../Frame';
import { FrameErrors } from '../FrameErrors';
import { FrameInput } from '../FrameInput';
import { ParsedFrameDefinition } from '../ParsedFrameDefinition';

export function DevToolsPageContent() {
  useSignInWithNeynar();
  const [frameDefinition] = useAtom(frameAtom);
  const [errors] = useAtom(frameErrorsAtom);
  const [signerUuid] = useAtom(neynarSignerAtom);
  return (
    <>
      <FrameInput />
      {!!frameDefinition && <Frame frameDefinition={frameDefinition} signerUuid={signerUuid} />}
      {!!frameDefinition && <ParsedFrameDefinition frameDefinition={frameDefinition} />}
      <FrameErrors errors={errors} />
      <div className="flex items-center">
        <div
          className="neynar_signin"
          data-client_id={process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID}
          data-success-callback="onSignInSuccess"
          data-theme="dark"
        />
        {!!signerUuid && <p>Connected through Neynar</p>}
        {!signerUuid && (
          <p>Not connected through Neynar, cannot make authenticated frame actions</p>
        )}
      </div>
    </>
  );
}
