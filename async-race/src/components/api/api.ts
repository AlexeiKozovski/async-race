import { ICar, ICarView } from '../interfaces/ICar';
import { ICarSpeedDistance } from '../interfaces/ICarSpeedDistance';
import { IDataParam } from '../interfaces/IDataParam';
import { IQueryParam } from '../interfaces/IQueryParam';
import { IRaceStatus } from '../interfaces/IRaceStatus';
import { IWinner } from '../interfaces/IWinner';
import { IWinnerView } from '../interfaces/IWinnerView';

type StatusValue = 'started' | 'stopped';

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
        queryParams.length ? `?${this.queryParamsToString(queryParams)}` : ''}`);
  
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

  async updateCar(id: number, body: ICar): Promise<ICar> {
    const response = await fetch(
      `${this.baseUrl}/${this.carsUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

    return response.json();
  }

  async deleteCar(id: number): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/${this.carsUrl}/${id}`, { 
        method: 'DELETE',
      });

    return response.json();
  }
  
  async startStopCarEngin(id: number, status: StatusValue): Promise<ICarSpeedDistance | void> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.engineUrl}?id=${id}&status=${status}`, { 
          method: 'PATCH', 
        },
      );
    
      return await response.json();
    } catch (error) {
      console.warn(error as Error);
    }
  }

  async switchCarEngineDriveMode(id: number): Promise<IRaceStatus | void> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.engineUrl}?id=${id}&status=drive`, { 
          method: 'PATCH', 
        },
      );
      
      return await response.json();
    } catch (error) {
      console.warn(error as Error);
    }
  }

  async getWinners(queryParams: IQueryParam[] = []): Promise<IWinnerView | void> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.winnersUrl}${
        queryParams.length ? `?${this.queryParamsToString(queryParams)}` : ''}`);

      return {
        items: await response.json(),
        count: Number(response.headers.get('X-Total-Count')),
      };
    } catch (error) {
      console.warn(error as Error);
    }
  }

  async getWinner(id: number): Promise<IWinner | void> {
    const response = await fetch(`${this.baseUrl}/${this.winnersUrl}/${id}`);

    return response.ok ? response.json() : this.errorHandler(response);
  }

  async createWinner(newWinner: IWinner): Promise<IWinner | void> {
    const response = await fetch(
      `${this.baseUrl}/${this.winnersUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWinner),
      });

    return response.ok ? response.json() : this.errorHandler(response);
  }

  async updateWinner(id: number, body: IDataParam): Promise<ICar> {
    const response = await fetch(
      `${this.baseUrl}/${this.winnersUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );

    return response.ok ? response.json() : this.errorHandler(response);
  }

  async deleteWinner(id: number): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/${this.winnersUrl}/${id}`, { 
        method: 'DELETE', 
      });
    
    return response.ok ? response.json() : this.errorHandler(response);
  }
}