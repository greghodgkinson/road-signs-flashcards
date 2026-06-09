import { writeFileSync } from 'node:fs';
import { page2Codes } from './rtsigns-page2-codes.mjs';

const output = process.argv[2] ?? 'src/data/rtsigns-page2-catalog.json';
const entries = {};

const assign = (codes, name) => {
  for (const code of codes) entries[code] = name;
};
const range = (prefix, start, end) =>
  Array.from({ length: end - start + 1 }, (_, index) => `${prefix}${start + index}`);

assign(['W101'], 'Crossroad sign');
assign(['W102'], 'Priority crossroad sign');
assign(['W103'], 'Secondary crossroad sign');
assign(range('W', 104, 106), 'T- & skew T-junction sign');
assign(range('W', 107, 108), 'Side road junction sign');
assign(range('W', 109, 110), 'Staggered junction sign');
assign(range('W', 111, 114), 'Sharp junction sign');
assign(['W115'], 'Y-junction sign');
assign(range('W', 116, 117), 'End of dual roadway sign');
assign(range('W', 118, 119), 'Beginning of dual roadway sign');
assign(['W201'], 'Traffic circle sign');
assign(range('W', 202, 203), 'Gentle curve sign');
assign(range('W', 204, 205), 'Sharp curve sign');
assign(range('W', 206, 207), 'Hairpin bend sign');
assign(range('W', 208, 209), 'Winding road sign');
assign(range('W', 210, 211), 'Combined curves sign');
assign(['W212'], 'Two-way traffic sign');
assign(['W213'], 'Two-way traffic crossroad sign');
assign(range('W', 214, 215), 'Lane ends sign');
assign(range('W', 216, 218), 'Concealed driveway sign');

const symbolic = {
  W301: 'Traffic signal ahead sign',
  W302: 'Traffic control STOP ahead sign',
  W303: 'Traffic control YIELD ahead sign',
  W306: 'Pedestrian crossing sign',
  W307: 'Pedestrians sign',
  W308: 'Children sign',
  W309: 'Cyclists sign',
  W313: 'Wild animals ahead sign',
  W314: 'Gate sign',
  W318: 'Railway crossing sign',
  W319: 'Tunnel sign',
  W320: 'Height restriction sign',
  W321: 'Length restricted sign',
  W324: 'Slow moving heavy vehicles sign',
  W325: 'Gravel road begins sign',
  W326: 'Narrow bridge sign',
  W327: 'One vehicle width structure sign',
  W328: 'Road narrows from both sides sign',
  W331: 'Uneven roadway sign',
  W332: 'Speed humps sign',
  W333: 'Slippery road sign',
  W339: 'General warning sign',
  W346: 'Emergency flashing light sign',
  W348: 'Jetty edge or river-bank sign',
  W349: 'Crosswinds sign',
  W350: 'Drift sign',
  W351: 'Low flying aircraft sign',
  W352: 'Agricultural vehicle sign',
  W354: 'Reduced visibility sign',
  W355: 'Congestion sign',
  W356: 'Horses & riders sign',
  W357: 'Elephant sign',
  W358: 'Warthog sign',
  W359: 'Hippo sign',
  W360: 'Width restricted sign',
  W361: 'Electrical shock sign',
  W362: 'Tram sign',
  W363: 'Gravel road ends sign',
};
Object.assign(entries, symbolic);
assign(range('W', 310, 312), 'Farm animals sign');
assign(range('W', 315, 317), 'Motor gate sign');
assign(range('W', 322, 323), 'Steep descent & ascent sign');
assign(range('W', 329, 330), 'Road narrows from one side only sign');
assign(range('W', 334, 335), 'Falling rocks sign');

assign(range('W', 401, 402), 'Danger plate sign');
assign(range('W', 403, 404), 'Railway crossing sign');
assign(range('W', 405, 408), 'Sharp curve chevron sign');
Object.assign(entries, {
  W409: 'T-junction chevron sign',
  W410: 'Dead end or road closed chevron sign',
  W411: 'Boom barricade sign',
  W413: 'Gore plate sign',
  W414: 'Gore chevron sign',
  W415: 'Overhead danger plate sign',
});

assign(range('IN', 1, 3), 'Countdown sign');
assign(range('IN', 4, 6), 'Cul-de-sac sign');
Object.assign(entries, {
  IN7: 'Right of way sign',
  IN10: 'Park & ride sign',
  IN12: 'Information centre sign',
  IN14: 'Co-ordinated traffic signals sign',
  IN15: 'Multi-phase traffic signals sign',
  IN19: 'Modal transfer sign',
});
assign(['IN11.1', 'IN11.2', 'IN11.3', 'IN11.4', 'IN11.568', 'IN11.577'], 'Supplementary plate sign');

const markings = {
  RTM1: 'Stop line marking',
  RTM2: 'Yield line marking',
  RTM3: 'Pedestrian crossing lines marking',
  RTM4: 'Block pedestrian crossing marking',
  RM1: 'No overtaking marking',
  RM2: 'No crossing marking',
  RM3: 'Channelizing line marking',
  'RM4.1': 'Left edge line marking',
  'RM4.2': 'Right edge line marking',
  RM5: 'Painted island marking',
  RM6: 'Parking bay marking',
  RM7: 'Exclusive parking bay marking',
  RM8: 'Mandatory direction arrow marking',
  RM9: 'Exclusive lane line marking',
  RM10: 'Box junction marking',
  RM11: 'Zig-zag zone marking',
  'RM12(a)': 'No stopping line marking',
  'RM12(b)': 'No stopping line marking',
  'RM13(a)': 'No parking line marking',
  'RM13(b)': 'No parking line marking',
  RM14: 'No motor cycles marking',
  RM15: 'Mini-circle marking',
  RM16: 'Disabled persons parking marking',
  'RM17(a)': 'Exclusive use lane symbol marking',
  'RM17(b)': 'Exclusive use lane symbol marking',
  'RM17(c)': 'Exclusive use lane symbol marking',
  'RM17(d)': 'Exclusive use lane symbol marking',
  'RM17(e)': 'Exclusive use lane symbol marking',
  WM1: 'Railway crossing marking',
  WM2: 'Continuity line marking',
  WM3: 'Dividing line marking',
  WM4: 'Reversible lane line marking',
  WM5: 'Yield sign ahead marking',
  WM6: 'Lane reduction arrow marking',
  WM7: 'Mandatory direction arrow ahead marking',
  WM8: 'No overtaking or no crossing line ahead marking',
  'WM9.1': 'Arrestor bed ahead marking',
  'WM9.2': 'Escape road ahead marking',
  WM10: 'Speed hump marking',
  'WM11(a)': 'End of exclusive use lane arrows marking',
  'WM11(b)': 'End of exclusive use lane arrows marking',
  GM1: 'Lane line marking',
  GM2: 'Guide line marking',
  GM3: 'Furcation arrow marking',
  GM4: 'Information arrow marking',
  GM5: 'Bicycle crossing guidelines marking',
  'GM6(a)': 'Symbol road marking',
  'GM6(b)': 'Symbol road marking',
  'GM6(c)': 'Symbol road marking',
  'GM6(d)': 'Symbol road marking',
  GM7: 'Word marking',
  GM8: 'Kerbing marking',
};
Object.assign(entries, markings);

const missing = page2Codes.filter((code) => !entries[code]);
if (missing.length > 0) throw new Error(`Missing page-5 names for: ${missing.join(', ')}`);

const catalog = page2Codes.map((code) => ({
  code,
  name: entries[code],
  description: entries[code],
}));

writeFileSync(output, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Generated ${catalog.length} page-2 legend entries in ${output}`);
