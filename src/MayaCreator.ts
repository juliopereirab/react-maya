

export class Point {
    x: number 
    y: number
    z: number
    readonly baseX: number
    readonly baseY: number

    constructor (x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
        this.baseX = x
        this.baseY = y
    }
}

class Triangle{
    points: Point[]
    direction: string

    constructor (direction: string) {
        this.direction = direction
        this.points = []
    }
    setPoints(points: Point[]){
        this.points = points
    }
}

    
const meanDepth = (triangle: Point[]) => {
    let p1 = triangle[0].z > triangle[1].z ? triangle[0].z : triangle[1].z
    return p1 > triangle[2].z ? p1 : triangle[2].z
}

const range = (n: number) => Array.from(Array(n).keys());

function getRandomSubsection(array: any[], subsectionAmount: number){
    let indexes = range(array.length);
    return range(subsectionAmount).map(el => {
        let randomIndex = indexes[Math.floor(Math.random() * indexes.length)]
        indexes.splice(indexes.indexOf(randomIndex), 1);
        return array[randomIndex];
    })
}

type Color = {red: number, blue: number, green: number}

export class MayaCreator{
    totalHeight : number;
    totalWidth : number;
    pointWidth : number;
    tagList : string[];
    points : {[key: string]: Point}
    triangles: Triangle[]
    brightness: number;
    color: Color
    direction: boolean
    totalGap: number
    pointsToAlter: string[]
    baseDepth: number
    fraction: number
    totalDepth: number

    constructor(pointWidth: number, totalHeight: number, totalWidth: number, color: Color, brightness: number){
        this.totalHeight = totalHeight
        this.totalWidth = totalWidth
        this.pointWidth = pointWidth;
        this.totalDepth = 100
        this.baseDepth = this.totalDepth / 2
        this.totalGap = this.totalDepth * 0.05
        this.fraction = this.totalDepth * 0.001
        let {produceDuplicateKeys} = this
        this.tagList = [...produceDuplicateKeys(1), ...produceDuplicateKeys(2), ...produceDuplicateKeys(3)]
        this.points = this.generateCoordinates();
        this.triangles = this.generateTriangles();
        let keys = Object.keys(this.points)
        this.pointsToAlter = getRandomSubsection(keys, Math.floor(keys.length/2.5));
        this.direction = true
        this.color = color
        this.brightness = brightness
    }

    ProjectPoint = (point: Point, middleX: number, middleY: number) => {

        let newX = (point.baseX - middleX) * ((point.z/this.totalDepth)*2) + middleX
        let newY = (point.baseY - middleY) * ((point.z/this.totalDepth)*2) + middleY
    
        point.x = newX;
        point.y = newY;
    }

    randomDirection(){
        let keys = Object.keys(this.points)
        this.direction = Math.floor(Math.random()*2) === 0
        this.pointsToAlter = getRandomSubsection(keys, Math.floor(keys.length/3));
    }

    resetZValues(){
        let keys = Object.keys(this.points);
        for(let k of keys){
            this.points[k].z = 1
        }
    }

    generateXYDegrees(triangle: Triangle) {
        let t = triangle.points
        let top = triangle.direction === "right" ? 1 : 0;
        let down = triangle.direction === "right" ? 0 : 1;
        let side = 2

        let sideDepth = t[side].z
        let baseMidDepth = (t[down].z + t[top].z) / 2
        
        let xHeightDif = sideDepth - baseMidDepth 
        let yHeightDif = t[down].z - t[top].z 

        let triangleWidth = t[top].baseX > t[side].baseX ? t[top].baseX - t[side].baseX : t[side].baseX - t[top].baseX
        let triangleHeight = t[down].y - t[top].y 

        let angleXDegree = Math.sin(xHeightDif / triangleWidth) * (180 / Math.PI)
        let angleYDegree = Math.sin(yHeightDif / triangleHeight) * (180 / Math.PI)

        return [angleXDegree, angleYDegree]
    }

    generateShadowIndex(triangle: Triangle){
        let [angleXDegree, angleYDegree] = this.generateXYDegrees(triangle)
        return (angleXDegree + angleYDegree*3.5) / 10
    }

    produceDuplicateKeys(n: number){
        let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        return characters.split("").map(l => l.repeat(n));
    }

    generateCoordinates(){
        let {totalHeight, totalWidth, pointWidth} = this
        var numberOfRows = (totalHeight / pointWidth) + 1
        var numberOfPointsPerRow = (totalWidth / pointWidth) + 1
        let toInsert = {} as any
        for(let i=0; i<numberOfPointsPerRow; i++){
            for(let ii=0; ii<numberOfRows; ii++){
                let gap = ii % 2 == 0 ? pointWidth/1.4 : 0
                toInsert[this.tagList[i]+ii.toString()] = new Point(ii*pointWidth*1.2-(pointWidth*0.5), gap+i*pointWidth*1.5-pointWidth, this.baseDepth)
            }
        }
        return toInsert
    }

    generateTriangles(){
        let {points, pointWidth, totalHeight, totalWidth} = this
        let triangles = [] as Triangle[]
        var numberOfRows = (totalHeight / pointWidth) + 1
        var numberOfPointsPerRow = (totalWidth / pointWidth) + 1

        for(let i=0; i<numberOfRows; i++){
            for(let ii=0; ii<numberOfPointsPerRow; ii++){
                let newT = new Triangle("right");
                let newTInverse = new Triangle("left");
                if(i%2==0){
                    newT.setPoints([
                        points[`${this.tagList[ii]}${i}`], 
                        points[`${this.tagList[ii+1]}${i}`], 
                        points[`${this.tagList[ii+1]}${i+1}`]
                    ])
                    newTInverse.setPoints([
                        points[`${this.tagList[ii]}${i}`], 
                        points[`${this.tagList[ii-1]}${i}`], 
                        points[`${this.tagList[ii]}${i-1}`]
                    ])
                } else {
                    newT.setPoints([
                        points[`${this.tagList[ii]}${i}`], 
                        points[`${this.tagList[ii-1]}${i}`], 
                        points[`${this.tagList[ii-1]}${i-1}`]
                    ])
                    newTInverse.setPoints([
                        points[`${this.tagList[ii]}${i}`], 
                        points[`${this.tagList[ii+1]}${i}`], 
                        points[`${this.tagList[ii]}${i+1}`]
                    ])
                }
                triangles = [...triangles, newT, newTInverse];
            }
        }
        return triangles.filter(t => !t.points.some(p => !p))
    }

    alterPoint(tag: string){
            let top = this.baseDepth + (this.totalGap/2)
            let bottom = this.baseDepth - (this.totalGap/2)
            let resultingAmount = this.direction 
                ? this.points[tag].z + this.fraction
                :  this.points[tag].z - this.fraction

            this.points[tag].z = 
                resultingAmount >= top ? top 
                : resultingAmount <= bottom ? bottom
                : resultingAmount
    }

    alterZValues(){
        this.pointsToAlter.forEach(p => {
            this.alterPoint(p)
        })
    }

    getNewNodes(container?: any){
        // if(container)removeAllChildNodes(container)

        let toInsert = ""
        let {totalWidth, totalHeight} = this
        let widthHigher = totalWidth > totalHeight
        let higherSide = widthHigher ? totalWidth : totalHeight
        let centerCorrection = !widthHigher ? totalWidth / totalHeight : totalHeight / totalWidth 
        let dx = (higherSide / 2)* (widthHigher ? centerCorrection : 1)
        let dy = (higherSide / 2)* (widthHigher ? 1 : centerCorrection)

        this.alterZValues();

        this.pointsToAlter.forEach(k => {
            this.ProjectPoint(this.points[k], dx, dy)
        });

        let triangles = this.generateTriangles();

        triangles = triangles.sort((curr, next) => meanDepth(next.points) - meanDepth(curr.points))

        let {red, green, blue} = this.color
        let {brightness} = this
        let strokeColour = `rgba(${red*(brightness*1.4)}, ${green*(brightness*1.4)}, ${blue*(brightness*1.4)}, 0.3)`
        for(var triangle of triangles){
            let t = triangle.points
            let m = this.generateShadowIndex(triangle)
            toInsert += `<polygon points="${t[0].x},${t[0].y} ${t[1].x},${t[1].y} ${t[2].x},${t[2].y}" style="fill:rgb(${(red*brightness)+(red*brightness)*m}, ${(green*brightness)+(green*brightness)*m}, ${(blue*brightness)+(blue*brightness)*m});stroke:${strokeColour};stroke-width:1"" />`
        }
        // for(var k of Object.keys(this.points)){
        //     let p = this.points[k]
        //     toInsert += `<circle cx="${p.x}" cy="${p.y}" r="5" stroke="black" fill="green" /> `                                    
        //     // toInsert += `<text x="${p.x}" y="${p.y}" fill="red">${k}</text>`
        // }

        return toInsert
    }

    render(container: any){


        container.innerHTML = this.getNewNodes()
    }
}