import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { neynarSignerAtom } from '../store/atoms';

type OnSignInSuccessData = { signer_uuid: string; fid: string };
type WindowWithOnSignInSuccess = Window & { onSignInSuccess?: (data: OnSignInSuccessData) => void };

export function useSignInWithNeynar() {
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
  const [_signer, setSigner] = useAtom(neynarSignerAtom);
  useEffect(() => {
    function onSignInSuccess({ signer_uuid }: OnSignInSuccessData) {
      setSigner(signer_uuid);
    }

    (window as WindowWithOnSignInSuccess).onSignInSuccess = onSignInSuccess;

    return () => {
      delete (window as WindowWithOnSignInSuccess).onSignInSuccess;
    };
  }, [setSigner]);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://neynarxyz.github.io/siwn/raw/1.0.0/index.js';

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
}
