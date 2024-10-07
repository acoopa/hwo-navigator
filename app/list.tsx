'use client'
 
import React, { useEffect, useState } from 'react'

import { PlanetarySytemData, DetailedSystemData } from './types'
import Mollweide from './components/Mollweide'
import Controls from './components/controls';
import Detail from './components/detail';

const signalToNoiseForDiameter = (system: PlanetarySytemData, diameter: number): number => {
  const snr0 = 100;
  const result = snr0 * ((system.st_rad * system.pl_rade * (diameter/6)) / ((system.sy_dist/10)* system.pl_orbsmax))**2;
  return result;
}
  
const characterizableForDiameter = (system: PlanetarySytemData, diameter: number): boolean => {
  const limitingDistance = 15 * (diameter/6) / system.pl_orbsmax;
  const result = limitingDistance < system.sy_dist;
  return result;
}

const convertLon = (long: number): number => {
  if (long > 180) {
    return 360 - long;
  }
  return -long;
}

export default function List({
    data,
  }: {
    data: PlanetarySytemData[]
  }) {
  const [diameter, setDiameter] = useState(6);
  const [observabilityData, setObservabilityData] = useState<DetailedSystemData[]>(data.map((system) => {
    return {
      name: system.pl_name,
      coordinates: [convertLon(system.glon), system.glat],
      snr: signalToNoiseForDiameter(system, diameter),
      characterizable: characterizableForDiameter(system, diameter),
      ...system
    };
  }));
  const [snrFilter, setSnrFilter] = useState(true);
  const [characterizableFilter, setCharacterizableFilter] = useState(true);
  const [selectedSystem, setSelectedSystem] = useState<DetailedSystemData | null>(null)

  const updateObservability = () => {
    let obsData: DetailedSystemData[] = [];
    data.forEach((system) => {
      const snr = signalToNoiseForDiameter(system, diameter);
      const characterizable = characterizableForDiameter(system, diameter);
      obsData.push({
        name: system.pl_name,
        coordinates: [convertLon(system.glon), system.glat],
        snr,
        characterizable,
        ...system
      })
    });
    setObservabilityData(obsData);
  }

  const handleDiameterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiameter(parseFloat(event.target.value));
    updateObservability();
  }

  const toggleSnrFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSnrFilter(!snrFilter);
  }

  const toggleCharacterizableFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterizableFilter(!characterizableFilter);
  }

  const handlePlanetClick = (system: DetailedSystemData): void => {
    setSelectedSystem(system);
  }

  useEffect(() => {
    if (selectedSystem) {
      const updatedSystem = {...selectedSystem};
      updatedSystem.snr = signalToNoiseForDiameter(selectedSystem, diameter);
      updatedSystem.characterizable = characterizableForDiameter(selectedSystem, diameter);
      setSelectedSystem(updatedSystem);
    }
  }, [diameter])

  return (
    <div className='flex flex-col items-start'>
      <div className='flex items-center z-50'>
        <Detail system={selectedSystem} />
        <Controls
          diameter={diameter}
          handleDiameterChange={handleDiameterChange}
          snrFilter={snrFilter}
          toggleSnrFilter={toggleSnrFilter}
          characterizableFilter={characterizableFilter}
          toggleCharacterizableFilter={toggleCharacterizableFilter}
        />
      </div>
      <Mollweide
        data={observabilityData}
        snrFilter={snrFilter}
        characterizableFilter={characterizableFilter}
        handlePlanetClick={handlePlanetClick}
      />
    </div>
  )
}
