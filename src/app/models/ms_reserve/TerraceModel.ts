import { AsociateTerraceModel } from "./AsociateTerraceModel";

export interface TerraceModel{
  id: number;
  name: string;

  asociateTerraceMode: AsociateTerraceModel;

  baseSize: number;
  maxSize: number;
  priceAdd10: number;

  direction: string;
  killed: boolean;
}
