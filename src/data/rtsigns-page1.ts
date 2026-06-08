import type { RoadSign, SignCategory } from './roadsigns';
import page1Catalog from './rtsigns-page1-catalog.json';

const chartSign = (
  code: string,
  name: string,
  description: string,
  category: SignCategory,
): RoadSign => ({
  id: `rtsigns-${code.toLowerCase().replace(/[().]/g, '-').replace(/-+/g, '-')}`,
  name,
  description,
  category,
  imagePath: `/signs/rtsigns/page-1/${code.toLowerCase().replace(/\./g, '-').replace(/\(/g, '-').replace(/\)/g, '')}.png`,
});

export const RTSIGNS_PAGE_1_CODE_2: RoadSign[] = [
  chartSign('R1', 'Stop', 'Stop completely behind the stop line and proceed only when it is safe.', 'prohibitory'),
  chartSign('R1.2', 'Stop or Yield', 'Stop where required, or yield before entering the roadway.', 'prohibitory'),
  chartSign('R1.3', 'Three-Way Stop', 'All three approaches must stop; proceed in the order vehicles arrived.', 'prohibitory'),
  chartSign('R1.5', 'Stop/Go Control', 'Stop or proceed according to the displayed side of the temporary control sign.', 'prohibitory'),
  chartSign('R2', 'Yield', 'Give right of way to traffic on the road you are entering.', 'prohibitory'),
  chartSign('R2.2', 'Yield at Mini-Circle', 'Yield to traffic already in the mini-circle and approaching from the right.', 'prohibitory'),
  chartSign('R4.1', 'One-Way Left', 'Traffic on this roadway may travel only to the left.', 'mandatory'),
  chartSign('R4.2', 'One-Way Right', 'Traffic on this roadway may travel only to the right.', 'mandatory'),
  chartSign('R4.3', 'One-Way Straight Ahead', 'Traffic on this roadway may travel only straight ahead.', 'mandatory'),
  chartSign('R5', 'Pedestrian Priority', 'Pedestrians have priority in this area; drive slowly and yield to them.', 'mandatory'),
  chartSign('R6', 'Yield to Oncoming Traffic', 'Give right of way to vehicles approaching from the opposite direction.', 'prohibitory'),
  chartSign('R101', 'Minimum Speed', 'Do not drive slower than the indicated speed unless conditions make it unsafe.', 'mandatory'),
  chartSign('R104', 'Keep Right', 'Pass to the right of the sign or obstruction.', 'mandatory'),
  chartSign('R105', 'Proceed Left Only', 'You must proceed to the left of the sign.', 'mandatory'),
  chartSign('R106', 'Proceed Right Only', 'You must proceed to the right of the sign.', 'mandatory'),
  chartSign('R108', 'Turn Left', 'You must turn left at the junction.', 'mandatory'),
  chartSign('R109', 'Turn Right', 'You must turn right at the junction.', 'mandatory'),
  chartSign('R110', 'Pedestrians Only', 'Only pedestrians may use this route.', 'mandatory'),
  chartSign('R111', 'Pedal Cycles Only', 'Only pedal cycles may use this route.', 'mandatory'),
  chartSign('R112', 'Shared Pedestrian and Cycle Route', 'Pedestrians and cyclists must share this route as indicated.', 'mandatory'),
  chartSign('R113', 'Separated Cycle and Pedestrian Route', 'Cyclists and pedestrians must use their indicated sides of the route.', 'mandatory'),
  chartSign('R114', 'Separated Pedestrian and Cycle Route', 'Pedestrians and cyclists must use their indicated sides of the route.', 'mandatory'),
  chartSign('R115', 'Shared Pedestrian and Cycle Route', 'Pedestrians and cyclists may use this shared route.', 'mandatory'),
  chartSign('R117', 'Motor Cars Only', 'Only motor cars may use this route.', 'mandatory'),
  chartSign('R132', 'Pay Toll', 'A toll is payable before proceeding.', 'mandatory'),
  chartSign('R133', 'Switch Headlamps On', 'Switch on your vehicle headlamps.', 'mandatory'),
  chartSign('R137', 'Roundabout', 'Travel around the roundabout in the direction shown.', 'mandatory'),
  chartSign('R201', 'Speed Limit', 'Do not exceed the speed shown on the sign.', 'prohibitory'),
  chartSign('R207', 'No Hitch-Hiking', 'Hitch-hiking is prohibited in this area.', 'prohibitory'),
  chartSign('R210', 'No Right Turn Ahead', 'You may not turn right at the road ahead.', 'prohibitory'),
  chartSign('R211', 'No Left Turn', 'You may not turn left at this junction.', 'prohibitory'),
  chartSign('R212', 'No Right Turn', 'You may not turn right at this junction.', 'prohibitory'),
  chartSign('R213', 'No U-Turn', 'You may not make a U-turn.', 'prohibitory'),
  chartSign('R217', 'No Stopping', 'You may not stop your vehicle here.', 'prohibitory'),
  chartSign('R218', 'No Pedestrians', 'Pedestrians may not enter or use this route.', 'prohibitory'),
  chartSign('R219', 'No Pedal Cycles', 'Pedal cycles may not enter or use this route.', 'prohibitory'),
  chartSign('R220', 'No Pedestrians or Pedal Cycles', 'Pedestrians and pedal cycles may not enter or use this route.', 'prohibitory'),
  chartSign('R239', 'Width Limit', 'Vehicles wider than the indicated width may not proceed.', 'prohibitory'),
  chartSign('R240', 'No Towed Vehicles', 'Vehicles towing another vehicle may not proceed.', 'prohibitory'),
  chartSign('R241', 'No Hawkers', 'Hawking or roadside trading is prohibited here.', 'prohibitory'),
  chartSign('R305-P', 'Parking', 'This is a designated parking place.', 'information'),
  chartSign('R306-P', 'Limited Parking', 'Parking is permitted only for the time shown.', 'information'),
  chartSign('R308', 'Motor Car Reserved Route', 'This route or area is reserved for motor cars.', 'information'),
  chartSign('R308-P', 'Motor Car Parking', 'This parking area is reserved for motor cars.', 'information'),
  chartSign('R320', 'High-Occupancy Vehicles Only', 'This route is reserved for vehicles carrying the required number of occupants.', 'information'),
  chartSign('R320-P', 'High-Occupancy Vehicle Parking', 'This parking is reserved for qualifying high-occupancy vehicles.', 'information'),
  chartSign('R321', 'Emergency Vehicles Only', 'This route or area is reserved for emergency vehicles.', 'information'),
  chartSign('R321-P', 'Emergency Vehicle Parking', 'This parking area is reserved for emergency vehicles.', 'information'),
  chartSign('R322', 'Police Vehicles Only', 'This route or area is reserved for police vehicles.', 'information'),
  chartSign('R322-P', 'Police Vehicle Parking', 'This parking area is reserved for police vehicles.', 'information'),
  chartSign('R323', 'Disabled Persons Vehicles Only', 'This route or area is reserved for vehicles used by disabled persons.', 'information'),
  chartSign('R323-P', 'Disabled Persons Parking', 'This parking area is reserved for vehicles used by disabled persons.', 'information'),
  chartSign('R324', 'Authorized Vehicles Only', 'Only authorized vehicles may use this route or area.', 'information'),
  chartSign('R324-P', 'Authorized Vehicle Parking', 'This parking area is reserved for authorized vehicles.', 'information'),
  chartSign('R401', 'Dual-Carriageway Freeway Begins', 'A dual-carriageway freeway begins here; freeway rules apply.', 'information'),
  chartSign('R402', 'Single-Carriageway Freeway Begins', 'A single-carriageway freeway begins here; freeway rules apply.', 'information'),
  chartSign('R403', 'Woonerf', 'You are entering a shared low-speed residential area where pedestrians have priority.', 'information'),
  chartSign('S1', 'Standard Traffic Signal', 'Obey the red, yellow, and green traffic signal indications.', 'information'),
  chartSign('S1(L)', 'Traffic Signal with Left Arrow', 'Obey the main traffic lights and the separate left-turn arrow.', 'information'),
  chartSign('S1A', 'Arrow Traffic Signal', 'Proceed only in the direction shown by the illuminated arrow.', 'information'),
  chartSign('S1AR', 'Right-Arrow Traffic Signal', 'Obey the separate signal controlling right-turning traffic.', 'information'),
  chartSign('S1AL', 'Left-Arrow Traffic Signal', 'Obey the separate signal controlling left-turning traffic.', 'information'),
  chartSign('S2', 'Red and Yellow Traffic Signal', 'Stop on red; prepare to proceed when the signal changes.', 'information'),
  chartSign('S3', 'Red and Green Traffic Signal', 'Stop on red and proceed cautiously on green.', 'information'),
  chartSign('S4', 'Standard Vertical Traffic Signal', 'Stop on red, prepare to stop on yellow, and proceed cautiously on green.', 'information'),
  chartSign('S5', 'Traffic Signal with Green Arrow', 'Proceed only in the direction of the green arrow when illuminated.', 'information'),
  chartSign('S6', 'Traffic Signal with Green Arrow', 'Proceed only in the direction of the green arrow when illuminated.', 'information'),
  chartSign('S7', 'Traffic Signal with Green Arrow', 'Proceed only in the direction of the green arrow when illuminated.', 'information'),
  chartSign('S8', 'Traffic Signal with Direction Arrows', 'Obey the illuminated arrows controlling each permitted movement.', 'information'),
  chartSign('S9', 'Traffic Signal with Direction Arrows', 'Obey the illuminated arrows controlling each permitted movement.', 'information'),
  chartSign('S10R', 'Right-Turn Arrow Signal', 'Obey the signal controlling right-turning traffic.', 'information'),
  chartSign('S10L', 'Left-Turn Arrow Signal', 'Obey the signal controlling left-turning traffic.', 'information'),
  chartSign('S11', 'Pedestrian Traffic Signal', 'Drivers must obey this signal and yield right of way to pedestrians crossing lawfully.', 'information'),
  chartSign('S12', 'Standard Traffic Signal', 'Stop on red, prepare to stop on yellow, and proceed cautiously on green.', 'information'),
  chartSign('S13', 'Traffic Signal with Right Arrow', 'Obey the main signal and the separate right-turn indication.', 'information'),
  chartSign('S14', 'Traffic Signal with Left Arrow', 'Obey the main signal and the separate left-turn indication.', 'information'),
  chartSign('S15', 'Traffic Signal with Multiple Arrows', 'Obey the separate illuminated indications for each movement.', 'information'),
  chartSign('S16', 'Open Lane Signal', 'Vehicles may use the lane below the green arrow.', 'information'),
  chartSign('S17', 'Closed Lane Signal', 'Vehicles may not use the lane below the red cross.', 'prohibitory'),
  chartSign('S18', 'Leave Lane to the Left', 'The lane ahead is closing; move left when it is safe.', 'information'),
  chartSign('S19', 'Leave Lane to the Right', 'The lane ahead is closing; move right when it is safe.', 'information'),
  chartSign('S20', 'Pedal Cycle Traffic Signal', 'Drivers must obey this signal and yield right of way to cyclists crossing lawfully.', 'information'),
];

const detailedCodes = new Set(
  RTSIGNS_PAGE_1_CODE_2.map((sign) => sign.id.replace(/^rtsigns-/, '')),
);

const normalizedCode = (code: string) => code
  .toLowerCase()
  .replace(/[().]/g, '-')
  .replace(/-+/g, '-');

const categoryFor = (code: string): SignCategory => {
  if (/^R1\d\d$/.test(code) || /^R4\./.test(code) || code === 'R5') return 'mandatory';
  if (/^R(?:[1-3](?:\.\d+)?|6|2\d\d)$/.test(code) || code === 'S17') return 'prohibitory';
  return 'information';
};

const descriptionFor = (name: string, category: SignCategory): string => {
  if (category === 'prohibitory') return `${name}. You must obey this prohibition or restriction.`;
  if (category === 'mandatory') return `${name}. You must follow the instruction shown.`;
  return `${name}. Observe the sign and adjust your driving accordingly.`;
};

export const RTSIGNS_PAGE_1_ADDITIONAL: RoadSign[] = page1Catalog
  .filter(({ code }) => !detailedCodes.has(normalizedCode(code)))
  .map(({ code, name }) => {
    const category = categoryFor(code);
    return chartSign(code, name, descriptionFor(name, category), category);
  });
