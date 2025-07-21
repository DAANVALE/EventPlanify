export interface AsociateServiceModel{
  id: number;
  idUser: number;

  name: string;
  mail: string;
  phone: string;

  killed?: boolean;
}
