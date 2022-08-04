export interface ICar{
  name: string;
  color: string;
  id?: number
}

export interface ICarView {
  items: ICar[];
  count: number;
}