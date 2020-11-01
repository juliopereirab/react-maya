

class Point {
    x: number 
    y: number
    z: number
    baseX: number
    baseY: number

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

    
const ProjectPoint = (point: Point, middleX: number, middleY: number) => {

    let newX = (point.baseX - middleX) * point.z + middleX
    let newY = (point.baseY - middleY) * point.z + middleY

    point.x = newX;
    point.y = newY;
}

const meanDepth = (triangle: Point[]) => {
    let p1 = triangle[0].z > triangle[1].z ? triangle[0].z : triangle[1].z
    return p1 > triangle[2].z ? p1 : triangle[2].z
}
    
function getRandomSubsection(array: any[], subsectionAmount: number){
    let indexes = Array.from(Array(array.length).keys());
    for(let i=0; i < array.length - subsectionAmount; i++){
    let randomIndex = Math.ceil(Math.random() * array.length) -1
    indexes.splice(randomIndex, 1);
    }
    return indexes.map(i => array[i]).slice(0, subsectionAmount);
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

    constructor(pointWidth: number, totalHeight: number, totalWidth: number, color: Color, brightness: number){
        this.totalHeight = totalHeight
        this.totalWidth = totalWidth
        this.pointWidth = pointWidth;
        let {produceDuplicateKeys} = this
        this.tagList = [...produceDuplicateKeys(1), ...produceDuplicateKeys(2), ...produceDuplicateKeys(3)]
        this.points = this.generateCoordinates();
        this.triangles = this.generateTriangles();
        let keys = Object.keys(this.points)
        this.pointsToAlter = getRandomSubsection(keys, Math.floor(keys.length/2.5));
        this.direction = true
        this.totalGap = 0.1
        this.color = color
        this.brightness = brightness

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

    generateShadowIndex(triangle: Triangle) {
        let halfGap = this.totalGap / 2
        let t = triangle.points
        let top = triangle.direction === "right" ? 1 : 0;
        let down = triangle.direction === "right" ? 0 : 1;
        let side = 2
        let angleY = (t[down].z - t[top].z + halfGap)/this.totalGap
        let angleX = (t[side].z - ((t[top].z + t[down].z) / 2) + halfGap)/this.totalGap
        return (angleY + angleX) / 2
    }

    produceDuplicateKeys(n: number){
        let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        return characters.split("").map(l => l.repeat(n));
    }

    generateCoordinates(){
        let {totalHeight, totalWidth, pointWidth} = this
        var numberOfRows = totalHeight / pointWidth
        var numberOfPointsPerRow = totalWidth / pointWidth
        let toInsert = {} as any
        for(let i=0; i<numberOfRows; i++){
            for(let ii=0; ii<numberOfPointsPerRow; ii++){
                let gap = ii % 2 == 0 ? pointWidth/1.4 : 0
                toInsert[this.tagList[i]+ii.toString()] = new Point(ii*pointWidth*1.2, gap+i*pointWidth*1.5-pointWidth, 1)
            }
        }
        return toInsert
    }

    generateTriangles(){
        let {points, pointWidth} = this
        let triangles = [] as Triangle[]
        var numberOfRows = this.totalHeight / pointWidth
        var numberOfPointsPerRow = this.totalWidth / pointWidth

        for(let i=0; i<numberOfPointsPerRow; i++){
            for(let ii=0; ii<numberOfRows; ii++){
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

    alterPoint(tag: string, direction: boolean, fraction?: number){
            let r = this.totalGap / (fraction || 20)
            let resultingAmount = direction 
                ? this.points[tag].z + this.points[tag].z*r  
                :  this.points[tag].z - this.points[tag].z*r

            let top = 1 + this.totalGap / 2
            let bottom = 1 - this.totalGap / 2

            this.points[tag].z = 
                resultingAmount >= top ? top 
                : resultingAmount <= bottom ? bottom
                : resultingAmount
    }

    // setPointArea(direction: boolean){
    //     // let selectedPoints = getRandomSubsection(Object.keys(this.points), 20);
    //     let selectedPoints = ["d8", "e4", "h4", "g7"]
    //     let radio = 3
    //     // console.log(this.points["d15"], this.points["s50"])
    //     for(let p of selectedPoints){
    //         let d2 = p === "g7" ? Math.floor(Math.random()*2) === 0 : direction 
    //         let m = p.match(/[0-9]+/)
    //         let n = parseInt(m && m[0])
    //         let letterPosition = this.tagList.indexOf(p.replace(m[0], ""))
    //         let consideredLetters = this.tagList.slice(letterPosition - radio, letterPosition+radio+1)
    //         let consideredNumbers = Array.from(Array(n+radio+1).keys()).slice(n - radio, n+radio+1)   
    //         for(let il in consideredLetters){
    //             let letter = consideredLetters[il]
    //             let difL = il > letterPosition ? il - letterPosition : letterPosition - il;
    //             for(let inum in consideredNumbers){
    //                 let num = consideredNumbers[inum]
    //                 let difN = inum > n ? inum - n : n - il;
    //                 // console.log(`${letter}${num}`)
    //                 this.alterPoint(`${letter}${num}`, d2, 1+difN+difL)
    //             }
    //         }
    //     }
    // }

    alterZValues(direction: boolean){
        this.pointsToAlter.forEach(p => {
            this.alterPoint(p, direction)
        })
    }

    getNewNodes(direction: boolean){
        // removeAllChildNodes(container)

        let toInsert = ""
        let dx = this.totalWidth / 2
        let dy = this.totalHeight / 2

        this.alterZValues(direction);
        // this.setPointArea(direction);

        this.pointsToAlter.forEach(k => {
            ProjectPoint(this.points[k], dx, dy)
        });

        let triangles = this.generateTriangles();

        triangles = triangles.sort((curr, next) => meanDepth(next.points) - meanDepth(curr.points))

        let {red, green, blue} = this.color
        let {brightness} = this
        for(var triangle of triangles){
            let t = triangle.points
            let m = this.generateShadowIndex(triangle)
            toInsert += `<polygon points="${t[0].x},${t[0].y} ${t[1].x},${t[1].y} ${t[2].x},${t[2].y}" style="fill:rgb(${(red*brightness)+(red*brightness)*m}, ${(green*brightness)+(green*brightness)*m}, ${(blue*brightness)+(blue*brightness)*m});stroke:black;stroke-width:1"" />`
        }
        // for(var k of this.pointsToAlter){
        //     let p = m.points[k]
        //     toInsert += `<circle cx="${p.x}" cy="${p.y}" r="5" stroke="black" fill="green" /> `                        
        //     // toInsert += `<text x="${p.x}" y="${p.y}" fill="red">${k}</text>`
        // }
        return toInsert
    }

    render(container: any, direction: boolean){


        container.innerHTML = this.getNewNodes(direction)
    }
}