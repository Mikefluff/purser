import * as helpers from '@colony/purser-metamask/helpers';

jest.dontMock('@colony/purser-metamask/helpers');

/*
 * We just need this method mocked, but since it's declared in a module we
 * need to test we have do do this little go-around trick and use the default export
 *
 * See: https://github.com/facebook/jest/issues/936
 */
helpers.default.detect = jest.fn(() => true);

const { getInpageProvider } = helpers;

/*
 * Mock the global injected inpage provider
 */
const mockedProvider = 'Yes! This is the provider';
global.web3 = {
  currentProvider: mockedProvider,
};

describe('Metamask` Wallet Module', () => {
  describe('`getInpageProvider()` helper method', () => {
    afterEach(() => {
      helpers.default.detect.mockClear();
    });
    test('It returns the inpage provider object', async () => {
      const inpageProvider = getInpageProvider();
      expect(inpageProvider).toEqual(mockedProvider);
    });
  });
});
