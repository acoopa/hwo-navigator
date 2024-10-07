'use client'
 
import React from 'react'
import { DetailedSystemData } from '../types';

const PlaceHolder = () => {
  return (
    <div className="p-6 max-w-sm h-[268px] mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
      <div className='text-black'>
        <div className="text-xl font-bold">Click a planet to view details!</div>
      </div>
    </div>
  )
}

const SystemDetails = ({
  system,
}: {
  system: DetailedSystemData
}) => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
      <div className='text-black'>
        <div className="text-xl font-bold">{system.name}</div>
        <ul>
          <li key='glat'>Galactic Latitude: {system.glat}</li>
          <li key='glon'>Galactic Longitude: {system.glon}</li>
          <li key='pl_orbsmax'>Planetary Orbital Max: {system.pl_orbsmax}</li>
          <li key='pl_rade'>Planetary Radius: {system.pl_rade}</li>
          <li key='st_rad'>Stellar Radius: {system.st_rad}</li>
          <li key='sy_dist'>System Distance: {system.sy_dist}</li>
          <li key='snr'>SNR: {system.snr}</li>
          <li key='characterizable'>Characterizable: {system.characterizable ? 'true' : 'false'}</li>
        </ul>
      </div>
    </div>
  )
};

const Detail = ({
  system,
}: {
  system: DetailedSystemData | null
}) => {
  return system ? <SystemDetails system={system} /> : <PlaceHolder />;
};

export default Detail;