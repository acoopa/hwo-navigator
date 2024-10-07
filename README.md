# HWO-Navigator

## Credits

HWO-Navigator was originally developed for the [2024 NASA Space Apps Challenge](https://www.spaceappschallenge.org/nasa-space-apps-2024/). It was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). HWO-Navigator relies on open data from the [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/) and includes a background image modified from [Milky Way infrared.jpg](https://commons.wikimedia.org/wiki/File:Milky_Way_infrared.jpg) in the public domain. The image was modified using the free and open source image editor [GIMP](https://www.gimp.org/).

## Overview

HWO-Navigator is an interactive map of exoplanet candidates that allows users to explore the potential impact on the ability of the future Habitable Worlds Observatory (HWO) to observe exoplanets as a function of telescope diameter. By allowing users to explore this critical design parameter, HWO-Navigator provides NASA stakeholders with valuable data when planning the HWO project and allows researches to better identify potential candidates for study.

## How it Works

HWO-Navigator is a single-page [Next.js](https://nextjs.org/) application leveraging [D3.js](https://d3js.org/) visualization capabilities. On first load, the application makes a single API call to retrieve data from the [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/). The exoplanet locations are then mapped onto a Mollweide projection using the galactic coordinate system. Exoplanets are plotted using different colors to indicate whether the exceed a given signal-to-noise ratio (SNR) and whether the planet can be characterized by HWO for a given telescope diameter. Users can observe the impact on HWO's ability to observe these planets by adjusting the diameter or varying the filters. Users can also click on the planet's location to view more details about it, including its SNR and characterizability in the current state.

## Running Locally
Requires [Node.js](https://nodejs.org/) version > 22.9.0

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Navigate to [http://localhost:3000](http://localhost:3000) with your browser to see the result.
