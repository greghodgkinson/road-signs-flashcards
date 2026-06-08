import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const source = process.argv[2] ?? 'original/RTSigns_charts.pdf';
const output = process.argv[3] ?? 'src/data/rtsigns-page1-catalog.json';
const tempDir = process.env.TMPDIR ?? '/tmp';
const legendText = `${tempDir}/rtsigns-page5-raw.txt`;
const pageBbox = `${tempDir}/rtsigns-page1-bbox.html`;

execFileSync('pdftotext', ['-f', '5', '-l', '5', '-raw', source, legendText]);
execFileSync('pdftotext', ['-f', '1', '-l', '1', '-bbox-layout', source, pageBbox]);
const lines = readFileSync(legendText, 'utf8').split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

const entries = {};
for (const line of lines) {
  const match = line.match(/^((?:\(R\)|R)\S+)\s+(.+?)(?:\s+sign)?$/);
  if (match) entries[match[1]] = match[2].replace(/\s+/g, ' ');
}

const grouped = {
  'R4.1': 'One-way roadway left',
  'R4.2': 'One-way roadway right',
  'R4.3': 'One-way roadway straight ahead',
  R112: 'Pedal cycles and pedestrians only',
  R113: 'Pedal cycles and pedestrians only',
  R114: 'Pedal cycles and pedestrians only',
  R115: 'Pedal cycles and pedestrians only',
  S1: 'Standard traffic signal',
  'S1(L)': 'Standard traffic signal with left signal',
  S1B: 'Bus traffic signal',
  S1T: 'Tram traffic signal',
  S1A: 'Arrow traffic signal',
  S1AR: 'Right-arrow traffic signal',
  S1AL: 'Left-arrow traffic signal',
  S2: 'Traffic signal',
  S3: 'Traffic signal',
  S4: 'Traffic signal',
  S5: 'Traffic signal with arrow',
  S6: 'Traffic signal with arrow',
  S7: 'Traffic signal with arrow',
  S8: 'Traffic signal with arrows',
  S8B: 'Bus traffic signal with arrows',
  S8T: 'Tram traffic signal with arrows',
  S9: 'Traffic signal with arrows',
  S9B: 'Bus traffic signal with arrows',
  S9T: 'Tram traffic signal with arrows',
  S10R: 'Right-arrow traffic signal',
  S10L: 'Left-arrow traffic signal',
  S11: 'Pedestrian traffic signal',
  S12: 'Traffic signal',
  S13: 'Traffic signal with right arrow',
  S14: 'Traffic signal with left arrow',
  S15: 'Traffic signal with multiple arrows',
  S16: 'Open lane signal',
  S17: 'Closed lane signal',
  S18: 'Leave lane to the left signal',
  S19: 'Leave lane to the right signal',
  S20: 'Pedal cycle traffic signal',
  'SS1(a)': 'Stop traffic approaching from the front',
  'SS1(b)': 'Stop traffic approaching from the rear',
  'SS1(c)': 'Stop traffic approaching from the front and rear',
  'SS1(d)': 'Traffic may proceed as directed by the officer',
  'SS1(e)': 'Traffic may proceed as directed by the officer',
  'SS2(a)': 'Flag signal to warn traffic',
  'SS2(b)': 'Flag signal to stop',
  'SS2(c)': 'Flag signal to proceed',
  'SS2(d)': 'Flag signal to slow down',
  'SS2(e)': 'Warning of slow-moving vehicles',
  'SS3(a)': 'Flashing warning signal with speed limit',
  'SS3(b)': 'Flashing warning signal with crossroads warning',
  'SS3(c)': 'Flashing warning signal with stop-ahead warning',
  FRD: 'Red flashing signal',
  'FRD-R1': 'Railway crossing red flashing signal',
  '(R)600': 'De-restriction',
  '(R)132-600': 'End of pay toll restriction',
  '(R)133-600': 'End of headlamps-on restriction',
  '(R)202-600': 'End of mass restriction',
  '(R)304-600': 'End of pedal cycle lane reservation',
  '(R)401-600': 'End of dual-carriageway freeway',
  '(R)402-600': 'End of single-carriageway freeway',
  '(R)403-600': 'End of woonerf',
};
Object.assign(entries, grouped);

const bbox = readFileSync(pageBbox, 'utf8');
const tokens = [...bbox.matchAll(/<word[^>]*>([^<]+)<\/word>/g)].map((match) => match[1]);
const codePattern = /^(?:R\d+(?:\.\d+)?(?:-P)?|\(R\)\d+(?:-\d+)?|S(?:\d+(?:\(L\)|[A-Z]+)?|S[123])|FRD(?:-R1)?)$/;
const codes = [...new Set(tokens.filter((token) => codePattern.test(token)))];
codes.push('R4.1');
const ss2Index = codes.indexOf('SS2');
if (ss2Index !== -1) codes.splice(ss2Index, 1);
codes.push('SS2(a)', 'SS2(b)', 'SS2(c)', 'SS2(d)', 'SS2(e)');
const ss1Index = codes.indexOf('SS1');
if (ss1Index !== -1) codes.splice(ss1Index, 1);
codes.push('SS1(a)', 'SS1(b)', 'SS1(c)', 'SS1(d)', 'SS1(e)');
const ss3Index = codes.indexOf('SS3');
if (ss3Index !== -1) codes.splice(ss3Index, 1);
codes.push('SS3(a)', 'SS3(b)', 'SS3(c)');
codes.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const catalog = codes.map((code) => ({
  code,
  name: entries[code] ?? `${code} road traffic sign`,
}));

writeFileSync(output, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Generated ${catalog.length} page-1 legend entries in ${output}`);
