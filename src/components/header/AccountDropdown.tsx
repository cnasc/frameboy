import { useCallback } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ExitIcon, IdCardIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx';
import { useAccount, useDisconnect } from 'wagmi';
import { useSignInWithNeynar } from '../../hooks/useSignInWithNeynar';

export function AccountDropdown() {
  useSignInWithNeynar();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="flex h-8 w-8 items-center justify-center">
          <button type="button" aria-label="Disconnect">
            <div className="flex size-8 items-center justify-center rounded-full bg-purple-700">
              <IdCardIcon fill="black" />
            </div>
          </button>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={40}
          className={clsx(
            'h-42 inline-flex w-60 flex-col items-start justify-start gap-4',
            'rounded-lg bg-neutral-900 bg-opacity-90 p-6 shadow backdrop-blur-2xl',
          )}
        >
          <div className="inline-flex items-center justify-start gap-2">
            <div className="inline-flex flex-col items-start justify-center gap-1">
              <div className="inline-flex items-center justify-start gap-1">
                <div className="font-inter w-32 overflow-hidden text-ellipsis text-base font-medium text-white">
                  {address}
                </div>
              </div>
            </div>
          </div>
          <div className="h-px self-stretch bg-zinc-400 bg-opacity-20" />
          <button
            type="button"
            aria-label="Disconnect"
            className="inline-flex items-center justify-between self-stretch"
            onClick={handleDisconnectWallet}
          >
            <span className="font-inter w-32 text-left text-base font-medium text-white">
              Log out
            </span>
            <ExitIcon className="relative h-4 w-4" />
          </button>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
