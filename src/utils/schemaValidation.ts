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
          'Button index values must be in sequence, starting at 1',
          (value, ctx) => {
            if (value) {
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
        .matches(/(post$)|post_redirect$/, 'button action must be "post" or "post_url"'),
    }),
    {},
  ),
  'fc:frame:post_url': yup
    .string()
    .optional()
    .test('url-has-valid-size', 'post_url has maximum size of 256 bytes', (value) => {
      return new Blob([value]).size <= 256;
    }),
  'fc:frame:input:text': yup
    .string()
    .optional()
    .test('url-has-valid-size', 'input:text has maximum size of 32 bytes', (value) => {
      return new Blob([value]).size <= 32;
    }),
});
