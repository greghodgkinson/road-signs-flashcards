import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const source = process.argv[2] ?? 'original/RTSigns_charts.pdf';
const output = process.argv[3] ?? 'public/signs/rtsigns/page-1';
const tempBase = join(process.env.TMPDIR ?? '/tmp', 'rtsigns-page-1');
const tempPng = `${tempBase}.png`;
const tempBbox = `${tempBase}.html`;

const regulatoryCodes = [
  'R1', 'R1.1', 'R1.2', 'R1.3', 'R1.4', 'R1.5', 'R2', 'R2.1', 'R2.2', 'R3',
  'R4.1', 'R4.2', 'R4.3', 'R5', 'R6',
  ...Array.from({ length: 40 }, (_, index) => `R${101 + index}`),
  ...Array.from({ length: 41 }, (_, index) => `R${201 + index}`).filter((code) => code !== 'R221'),
  'R301', 'R301-P', 'R302', 'R303', 'R304', 'R304-P', 'R305-P', 'R306-P',
  ...Array.from({ length: 48 }, (_, index) => `R${307 + index}`)
    .flatMap((code) => {
      const parkingCodes = new Set([
        'R307', 'R308', 'R309', 'R310', 'R311', 'R312', 'R313', 'R314', 'R315',
        'R316', 'R317', 'R318', 'R319', 'R320', 'R321', 'R322', 'R323', 'R324',
        'R327', 'R330', 'R333',
      ]);
      return parkingCodes.has(code) ? [code, `${code}-P`] : [code];
    }),
  'R401', 'R402', 'R403',
  '(R)501', '(R)502', '(R)503', '(R)504', '(R)505', '(R)506', '(R)511', '(R)512',
  '(R)520', '(R)521', '(R)522', '(R)523', '(R)530', '(R)531', '(R)532', '(R)533',
  '(R)534', '(R)535', '(R)540',
  ...Array.from({ length: 24 }, (_, index) => `(R)${560 + index}`),
  '(R)600', '(R)132-600', '(R)133-600', '(R)202-600', '(R)304-600', '(R)401-600',
  '(R)402-600', '(R)403-600',
];

const signalCodes = [
  'S1', 'S1(L)', 'S1B', 'S1T', 'S1A', 'S1AR', 'S1AL', 'S2', 'S3', 'S4', 'S5',
  'S6', 'S7', 'S8', 'S8B', 'S8T', 'S9', 'S9B', 'S9T', 'S10R', 'S10L', 'S11',
  'S12', 'S13', 'S14', 'S15', 'S16', 'S17', 'S18', 'S19', 'S20',
  'SS1(a)', 'SS1(b)', 'SS1(c)', 'SS1(d)', 'SS1(e)',
  'SS2(a)', 'SS2(b)', 'SS2(c)', 'SS2(d)', 'SS2(e)',
  'SS3(a)', 'SS3(b)', 'SS3(c)', 'FRD', 'FRD-R1',
];

const fileName = (code) => code
  .toLowerCase()
  .replaceAll('.', '-')
  .replaceAll('(', '-')
  .replaceAll(')', '')
  .replaceAll(/[^a-z0-9-]/g, '-');

const cropOverrides = {
  'R1.1': { height: 220, yOffset: 20 },
  'R1.2': { height: 250 },
  'R1.3': { height: 260, yOffset: 10 },
  'R1.4': { height: 220, yOffset: 10 },
  'R1.5': { height: 255, yOffset: 5 },
  'R2.1': { height: 200 },
  'R2.2': { height: 170 },
  R5: { height: 160 },
  R6: { height: 160 },
  R136: { width: 210, height: 170 },
  R140: { width: 210, height: 170 },
  '(R)504': { height: 175 },
  '(R)505': { height: 190, yOffset: 8 },
  '(R)530': { height: 95 },
  '(R)600': { width: 520 },
  S1: { height: 185 },
  'SS1(a)': { width: 125, height: 230, xOffset: -275 },
  'SS1(b)': { width: 135, height: 230, xOffset: -147 },
  'SS1(c)': { width: 135, height: 230, xOffset: 8 },
  'SS1(d)': { width: 135, height: 230, xOffset: 150 },
  'SS1(e)': { width: 125, height: 230, xOffset: 287 },
  'SS2(a)': { width: 210, height: 230, xOffset: -655 },
  'SS2(b)': { width: 400, height: 230, xOffset: -350 },
  'SS2(c)': { width: 220, height: 230, xOffset: -40 },
  'SS2(d)': { width: 305, height: 230, xOffset: 223 },
  'SS2(e)': { width: 385, height: 230, xOffset: 567 },
  'SS3(a)': { width: 165, height: 230, xOffset: -160 },
  'SS3(b)': { width: 180, height: 230, xOffset: 0 },
  'SS3(c)': { width: 180, height: 230, xOffset: 165 },
  FRD: { width: 130, height: 210 },
  'FRD-R1': { width: 130, height: 210 },
};

mkdirSync(output, { recursive: true });
execFileSync('pdftoppm', ['-f', '1', '-l', '1', '-png', '-r', '144', '-singlefile', source, tempBase]);
execFileSync('pdftotext', ['-f', '1', '-l', '1', '-bbox-layout', source, tempBbox]);

const page = readFileSync(tempBbox, 'utf8').match(/<page[\s\S]*?<\/page>/)?.[0];
if (!page) throw new Error('Could not read page 1 bounding boxes');

const words = [...page.matchAll(
  /<word xMin="([^"]+)" yMin="([^"]+)" xMax="([^"]+)" yMax="([^"]+)">([^<]+)<\/word>/g,
)].map((match) => ({
  xMin: Number(match[1]),
  yMin: Number(match[2]),
  xMax: Number(match[3]),
  text: match[5],
}));

for (const code of [...regulatoryCodes, ...signalCodes]) {
  let word = words.find((candidate) => candidate.text === code);
  if (code === 'R4.1' && !word) {
    const r42 = words.find((candidate) => candidate.text === 'R4.2');
    if (r42) word = { ...r42, xMin: r42.xMin - 98.5, xMax: r42.xMax - 98.5 };
  }
  if (code.startsWith('SS1(') && !word) {
    const label = words.find((candidate) => candidate.text === 'SS1');
    if (label) word = label;
  }
  if (code.startsWith('SS2(') && !word) {
    const label = words.find((candidate) => candidate.text === 'SS2');
    if (label) word = label;
  }
  if (code.startsWith('SS3(') && !word) {
    const label = words.find((candidate) => candidate.text === 'SS3');
    if (label) word = label;
  }
  if (!word) throw new Error(`Could not locate ${code} on chart page 1`);

  const signal = code.startsWith('S');
  const width = cropOverrides[code]?.width ?? (signal ? 150 : 160);
  const height = cropOverrides[code]?.height ?? (signal ? 210 : 140);
  const centerX = ((word.xMin + word.xMax) / 2) * 2;
  const xOffset = cropOverrides[code]?.xOffset ?? 0;
  const x = Math.max(0, Math.round(centerX - width / 2 + xOffset));
  const yOffset = cropOverrides[code]?.yOffset ?? 0;
  const y = Math.max(0, Math.round(word.yMin * 2 - height - 10 + yOffset));

  execFileSync('sips', [
    '--cropToHeightWidth', String(height), String(width),
    '--cropOffset', String(y), String(x),
    tempPng,
    '--out', join(output, `${fileName(code)}.png`),
  ], { stdio: 'ignore' });
}

rmSync(tempPng, { force: true });
rmSync(tempBbox, { force: true });
console.log(`Extracted ${regulatoryCodes.length + signalCodes.length} page-1 signs to ${output}`);
