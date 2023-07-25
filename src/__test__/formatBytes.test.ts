import { formatBytes } from '@/packages/format';
describe('formatBytes', () => {
  // 1G=1024M=1048576KB
  const bytes = [
    {
      value: 123456789012345,
      expect: '112.28 TB'
    },
    {
      value: 1048576,
      expect: '1 MB'
    }
  ];
  bytes.forEach(item => {
    it('should ', () => {
      expect(formatBytes(item.value)).toBe(item.expect);
    });
  });
});
