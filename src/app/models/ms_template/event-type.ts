export interface EventTypeModel{
  id: number;
  kind: string;
  killed?: boolean;
}

export interface EventTypeIcon extends EventTypeModel{
  icon: string;
}

