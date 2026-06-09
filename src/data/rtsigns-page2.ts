import type { RoadSign, SignCategory } from './roadsigns';
import page2Catalog from './rtsigns-page2-catalog.json';

const categoryFor = (code: string): SignCategory => {
  if (code.startsWith('W')) return 'warning';
  return 'information';
};

export const RTSIGNS_PAGE_2: RoadSign[] = page2Catalog.map(({ code, name, description }) => ({
  id: `rtsigns-${code.toLowerCase().replace(/\./g, '-').replace(/[()]/g, '-').replace(/-+$/g, '')}`,
  name,
  description,
  category: categoryFor(code),
  imagePath: `/signs/rtsigns/page-2/${code.toLowerCase().replace(/\./g, '-').replace(/[()]/g, '-').replace(/-+$/g, '')}.png`,
}));
