const range = (prefix, start, end, omitted = []) =>
  Array.from({ length: end - start + 1 }, (_, index) => `${prefix}${start + index}`)
    .filter((code) => !omitted.includes(code));

export const page2Codes = [
  ...range('W', 101, 119),
  ...range('W', 201, 218),
  'W301', 'W302', 'W303', ...range('W', 306, 335), 'W339', 'W346', ...range('W', 348, 363, ['W353']),
  ...range('W', 401, 411), 'W413', 'W414', 'W415',
  ...range('IN', 1, 7), 'IN10', 'IN11.1', 'IN11.2', 'IN11.3', 'IN11.4', 'IN11.568', 'IN11.577',
  'IN12', 'IN14', 'IN15', 'IN19',
  ...range('RTM', 1, 4),
  'RM1', 'RM2', 'RM3', 'RM4.1', 'RM4.2', ...range('RM', 5, 17),
  ...range('WM', 1, 8), 'WM9.1', 'WM9.2', 'WM10', 'WM11',
  ...range('GM', 1, 8),
];
