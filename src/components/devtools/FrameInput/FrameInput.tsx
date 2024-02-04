'use client';
import { useCallback, useState } from 'react';
import { ValidationError } from 'yup';
import { FrameVNext, vNextSchema } from '../../../utils/schemaValidation';

export function FrameInput() {
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<FrameVNext | null>(null);
  const fetchFrame = useCallback(async () => {
    setResult(null);
    setErrors([]);
    const response = await fetch('/api/getFrame', {
      body: JSON.stringify({ url }),
      method: 'POST',
      headers: {
        contentType: 'application/json',
      },
    });
    const json = await response.json();
    const html = json.html;
    const result = parseHtml(html, setErrors);
    setResult(result);
  }, [url]);
  return (
    <>
      <div className="grid grid-cols-[2fr_1fr] gap-4">
        <input
          className="rounded-lg border border-white p-2"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="rounded-lg border border-white"
          type="button"
          onClick={fetchFrame}
          disabled={url.length < 1}
        >
          Fetch
        </button>
      </div>
      <div>
        {result && (
          <>
            <p>LGTM ✅</p>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </>
        )}
        {errors.length > 0 && (
          <ol>
            {errors.map((e) => (
              <li key={e}>❌ {e}</li>
            ))}
          </ol>
        )}
      </div>
    </>
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
