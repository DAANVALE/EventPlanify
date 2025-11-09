import { TerraceModel } from './TerraceModel';
import { ClientModel } from './ClientModel';
import { StateEventType } from './StateEventType';

export interface EventModel{
  id: number;

  clientModel: ClientModel
  terraceModel?: TerraceModel;
  stateEventType: StateEventType;

  // Address
  address: string;

  //Add (number people)
  sizePeople: number;
  dayDate: string;

  // payment order
  payment: string;
  sumPrice: number;
}


