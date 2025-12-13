import { ServiceTypeModel } from './service-type';
import { CityModel } from './city-type';

export interface ServiceModel {
  id: number;
  serviceType: ServiceTypeModel[];
  cityModel: CityModel[];

  idService_DB: number;
  idAsociate_DB: number;
  url_Img: String[];

  tags: string[];

  name: string;
  description: string;

  price: number;
}
