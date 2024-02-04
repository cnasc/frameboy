import { FrameVNext } from '../../../utils/schemaValidation';

type ParsedFrameDefinitionProps = {
  frameDefinition: FrameVNext;
};

export function ParsedFrameDefinition({ frameDefinition }: ParsedFrameDefinitionProps) {
  return (
    <div>
      <p>LGTM ✅</p>
      <pre>{JSON.stringify(frameDefinition, null, 2)}</pre>
    </div>
  );
}
