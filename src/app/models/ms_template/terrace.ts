import { CityModel } from './city-type';
import { TerraceTypeModel } from './terraceType';

export interface TerraceModel {
  id: number;
  terraceType: TerraceTypeModel[];
  cityModel: CityModel;

  idTerrace_DB: number;
  idAsociate_DB: number;
  URL_IMG: String;

  name: string;
  description: string;

  price: number;
  place: string;
}
