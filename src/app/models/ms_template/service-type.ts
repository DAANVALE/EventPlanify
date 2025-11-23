export interface ServiceTypeModel {
  id: number;
  kind: string;
  killed?: number;
}

export interface IconServiceType extends ServiceTypeModel{
  icon: string;
}
