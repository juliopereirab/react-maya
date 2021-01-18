import {MayaCreator, Point} from "../src/MayaCreator"

let m = new MayaCreator(80, 800, 800, {red: 50, green: 50, blue: 50}, 0.5, 0.5)
let totalDepth = 100


test("check plain distortion", () => {
  let middlePointX = 250;
  let middlePointY = 250;
  let p1 = new Point(150, 270, 50);
  p1.z = totalDepth
  m.ProjectPoint(p1, middlePointX, middlePointY)

  let expectedXValue = (150*2) - middlePointX
  let expectedYValue = (270*2) - middlePointY

  expect(p1.x).toBe(expectedXValue)
  expect(p1.y).toBe(expectedYValue)

  p1.z = 75

  m.ProjectPoint(p1, middlePointX, middlePointY)
  
  let expectedDepthProportion = (75/100) * 2

  expectedXValue = ((150 - middlePointX)*expectedDepthProportion) + middlePointX
  expectedYValue = ((270 - middlePointX)*expectedDepthProportion) + middlePointY

  expect(p1.x).toBe(expectedXValue)
  expect(p1.y).toBe(expectedYValue)
  // expect(expectedDepthProportion).toBe(1.5)
})

test("check point projection (proportion depth..)", () => {
  let middlePointX = 250;
  let middlePointY = 250;
  let p1 = new Point(150, 150, 50);
  let p2 = new Point(300, 300, 50);  
  p1.z = 100
  p2.z = 100
  m.ProjectPoint(p1, middlePointX, middlePointY)
  m.ProjectPoint(p2, middlePointX, middlePointY)  

  let manuallyDistortedDifferenceForYValues = (p2.baseY - p1.baseY)*2;
  let manuallyDistortedDifferenceForXValues = (p2.baseX - p1.baseX)*2;

  let plainXDifference = p2.x - p1.x
  let plainYDifference = p2.y - p1.y

  expect(manuallyDistortedDifferenceForYValues).toBe(plainYDifference)
  expect(manuallyDistortedDifferenceForXValues).toBe(plainXDifference)
})



test("check triangle angle (X) to be around 45 degrees", () => {
  let randomTriangle = m.triangles[Math.floor(Math.random()*m.triangles.length)]

  let height = Math.abs(randomTriangle.points[2].x - randomTriangle.points[0].x);

  randomTriangle.points[2].z = height
  randomTriangle.points[1].z = 0
  randomTriangle.points[0].z = 0

  let [angleXDegree, angleYDegree] = m.generateXYDegrees(randomTriangle)

  let positiveDegree = (angleXDegree > 0 ? angleXDegree : angleXDegree*-1)

  expect(positiveDegree > 44 && positiveDegree < 46).toBe(true);
  expect(angleYDegree).toBe(0);
})

test("check triangle angle (Y) to be around 45 degrees", () => {
  let randomTriangle = m.triangles[Math.floor(Math.random()*m.triangles.length)]

  randomTriangle.points[2].z = 0
  randomTriangle.points[1].z = 120
  randomTriangle.points[0].z = 0

  let [angleXDegree, angleYDegree] = m.generateXYDegrees(randomTriangle)

  let positiveDegree = (angleYDegree > 0 ? angleYDegree : angleYDegree*-1)

  expect(positiveDegree > 44 && positiveDegree < 46).toBe(true);
})

