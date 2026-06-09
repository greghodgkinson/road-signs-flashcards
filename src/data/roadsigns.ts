export type SignCategory = 'warning' | 'prohibitory' | 'mandatory' | 'information';

export interface RoadSign {
  id: string;
  name: string;
  description: string;
  category: SignCategory;
  imagePath: string;
}

import { RTSIGNS_PAGE_1_ADDITIONAL, RTSIGNS_PAGE_1_CODE_2 } from './rtsigns-page1';
import { RTSIGNS_PAGE_2 } from './rtsigns-page2';

const sign = (
  number: number | string,
  name: string,
  description: string,
  category: SignCategory,
): RoadSign => ({
  id: `code-2-${number}`,
  name,
  description,
  category,
  imagePath: `/signs/learnership/sign-${number}.png`,
});

// Complete Code 2 learnership set from original/Learnership road.pdf, matched
// one-for-one with the descriptions in original/Answer sheet.pdf.
export const ROAD_SIGNS: RoadSign[] = [
  sign(1, 'Crossroads with Priority', 'Roads cross ahead; vehicles approaching from the side roads must stop or yield.', 'warning'),
  sign(2, 'Straight Ahead Only', 'You must only drive straight ahead.', 'mandatory'),
  sign(3, 'Crossroads: Stop or Yield Ahead', 'Roads cross ahead and you must yield or stop.', 'warning'),
  sign(4, 'Pedestrian Crossing Ahead', 'A marked pedestrian crossing is ahead.', 'warning'),
  sign(5, 'No Hooting', 'You may not use your hooter here.', 'prohibitory'),
  sign(6, 'Turn Right Ahead', 'You must turn right at the next road.', 'mandatory'),
  sign(7, 'Two-Way Traffic Ahead', 'Two lanes carrying traffic in different directions are ahead.', 'warning'),
  sign(8, 'Cyclists Ahead', 'Be on the lookout for cyclists ahead.', 'warning'),
  sign(9, 'Road Narrows Both Sides', 'The road narrows from both sides ahead.', 'warning'),
  sign(10, 'Speed Hump Ahead', 'There are speed humps in the road ahead.', 'warning'),
  sign(11, 'Water Ends the Road', 'The road ends because of water in the road ahead.', 'warning'),
  sign(12, 'No Left Turn Ahead', 'You may not turn left ahead.', 'prohibitory'),
  sign(13, 'Motor Gate on Left', 'There is a motor gate on the left-hand side of the road ahead.', 'warning'),
  sign(14, 'No Overtaking or Crossing Line', 'Traffic may not overtake or cross this line on either side.', 'information'),
  sign(15, 'Single Railway Line Ahead', 'There is a level crossing with one railway line ahead.', 'warning'),
  sign(16, 'Single-Lane Obstacle Ahead', 'Only one vehicle can pass through the obstacle ahead.', 'warning'),
  sign(17, 'Yield to Pedestrians', 'You must yield to pedestrians ahead.', 'warning'),
  sign(18, 'Four-Way Stop', 'At a four-way stop, leave in the same sequence in which the vehicles stopped.', 'prohibitory'),
  sign(19, 'Potholes Ahead', 'There are potholes in the road ahead.', 'warning'),
  sign(20, 'Slippery Road Ahead', 'The road is slippery ahead.', 'warning'),
  sign(21, 'Minibus Parking Only', 'Only minibuses may park here.', 'information'),
  sign(22, 'Winding Road for 12 km', 'The road winds for the next 12 kilometres.', 'warning'),
  sign(23, 'Traffic Signals Ahead', 'Traffic signals are ahead.', 'warning'),
  sign(24, 'No Entry Without Permission', 'You are not allowed to drive here without permission.', 'prohibitory'),
  sign(25, 'Agricultural Vehicles Ahead', 'Be on the lookout for agricultural vehicles that may be on the road.', 'warning'),
  sign(26, 'Minimum Speed 50 km/h', 'You may not drive slower than 50 kilometres per hour.', 'mandatory'),
  sign(27, 'Concealed Entrance and Curve', 'A concealed entrance on the left is followed by a curve to the right.', 'warning'),
  sign(28, 'Night Speed Limit 100 km/h', 'The maximum speed allowed at night is 100 kilometres per hour.', 'prohibitory'),
  sign(29, 'Loading Zone', 'This is a loading zone where goods vehicles may load and offload.', 'information'),
  sign(30, 'Danger Ahead', 'There is danger in the road ahead.', 'warning'),
  sign(31, 'Roundabout Priority', 'Yield to vehicles already in the circle and approaching from the right.', 'information'),
  sign(32, 'No Overtaking by Motor Vehicles', 'Motor vehicles may not overtake one another here.', 'prohibitory'),
  sign(33, 'Minimum Mass 10 Tonnes', 'Only vehicles with a mass of more than 10 tonnes may drive here.', 'mandatory'),
  sign(34, 'Painted Island', 'This painted island may not be driven on or used for parking.', 'information'),
  sign(35, 'Gravel Road Ahead', 'The tarred road becomes a gravel road ahead.', 'warning'),
  sign(36, 'Road Ends: Turn Left or Right', 'Be prepared to stop or yield, then turn either right or left.', 'information'),
  sign(37, 'No Parking Area', 'You may not park here at all.', 'prohibitory'),
  sign(38, 'Low-Water Bridge Ahead', 'There is a low-water bridge ahead.', 'warning'),
  sign('39a', 'Pedestrian Crossing Lines', 'These transverse lines mark where pedestrians cross the road.', 'information'),
  sign('39b', 'Pedestrian Crossings at a Junction', 'These marked crossing lines show where pedestrians cross at a junction.', 'information'),
  sign(40, 'Keep Left of Obstruction', 'Keep left because the obstruction is on the right-hand side of the road.', 'mandatory'),
  sign('41a', 'Double Barrier Line', 'You may not overtake or cross either barrier line, including to turn into a property.', 'information'),
  sign('41b', 'Single Barrier Line', 'You may not overtake or cross the barrier line.', 'information'),
  sign(42, 'Road Shoulder', 'The shoulder is not for overtaking or night driving. It may be used during the day when permitted, or to stop after a puncture or breakdown.', 'information'),
  sign(43, 'Yield Line', 'You must yield to all traffic at this line and, in some cases, to trains at a level crossing.', 'information'),
  sign(44, 'Sharp Curve Left Ahead', 'There is a sharp curve to the left ahead.', 'warning'),
  sign(45, 'Stop Line', 'Stop before the stop line.', 'information'),
  sign('46a', 'Temporary Traffic Controller Ahead', 'A temporary traffic controller or stop-and-go point is ahead.', 'warning'),
  sign('46b', 'Temporary Uneven Road Ahead', 'A temporary uneven road surface or roadworks hazard is ahead.', 'warning'),
  sign('47a', 'Lane Arrow: Turn Left', 'You must turn left from this lane.', 'information'),
  sign('47b', 'Lane Arrow: Left or Straight', 'You may turn left or continue straight from this lane.', 'information'),
  sign('47c', 'Lane Arrow: Straight Ahead', 'You must continue straight ahead from this lane.', 'information'),
  sign('47d', 'Lane Arrow: Straight or Right', 'You may continue straight or turn right from this lane.', 'information'),
  sign('47e', 'Lane Arrow: Turn Right', 'You must turn right from this lane.', 'information'),
  sign('47f', 'Lane Arrow: Pass Either Side', 'Traffic lanes may pass on either side of the marked division.', 'information'),
  sign(48, 'Bus Parking Only', 'Only buses may park here.', 'information'),
  sign(49, 'No Entry', 'No vehicles may enter.', 'prohibitory'),
  sign(50, 'Right-Turn Traffic Signal', 'Proceed only if you wish to turn right and the right-turn signal permits it.', 'information'),
  sign(51, 'Closed Overhead Lane', 'You may not use this lane; it is reserved for oncoming traffic.', 'prohibitory'),
  sign(52, 'Cul-de-sac to the Right', 'The next road to the right is a dead end.', 'information'),
  sign(53, 'No Stopping During Shown Times', 'You may not stop here during the times shown.', 'prohibitory'),
  sign(54, 'Keep Right of Temporary Obstruction', 'A temporary obstruction is on the left; you must keep right.', 'information'),
  sign(55, 'Barrier Line Begins', 'A barrier line is about to begin, prohibiting overtaking or passing.', 'information'),
  sign(56, 'Stop with Left-Turn Yield', 'You must stop, but when turning left only you may treat the lower sign as a yield sign.', 'prohibitory'),
  sign(57, 'No Cars During Shown Times', 'Cars may not drive here during the times shown.', 'prohibitory'),
  sign(58, 'No Minibuses', 'Minibuses may not drive here.', 'prohibitory'),
  sign(59, 'Motor Vehicles Only', 'All motor vehicles must drive here.', 'mandatory'),
  sign(60, 'Reserved Parking', 'This is a reservation sign; use the reserved area only when permitted.', 'information'),
  sign(61, 'No Cars', 'Cars may not drive here.', 'prohibitory'),
  sign(62, 'Lane Use Diagram', 'This road marking shows the available lanes and their directions to road users.', 'information'),
  ...RTSIGNS_PAGE_1_CODE_2,
  ...RTSIGNS_PAGE_1_ADDITIONAL,
  ...RTSIGNS_PAGE_2,
];

export function getRandomSet(size = 20): RoadSign[] {
  const shuffled = [...ROAD_SIGNS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(size, shuffled.length));
}
