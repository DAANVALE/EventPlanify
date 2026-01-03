import { CityModel } from './city-type';
import { TerraceTypeModel } from './terrace-type';

export interface TerraceModel {
  id: number;
  terraceType: TerraceTypeModel[];
  cityModel: CityModel;

  idTerraceDB: number;
  idAsociateDB: number;
  url_Img: String[];

  tags: string[];

  name: string;
  description: string;

  price: number;
  place: string;
}
