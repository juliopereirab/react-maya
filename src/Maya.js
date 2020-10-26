import React, { useEffect, useMemo } from 'react';
import {useTick} from "./UseTick"
import {MayaCreator} from "./MayaCreator"



export function Maya({width, height, triangleWidth=100, color={red:175, green:50, blue:255}, brightness=0.50}){

    const index = useTick(60, 0);
    
    const m = useMemo(() => {
      return new MayaCreator(triangleWidth, width, height, color, brightness);
  }, [])
  
    useEffect(() => {
      if(index % 50 === 0){
        m.randomDirection();
      }
    }, [index])
  
    let content = m.getNewNodes(m.direction)
  
    return <svg width={width} height={height} style={{backgroundColor: "#333"}} dangerouslySetInnerHTML={{__html: content}}></svg>
  }

