'use client';
import { useCallback } from 'react';

export function FrameInput() {
  const fetchFrame = useCallback(async () => {
    const response = await fetch('/api/getFrame', {
      body: JSON.stringify({ url: 'http://localhost:3000' }),
      method: 'POST',
      headers: {
        contentType: 'application/json',
      },
    });
    const json = await response.json();
    const html = json.html;
    parseHtml(html);
  }, []);
  return (
    <button type="button" onClick={fetchFrame}>
      Fetch
    </button>
  );
}

function parseHtml(html: string) {
  const document = new DOMParser().parseFromString(html, 'text/html');

  const ogTags = document.querySelectorAll(`[property^='og:']`);

  // According to spec, keys on the metatags should be on "property", but there are examples
  // in the wild where they're on "name".
  const frameMetaTagsProperty = document.querySelectorAll(`[property^='fc:frame']`);
  const frameMetaTagsName = document.querySelectorAll(`[name^='fc:frame']`);

  console.log({ frameMetaTagsProperty, frameMetaTagsName, ogTags });
}
