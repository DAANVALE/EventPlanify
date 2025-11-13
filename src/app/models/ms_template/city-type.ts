export interface CityModel{
  id: number;
  kind: string;
  killed?: number;
}

export interface CityModelIcon extends CityModel{
  icon: string;
}

