'use client'
 
import React from 'react'

const Controls = ({
    diameter,
    handleDiameterChange,
    snrFilter,
    toggleSnrFilter,
    characterizableFilter,
    toggleCharacterizableFilter,
}: {
    diameter: number,
    handleDiameterChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    snrFilter: boolean,
    toggleSnrFilter: (event: React.ChangeEvent<HTMLInputElement>) => void,
    characterizableFilter: boolean,
    toggleCharacterizableFilter: (event: React.ChangeEvent<HTMLInputElement>) => void,
}) => {
  return (
    <div className='m-10'>
        <div>
            <label htmlFor="diameter">Diameter = {diameter}</label>
            <input id="diameter" type="range" min="5" max="15" defaultValue={diameter} onChange={handleDiameterChange}/>
        </div>
        <fieldset>
            <legend>Filters</legend>

            <label htmlFor="snr-filter">SNR &gt; 5:</label>
            <input id="snr-filter" type='checkbox' checked={snrFilter} onChange={toggleSnrFilter}/>

            <label htmlFor="characterizable-filter">Characterizable:</label>
            <input id="characterizable-filter" type='checkbox'  checked={characterizableFilter} onChange={toggleCharacterizableFilter}/>
        </fieldset>
    </div>
  )
}

export default Controls;
