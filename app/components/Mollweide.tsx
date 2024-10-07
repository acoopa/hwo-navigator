"use client"
import React, { useEffect } from 'react';
import * as d3 from 'd3';
import * as d3Geo from 'd3-geo';
import { geoMollweide } from 'd3-geo-projection';
import Image from 'next/image';
import { DetailedSystemData } from '../types';

const PROJECTION_WIDTH = 1500;
const PROJECTION_HEIGHT = 772;

const Mollweide = ({
  data,
  snrFilter,
  characterizableFilter,
  handlePlanetClick,
}: {
  data: DetailedSystemData[],
  snrFilter: boolean,
  characterizableFilter: boolean,
  handlePlanetClick: (system: DetailedSystemData) => void
}) => {

  const getPointStyle = (system: DetailedSystemData): string => {
    if (system.snr > 5) {
      return system.characterizable ? "fill-[#0d0]" : "fill-[#e0e]";
    }
    return system.characterizable ? "fill-[#85f]" : "fill-white";
  }

  useEffect(() => {

    const projection = geoMollweide()
      .scale(250)
      .translate([PROJECTION_WIDTH/2, PROJECTION_HEIGHT/2])
      .precision(.1);

    const path = d3Geo.geoPath().projection(projection).pointRadius(2);
    const graticule = d3.geoGraticule();

    d3.select("#mollweide").select("svg").remove();

    const svg = d3.select("#mollweide")
      .append("svg")
      .attr("width", PROJECTION_WIDTH)
      .attr("height", PROJECTION_HEIGHT);

    svg.append("defs").append("path").datum({type: "Sphere"}).attr("id", "sphere").attr("d", path);
    svg.append("use").attr("class", "fill-none stroke-white stroke-[0.5px]").attr("xlink:href", "#sphere");
    svg.append("path").datum(graticule).attr("class", "fill-none stroke-white stroke-[0.1px]").attr("d", path);

    const viewport = d3.select("#galactic-viewport")

    const handleZoom = (event) => {
      const {x, y, k} = {...event.transform};
      const transform = `transform: translate(0,0) scale(${k});`;
      viewport.style("transform", "translate(" + x/2 + "px," + y/2 + "px) scale(" + k + ")");
      viewport.style("transform-origin", "0 0");
    }

    const zoom = d3.zoom()
      .scaleExtent([1,10])
      .translateExtent(([[0,0], [PROJECTION_WIDTH, PROJECTION_HEIGHT]]))
      .on("zoom", handleZoom);
    
    viewport.call(zoom);

    data.forEach(system => {
      svg.append("path")
      .datum({type: "Point", coordinates: system.coordinates})
      .attr("id", system.name.replace(/[\s.]/g,"_"))
      .attr("class", getPointStyle(system))
      .attr("d", path)
      .on("click", (event) => {
        d3.select("#" +event.target.id)
          .attr('class', 'fill-[#f00]')
        handlePlanetClick(system)
      });
    })
    }, [data]);

    return (
      <div id="galactic-viewport" className='relative inline-block w-max'>
        <Image src="/milky_way.png" alt="" width={PROJECTION_WIDTH} height={PROJECTION_HEIGHT} />
        <div id="mollweide" className='absolute top-0 left-0'></div>
      </div>
    );
};

export default Mollweide;