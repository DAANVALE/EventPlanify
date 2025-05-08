export interface CityModel{
  id: number;
  kind: string;
  killed?: boolean;
}

export interface CityModelIcon extends CityModel{
  icon: string;
}

