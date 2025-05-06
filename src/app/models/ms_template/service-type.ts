export interface ServiceType{
  id: number;
  kind: string;
  killed?: boolean;
}

export interface IconServiceType extends ServiceType{
  icon: string;
}
