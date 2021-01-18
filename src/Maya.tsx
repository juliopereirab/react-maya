import React, { useEffect, useMemo } from 'react';
import {useTick} from "./UseTick"
import {MayaCreator} from "./MayaCreator"

interface MayaProps {
  width: number;
  height: number;
  triangleWidth: number;
  color: {red: number, blue: number, green: number}, 
  brightness: number
  contrast: number
}

export function Maya({
  width, 
  height, 
  triangleWidth=70, 
  color={red:175, green:50, blue:255}, 
  brightness=0.50, 
  contrast=0.45}: MayaProps){

    const index = useTick(60, 0);
    
    const m = useMemo(() => {
      return new MayaCreator(triangleWidth, width, height, color, brightness, contrast);
  }, [])
  
    useEffect(() => {
      if(index % 50 === 0){
        m.randomDirection();
      }
    }, [index])
  
    let content = m.getNewNodes()
  
    return <svg width={width} height={height} style={{backgroundColor: "#333"}} dangerouslySetInnerHTML={{__html: content}}></svg>
  }

