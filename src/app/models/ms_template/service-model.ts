import { ServiceTypeModel } from './service-type';
import { CityModel } from './city-type';

export interface ServiceModel {
  id: number;
  serviceType: ServiceTypeModel[];
  cityModel: CityModel[];

  idServiceDB: number;
  idAsociateDB: number;
  url_Img: String[];

  tags: string[];

  name: string;
  description: string;

  price: number;
}
