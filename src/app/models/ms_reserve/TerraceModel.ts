import { AsociateTerrace } from "./AsociateTerraceModel";

export interface TerraceModel{
  id: number;
  name: string;

  asociateTerrace: AsociateTerrace;

  baseSize: number;
  maxSize: number;
  basePrice: number;
  priceAdd10: number;

  direction: string;
  killed: number;
}
