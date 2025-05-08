export interface ServiceTypeModel {
  id: number;
  kind: string;
  killed?: boolean;
}

export interface IconServiceType extends ServiceTypeModel{
  icon: string;
}
