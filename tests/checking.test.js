import {MayaCreator, ProjectPoint, Point} from "../src/MayaCreator"

let m = new MayaCreator(80, 800, 800, {red: 50, green: 50, blue: 50}, 0.5)

// let distortionUtil = (n) => (n + 100) / 100 


// test("check plain distortion", () => {
//   let middlePointX = 250;
//   let middlePointY = 250;
//   let p1 = new Point(150, 270, 50);
//   p1.z = 100
//   ProjectPoint(p1, middlePointX, middlePointY)

//   let expectedXValue = (150*2) - middlePointX
//   let expectedYValue = (270*2) - middlePointY

//   expect(p1.x).toBe(expectedXValue)
//   expect(p1.y).toBe(expectedYValue)

//   p1.z = 75

//   ProjectPoint(p1, middlePointX, middlePointY)
  
//   let expectedDepthProportion = (75/100) * 2

//   expectedXValue = ((150 - middlePointX)*expectedDepthProportion) + middlePointX
//   expectedYValue = ((270 - middlePointX)*expectedDepthProportion) + middlePointY

//   expect(p1.x).toBe(expectedXValue)
//   expect(p1.y).toBe(expectedYValue)
//   // expect(expectedDepthProportion).toBe(1.5)
// })

test("check point projection (proportion depth..)", () => {
  let middlePointX = 250;
  let middlePointY = 250;
  let p1 = new Point(150, 150, 50);
  let p2 = new Point(300, 300, 50);  
  p1.z = 100
  p2.z = 100
  ProjectPoint(p1, middlePointX, middlePointY)
  ProjectPoint(p2, middlePointX, middlePointY)  

  let manuallyDistortedDifferenceForYValues = (p2.baseY - p1.baseY)*2;
  let manuallyDistortedDifferenceForXValues = (p2.baseX - p1.baseX)*2;

  let plainXDifference = p2.x - p1.x
  let plainYDifference = p2.y - p1.y

  expect(manuallyDistortedDifferenceForYValues).toBe(plainYDifference)
  expect(manuallyDistortedDifferenceForXValues).toBe(plainXDifference)
})



// test("check triangle angle (X)", () => {
//   let randomTriangle = m.triangles[Math.floor(Math.random()*m.triangles.length)]

//   randomTriangle.points[2].z = 80
//   randomTriangle.points[1].z = 0
//   randomTriangle.points[0].z = 0

//   let [angleXDegree, angleYDegree] = m.generateXYDegrees(randomTriangle)

//   expect(angleXDegree > 40 && angleXDegree < 50).toBe(true);
//   expect(angleYDegree*-1).toBe(0);
//   // expect(angleXDegree).toBe(45);
// })

// test("check triangle angle (Y)", () => {
//   let randomTriangle = m.triangles[Math.floor(Math.random()*m.triangles.length)]

//   randomTriangle.points[2].z = 0
//   randomTriangle.points[1].z = 80
//   randomTriangle.points[0].z = 0

//   let [angleXDegree, angleYDegree] = m.generateXYDegrees(randomTriangle)

//   // expect(angleYDegree).toBe(45);
//   expect(angleYDegree).toBe(0);
//   // expect(angleXDegree).toBe(45);
// })

