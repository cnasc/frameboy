'use client';
import { useCallback, useState } from 'react';
import { useAtom } from 'jotai';
import { ValidationError } from 'yup';
import { frameAtom, frameErrorsAtom } from '../../../store/frameAtom';
import { FrameVNext, vNextSchema } from '../../../utils/schemaValidation';

export function FrameInput() {
  const [url, setUrl] = useState('');
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
  const [_result, setResult] = useAtom(frameAtom);
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
  const [_errors, setErrors] = useAtom(frameErrorsAtom);
  const fetchFrame = useCallback(async () => {
    setResult(null);
    if (setErrors) {
      setErrors([]);
    }
    const response = await fetch('/api/getFrame', {
      body: JSON.stringify({ url }),
      method: 'POST',
      headers: {
        contentType: 'application/json',
      },
    });
    // TODO: handle exceptional cases
    const json = (await response.json()) as { html: string };
    const html = json.html;
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const result = parseHtml(html, setErrors);
    setResult(result);
  }, [setErrors, setResult, url]);
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-4">
      <input
        className="rounded-lg border border-white p-2"
        type="text"
        value={url}
        // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        className="rounded-lg border border-white"
        type="button"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={fetchFrame}
        disabled={url.length < 1}
      >
        Fetch
      </button>
    </div>
  );
}

function parseHtml(html: string, onError?: (errors: string[]) => void) {
  const document = new DOMParser().parseFromString(html, 'text/html');

  const ogTags = document.querySelectorAll(`[property^='og:']`);

  // According to spec, keys on the metatags should be on "property", but there are examples
  // in the wild where they're on "name". Process name tags first so that property tags take
  // precedence.
  const frameMetaTagsProperty = document.querySelectorAll(`[property^='fc:frame']`);
  const frameMetaTagsName = document.querySelectorAll(`[name^='fc:frame']`);

  const nameTags = [...frameMetaTagsName];
  const propertyTags = [...ogTags, ...frameMetaTagsProperty];
  const tags: Record<string, string> = {};

  function processTag(tag: Element, keyName: 'property' | 'name') {
    const key = tag.getAttribute(keyName);
    const value = tag.getAttribute('content');
    if (key && value) {
      tags[key] = value;
    }
  }
  nameTags.forEach((t) => processTag(t, 'name'));
  propertyTags.forEach((t) => processTag(t, 'property'));

  console.log({ tags, frameMetaTagsName, frameMetaTagsProperty });

  try {
    vNextSchema.validateSync(tags, { abortEarly: false });
    return tags as FrameVNext;
  } catch (e) {
    if ((e as Error).name === 'ValidationError' && onError) {
      const { errors } = e as ValidationError;
      onError(errors);
    }
    return null;
  }
}
