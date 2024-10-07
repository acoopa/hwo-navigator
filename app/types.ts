interface PlanetarySytemData {
    glat: number,       // galactic latitude
    glon: number,       // galactic longitude
    pl_name: string,    // planet name
    pl_orbsmax: number, // planet-star distance
    pl_rade: number,    // planetary radius
    st_rad: number,     // stellar radius
    sy_dist: number,    // system distance
}

interface PlanetarySytemObservabilityData {
    name: string,
    coordinates: [number, number],
    snr: number,
    characterizable: boolean,
}

interface DetailedSystemData extends PlanetarySytemData, PlanetarySytemObservabilityData {}

export type { DetailedSystemData, PlanetarySytemData, PlanetarySytemObservabilityData }
