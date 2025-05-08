export interface TerraceTypeModel {
  id: number;
  kind: string;
  killed?: boolean;
}

export interface TerraceTypeIcon extends TerraceTypeModel{
  icon: string;
}
