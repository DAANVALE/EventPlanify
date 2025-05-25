import { CityModel } from "./city-type";
import { EventTypeModel } from "./event-type";
import { ServiceTypeModel } from "./service-type";
import { TerraceTypeModel } from "./terraceType";

export interface TemplateModel{
  id: number;
  eventType: EventTypeModel;
  terraceTypeModel: TerraceTypeModel
  cityModel: CityModel;
  serviceTypeModel: ServiceTypeModel[];

  name: string;
  description?: string;
}
