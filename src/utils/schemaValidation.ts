import * as yup from 'yup';

export const vNextSchema = yup.object({
  'fc:frame': yup.string().required().matches(/vNext/, '"fc:frame" must be "vNext"'),
  'fc:frame:image': yup.string().defined(),
  'og:image': yup.string().defined(),
  'fc:frame:button:1': yup.string().optional(),
  ...[2, 3, 4].reduce(
    (acc, index) => ({
      ...acc,
      [`fc:frame:button:${index}`]: yup
        .string()
        .optional()
        .test(
          `has-button-${index - 1}`,
          `Button index values must be in sequence, starting at 1. Failed on index: ${2}`,
          (value, ctx) => {
            if (value) {
              // we only care whether or not `prevButton` is undefined
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              const prevButton = ctx.parent[`fc:frame:button:${index - 1}`];
              return !!prevButton;
            }
            return true;
          },
        ),
    }),
    {},
  ),
  ...[1, 2, 3, 4].reduce(
    (acc, index) => ({
      ...acc,
      [`fc:frame:button:${index}:action`]: yup
        .string()
        .optional()
        .matches(
          /(post$)|post_redirect$/,
          `button action must be "post" or "post_url". Failed on index: ${index}`,
        ),
    }),
    {},
  ),
  'fc:frame:post_url': yup
    .string()
    .optional()
    .test('url-has-valid-size', 'post_url has maximum size of 256 bytes', (value) => {
      // test only fires when `value` is defined
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return new Blob([value!]).size <= 256;
    }),
  'fc:frame:input:text': yup
    .string()
    .optional()
    .test('url-has-valid-size', 'input:text has maximum size of 32 bytes', (value) => {
      // test only fires when `value` is defined
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return new Blob([value!]).size <= 32;
    }),
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/consistent-type-definitions
export interface FrameVNext extends yup.InferType<typeof vNextSchema> {}
