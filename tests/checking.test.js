import {MayaCreator, ProjectPoint, Point} from "../src/MayaCreator"

let m = new MayaCreator(80, 800, 800, {red: 50, green: 50, blue: 50}, 0.5)


test("check point projection (proportion depth..)", () => {
  let middlePointX = 250;
  let middlePointY = 250;
  let p1 = new Point(150, 150, 1);
  let p2 = new Point(300, 300, 1);  
  p1.z = 2
  p2.z = 2
  ProjectPoint(p1, middlePointX, middlePointY)
  ProjectPoint(p2, middlePointX, middlePointY)  

  expect((p2.baseY - p1.baseY)*2).toBe(p2.y - p1.y)
  expect((p2.baseX - p1.baseX)*2).toBe(p2.x - p1.x)
})

test("check triangle angle (X)", () => {
  let randomTriangle = m.triangles[Math.floor(Math.random()*m.triangles.length)]

  randomTriangle.points[2].z = 80
  randomTriangle.points[1].z = 0
  randomTriangle.points[0].z = 0

  let [angleXDegree, angleYDegree] = m.generateXYDegrees(randomTriangle)

  expect(angleXDegree > 40 && angleXDegree < 50).toBe(true);
  expect(angleYDegree*-1).toBe(0);
  // expect(angleXDegree).toBe(45);
})

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

