import { ServiceTypeModel } from './service-type';
import { CityModel } from './city-type';

export interface ServiceModel {
  id: number;
  serviceType: ServiceTypeModel[];
  cityModel: CityModel[];

  idService_DB: number;
  idAsociate_DB: number;
  URL_IMG: String[];

  name: string;
  description: string;

  price: number;
}
