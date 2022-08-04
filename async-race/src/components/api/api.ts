import { ICar, ICarView } from "../interfaces/ICar";
import { IQueryParam } from "../interfaces/IQueryParam";

export class RaceApi {
  constructor(
    private baseUrl: string,
    private carsUrl: string,
    private engineUrl: string,
    private winnersUrl: string,
  ) {}

  errorHandler(response: Response): void {
    console.error(`${response.status}: ${response.statusText}`);
  }

  queryParamsToString(queryParams: IQueryParam[]): string {
    return `${queryParams
      .map((query) => `${query.name}=${query.value}`).join('&')}`;
  }

  async getCars(queryParams: IQueryParam[] = []): Promise<ICarView | void> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.carsUrl}${
        queryParams.length ? `?${this.queryParamsToString(queryParams)}` : ''}`)
  
        return response.ok 
        ? {
        items: await response.json(),
        count: Number(response.headers.get('X-Total-Count')),
      }
      : this.errorHandler(response);
    } catch (error) {
      console.warn(error as Error);
    }
  }

  async getCar(id: number): Promise<ICar> {
    const response = await fetch(`${this.baseUrl}/${this.carsUrl}/${id}`);

    return response.json();
  }

  async createCar(newcar: ICar): Promise<ICar | void> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.carsUrl}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newcar),
        });

      return await response.json();
    } catch (error) {
      console.warn(error as Error);
    }
  }


}