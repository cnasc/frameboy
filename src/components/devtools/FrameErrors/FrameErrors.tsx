type FrameErrorsProps = {
  errors: string[];
};

export function FrameErrors({ errors }: FrameErrorsProps) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <ol>
      {errors.map((e) => (
        <li key={e}>❌ {e}</li>
      ))}
    </ol>
  );
}
