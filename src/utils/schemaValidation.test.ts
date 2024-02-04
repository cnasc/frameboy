import { vNextSchema } from './schemaValidation';

const baseGoodDefinition = {
  'fc:frame': 'vNext',
  'fc:frame:image': 'https://images.party/this-is-a-test.apng',
  'og:image': 'https://images.party/this-is-a-test.apng',
};

describe('schema validation', () => {
  describe('vNext', () => {
    it('fails on empty object', () => {
      expect(vNextSchema.isValidSync({})).toBe(false);
    });
    it('succeeds on minimum viable schema', () => {
      expect(vNextSchema.isValidSync(baseGoodDefinition)).toBe(true);
    });
    it('fails on minimum viable schema with incorrect version', () => {
      expect(
        vNextSchema.isValidSync({
          ...baseGoodDefinition,
          'fc:frame': 'vParty',
        }),
      ).toBe(false);
    });

    describe('buttons', () => {
      it('fails on otherwise valid schema where buttons are not sequenced correctly', () => {
        // 1 is undefined
        expect(
          vNextSchema.isValidSync({
            ...baseGoodDefinition,
            'fc:frame:button:2': 'henlo',
          }),
        ).toBe(false);

        // 1 is defined, 2 is undefined
        expect(
          vNextSchema.isValidSync({
            ...baseGoodDefinition,
            'fc:frame:button:1': 'henlo',
            'fc:frame:button:3': 'henlo',
          }),
        ).toBe(false);

        // 1 and 2 are defined, 3 is undefined
        expect(
          vNextSchema.isValidSync({
            ...baseGoodDefinition,
            'fc:frame:button:1': 'henlo',
            'fc:frame:button:2': 'henlo',
            'fc:frame:button:4': 'henlo',
          }),
        ).toBe(false);
      });

      it('succeeds when buttons are sequenced correctly', () => {
        expect(
          vNextSchema.isValidSync({
            ...baseGoodDefinition,
            'fc:frame:button:1': 'henlo',
            'fc:frame:button:2': 'henlo',
            'fc:frame:button:3': 'henlo',
            'fc:frame:button:4': 'henlo',
          }),
        ).toBe(true);
      });

      it('fails when button action is not "post" or "post_url"', () => {
        expect(
          vNextSchema.isValidSync({
            ...baseGoodDefinition,
            'fc:frame:button:1': 'henlo',
            'fc:frame:button:1:action': 'post',
            'fc:frame:button:2': 'henlo',
            'fc:frame:button:2:action': 'post_url',
            'fc:frame:button:3': 'henlo',
            'fc:frame:button:3:action': 'henlo',
            'fc:frame:button:4': 'henlo',
          }),
        ).toBe(false);
      });

      it('succeeds when button action is "post" or "post_url"', () => {
        expect(
          vNextSchema.isValidSync({
            ...baseGoodDefinition,
            'fc:frame:button:1': 'henlo',
            'fc:frame:button:1:action': 'post',
            'fc:frame:button:2': 'henlo',
            'fc:frame:button:2:action': 'post_url',
            'fc:frame:button:3': 'henlo',
            'fc:frame:button:4': 'henlo',
          }),
        ).toBe(false);
      });
    });

    describe('post_url', () => {
      it('succeeds when post_url is less than 256 bytes', () => {
        expect(
          vNextSchema.isValidSync({
            ...baseGoodDefinition,
            'fc:frame:post_url': 'gopher://neato.test',
          }),
        ).toBe(true);
      });
      it('succeeds when post_url is exactly 256 bytes', () => {
        expect(
          vNextSchema.isValidSync({
            ...baseGoodDefinition,
            'fc:frame:post_url': new Array(256).fill('a').join(''),
          }),
        ).toBe(true);
      });
      it('fails when post_url exceeds 256 bytes', () => {
        expect(
          vNextSchema.isValidSync({
            ...baseGoodDefinition,
            'fc:frame:post_url': new Array(257).fill('a').join(''),
          }),
        ).toBe(false);
      });
    });

    describe('input:text', () => {
      it('succeeds when input:text is less than 32 bytes', () => {
        expect(
          vNextSchema.isValidSync({
            ...baseGoodDefinition,
            'fc:frame:input:text': 'Enter a message',
          }),
        ).toBe(true);
      });
      it('succeeds when input:text is exactly 32 bytes', () => {
        expect(
          vNextSchema.isValidSync({
            ...baseGoodDefinition,
            'fc:frame:input:text': new Array(32).fill('a').join(''),
          }),
        ).toBe(true);
      });
      it('fails when input:text exceeds 32 bytes', () => {
        expect(
          vNextSchema.isValidSync({
            ...baseGoodDefinition,
            'fc:frame:input:text': new Array(33).fill('a').join(''),
          }),
        ).toBe(false);
      });
    });
  });
});
