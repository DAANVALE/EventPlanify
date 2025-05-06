export interface CityTypeModel{
  id: number;
  kind: string;
  killed?: boolean;
}

export interface CityTypeModelIcon extends CityTypeModel{
  icon: string;
}

