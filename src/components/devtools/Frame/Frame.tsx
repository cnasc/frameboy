import { useMemo } from 'react';
import { FrameVNext } from '../../../utils/schemaValidation';

type FrameProps = {
  frameDefinition: FrameVNext;
};

export function Frame({ frameDefinition }: FrameProps) {
  // TODO: enforce sort
  // TODO: instead of using raw definition object, parse into something nicer (maybe use Ohm)
  const buttons = useMemo(
    () =>
      Object.entries(frameDefinition).filter(([key]) => key.match(/fc:frame:button:[1-4]$/)) as [
        string,
        string,
      ][],
    [frameDefinition],
  );
  return (
    <div className="max-w-[600px] self-center ">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="rounded-t-xl" src={frameDefinition['fc:frame:image']} alt="" />
      <div className="flex flex-wrap gap-2 rounded-b-xl border-b border-l border-r border-slate-600 px-4 py-2">
        {buttons.map(([key, name]) => (
          <button className="w-[45%] grow rounded-lg bg-pink-950 p-2" type="button" key={key}>
            <span>{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
