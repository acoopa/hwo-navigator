import { PlanetarySytemData } from './types'
import List from './list'

const EA_BASE_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync";
const EA_DATA_TABLE = "pscomppars";
const EA_DATA_FIELDS = ["glat", "glon", "pl_name", "pl_orbsmax", "pl_rade", "st_rad", "sy_dist"];

const getPlanetarySystemData = async (): Promise<PlanetarySytemData[]> => {
  const query = ["select", EA_DATA_FIELDS.join(","), "from", EA_DATA_TABLE].join("+");
  const url = `${EA_BASE_URL}?query=${query}&format=json`;
  const data = await fetch(url);
  return await data.json();
}

export default async function Page() {
  const data = await getPlanetarySystemData();
  // remove incomplete data
  const systems = data.filter(system => system.pl_orbsmax && system.pl_rade && system.st_rad && system.sy_dist);
  return <List data={systems} />
}
