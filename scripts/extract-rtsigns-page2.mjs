import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { page2Codes } from './rtsigns-page2-codes.mjs';

const source = process.argv[2] ?? 'original/RTSigns_charts.pdf';
const output = process.argv[3] ?? 'public/signs/rtsigns/page-2';
const tempBase = join(process.env.TMPDIR ?? '/tmp', 'rtsigns-page-2');
const tempPng = `${tempBase}.png`;
const tempBbox = `${tempBase}.html`;

const fileName = (code) => code.toLowerCase().replaceAll('.', '-').replace(/[()]/g, '-').replace(/-+$/g, '');

// Page-2 road markings vary substantially in size. These dimensions preserve
// each complete illustration while stopping before the neighboring labels.
const cropOverrides = {
  W409: { width: 330, height: 130 },
  W410: { width: 330, height: 130 },
  W411: { width: 500, height: 130 },
  W413: { width: 115, height: 180 },
  IN1: { width: 125 },
  IN2: { width: 125 },
  IN3: { width: 125 },
  IN4: { width: 125 },
  IN5: { width: 125 },
  IN6: { width: 125 },
  IN7: { width: 220, height: 190 },
  IN10: { width: 230, height: 150 },
  'IN11.1': { width: 180, height: 80, absoluteY: 2020 },
  'IN11.3': { width: 180, height: 80, absoluteY: 2020 },
  'IN11.2': { width: 180, height: 72, absoluteY: 2130 },
  'IN11.4': { width: 180, height: 72, absoluteY: 2130 },
  'IN11.568': { width: 180, height: 150 },
  'IN11.577': { width: 180, height: 150 },
  IN19: { width: 180, height: 150 },
  IN14: { width: 190, height: 190 },
  RTM1: { width: 180, height: 240 },
  RTM2: { width: 150, height: 240 },
  RTM3: { width: 260, height: 230 },
  RTM4: { width: 240, height: 230 },
  RM1: { width: 180, height: 250 },
  RM2: { width: 300, height: 260 },
  RM3: { width: 180, height: 250 },
  'RM4.1': { width: 180, height: 250 },
  'RM4.2': { width: 180, height: 250 },
  RM5: { width: 760, height: 280, xOffset: 20 },
  RM6: { width: 180, height: 250 },
  RM7: { width: 220, height: 260 },
  RM8: { width: 560, height: 270 },
  RM9: { width: 280, height: 300 },
  RM10: { width: 220, height: 300 },
  RM11: { width: 260, height: 310 },
  'RM12(a)': { width: 170, height: 300, xOffset: -115 },
  'RM12(b)': { width: 170, height: 300, xOffset: 105 },
  'RM13(a)': { width: 170, height: 300, xOffset: -130 },
  'RM13(b)': { width: 170, height: 300, xOffset: 70 },
  RM14: { width: 300, height: 300 },
  RM15: { width: 360, height: 300 },
  RM16: { width: 380, height: 300 },
  'RM17(a)': { width: 160, height: 270, xOffset: -338 },
  'RM17(b)': { width: 160, height: 270, xOffset: -167 },
  'RM17(c)': { width: 160, height: 270, xOffset: -11 },
  'RM17(d)': { width: 160, height: 270, xOffset: 166 },
  'RM17(e)': { width: 160, height: 270, xOffset: 331 },
  WM1: { width: 210, height: 270 },
  WM2: { width: 350, height: 270 },
  WM3: { width: 300, height: 270 },
  WM4: { width: 180, height: 270 },
  WM5: { width: 180, height: 270 },
  WM6: { width: 520, height: 270 },
  WM7: { width: 520, height: 270 },
  WM8: { width: 440, height: 270 },
  'WM9.1': { width: 500, height: 300 },
  'WM9.2': { width: 500, height: 330 },
  WM10: { width: 320, height: 300 },
  'WM11(a)': { width: 220, height: 330, xOffset: -134 },
  'WM11(b)': { width: 220, height: 330, xOffset: 122 },
  GM1: { width: 600, height: 250 },
  GM2: { width: 360, height: 300 },
  GM3: { width: 460, height: 250 },
  GM4: { width: 220, height: 250 },
  GM5: { width: 600, height: 250 },
  'GM6(a)': { width: 180, height: 250, xOffset: -310 },
  'GM6(b)': { width: 150, height: 250, xOffset: -100 },
  'GM6(c)': { width: 150, height: 250, xOffset: 110 },
  'GM6(d)': { width: 180, height: 250, xOffset: 290 },
  GM7: { width: 560, height: 250 },
  GM8: { width: 1000, height: 170 },
};

mkdirSync(output, { recursive: true });
execFileSync('pdftoppm', ['-f', '2', '-l', '2', '-png', '-r', '144', '-singlefile', source, tempBase]);
execFileSync('pdftotext', ['-f', '2', '-l', '2', '-bbox-layout', source, tempBbox]);

const page = readFileSync(tempBbox, 'utf8').match(/<page[\s\S]*?<\/page>/)?.[0];
if (!page) throw new Error('Could not read page 2 bounding boxes');

const words = [...page.matchAll(
  /<word xMin="([^"]+)" yMin="([^"]+)" xMax="([^"]+)" yMax="([^"]+)">([^<]+)<\/word>/g,
)].map((match) => ({
  xMin: Number(match[1]),
  yMin: Number(match[2]),
  xMax: Number(match[3]),
  text: match[5],
}));

for (const code of page2Codes) {
  const sourceCode = code.replace(/\([a-e]\)$/, '');
  let word = words.find((candidate) => candidate.text === sourceCode);
  if (code === 'W313' && !word) {
    const w312 = words.find((candidate) => candidate.text === 'W312');
    if (w312) word = { ...w312, xMin: w312.xMin + 96.8, xMax: w312.xMax + 96.8 };
  }
  if (code === 'W319' && !word) {
    const w318 = words.find((candidate) => candidate.text === 'W318');
    if (w318) word = { ...w318, xMin: w318.xMin + 95.8, xMax: w318.xMax + 95.8 };
  }
  if (!word) throw new Error(`Could not locate ${code} on chart page 2`);

  const marking = /^(?:RTM|RM|WM|GM)/.test(code);
  const hazard = /^W4/.test(code);
  const information = /^IN/.test(code);
  const width = cropOverrides[code]?.width ?? (hazard ? 150 : information ? 150 : 160);
  const height = cropOverrides[code]?.height ?? (marking ? 240 : hazard ? 125 : information ? 150 : 135);
  const centerX = ((word.xMin + word.xMax) / 2) * 2;
  const xOffset = cropOverrides[code]?.xOffset ?? 0;
  const x = Math.max(0, Math.round(centerX - width / 2 + xOffset));
  const yOffset = cropOverrides[code]?.yOffset ?? 0;
  const y = cropOverrides[code]?.absoluteY
    ?? Math.max(0, Math.round(word.yMin * 2 - height - 10 + yOffset));

  execFileSync('sips', [
    '--cropToHeightWidth', String(height), String(width),
    '--cropOffset', String(y), String(x),
    tempPng,
    '--out', join(output, `${fileName(code)}.png`),
  ], { stdio: 'ignore' });
}

rmSync(tempPng, { force: true });
rmSync(tempBbox, { force: true });
console.log(`Extracted ${page2Codes.length} page-2 illustrations to ${output}`);
