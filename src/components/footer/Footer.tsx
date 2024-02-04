'use client';

import { GitHubLogoIcon } from '@radix-ui/react-icons';
import NextLink from 'next/link';
import { APP_NAME, GITHUB_REPO } from '../../constants';
import { NavbarLink } from '../header/Navbar';

export default function Footer() {
  return (
    <footer className="flex flex-1 flex-col justify-end">
      <div className="flex min-h-96 flex-col justify-between gap-16 bg-boat-footer-dark-gray py-12">
        <div className="container mx-auto flex w-full flex-col justify-between gap-16 px-8 md:flex-row">
          <div className="flex flex-col">
            <div className="flex h-8 items-center justify-start gap-4">
              <NextLink
                href="/"
                passHref
                className="font-robotoMono text-center text-xl font-medium text-white"
              >
                {APP_NAME}
              </NextLink>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center">
              <p className="text-base font-normal leading-7 text-boat-footer-light-gray">
                This project is licensed under the MIT License - see the{' '}
                <NextLink
                  href={GITHUB_REPO + '/blob/master/LICENSE.md'}
                  className="underline"
                  target="_blank"
                >
                  LICENSE.md
                </NextLink>{' '}
                file for details
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto flex w-full gap-8 px-8 text-base font-normal leading-7">
          <NavbarLink href={GITHUB_REPO} target="_blank">
            <GitHubLogoIcon width="24" height="24" />
          </NavbarLink>
        </div>
      </div>
    </footer>
  );
}
