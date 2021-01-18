# react-maya

This project intends to produce dynamic 3d patterns, initially with a aesthetic purpose. So far only an hexagonal pattern has been implemented. This package is compatible with Typescript

To use: 

install on npm: 
    npm install react-maya --save-dev

to use with React: 
    import { Maya } from "react-maya"

    <Maya height={500} width={500} contrast={0.4}/>

Arguments: 
- width (number, required).
- height (number, required).
- triangleSize (number): set the width of each of the triangles that form the maya.
- color (object): pass a plain object with values red, green and blue from 0 to 255 (rbg).
- contrast: alters contrast and brightness of the maya. 

