export interface EventTypeModel{
  id: number;
  kind: string;
  killed?: number;
}

export interface EventTypeIcon extends EventTypeModel{
  icon: string;
}

