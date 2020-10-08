import { renderHook } from '@testing-library/react-hooks';
import getInitials from '../getInitials';
import { image } from './mocks/avatar';

describe('Avatar - Hook', () => {
  describe.skip('useAvatar', () => {
    it('returns proper image blob', () => {
      jest.resetModules();
      jest.doMock('../compute.ts', () => ({
        default: (): Promise<string> => Promise.resolve(image)
      }));
      const useAvatar = require('../').default;

      const testingValue = 'Main';

      const { result } = renderHook(() => useAvatar({ text: testingValue }));
      expect(result.current.imageBlob).toEqual(image);
    });
  });

  describe('getInitials', () => {
    it('1 word', () => {
      const testingValue = 'Test';
      expect(getInitials(testingValue)).toEqual(['T']);
    });
    it('separate words', () => {
      const testingValue = 'This man is the best';
      expect(getInitials(testingValue)).toEqual(['T', 'M', 'I', 'T', 'B']);
    });
    it('_', () => {
      const testingValue = 'This_man_is_the_best';
      expect(getInitials(testingValue)).toEqual(['T', 'M', 'I', 'T', 'B']);
    });
    it('-', () => {
      const testingValue = 'This-man-is-the-best';
      expect(getInitials(testingValue)).toEqual(['T', 'M', 'I', 'T', 'B']);
    });
  });
});
