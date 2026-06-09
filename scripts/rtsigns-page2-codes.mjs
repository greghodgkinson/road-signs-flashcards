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
  'RM1', 'RM2', 'RM3', 'RM4.1', 'RM4.2', ...range('RM', 5, 11),
  'RM12(a)', 'RM12(b)', 'RM13(a)', 'RM13(b)', 'RM14', 'RM15', 'RM16',
  'RM17(a)', 'RM17(b)', 'RM17(c)', 'RM17(d)', 'RM17(e)',
  ...range('WM', 1, 8), 'WM9.1', 'WM9.2', 'WM10', 'WM11(a)', 'WM11(b)',
  'GM1', 'GM2', 'GM3', 'GM4', 'GM5', 'GM6(a)', 'GM6(b)', 'GM6(c)', 'GM6(d)', 'GM7', 'GM8',
];
