import { RaceApi } from '../../api/api';
import { IQueryParam } from '../../interfaces/IQueryParam';
import { createCar } from '../car/car';
import { createNode } from '../utils/createNode';

const CAR_LIMIT = 7;

export class Garage {
  constructor(
    private container: HTMLElement, 
    private api: RaceApi, 
    private pageNumber: number = 1,
  ) {}

  createControlGarage(): void {
    const controlContainer = createNode('control-garage');
    controlContainer.innerHTML = `
    <div class="input-group">
      <input class="form-control input-text" type="text" id="model-car" 
      name="model-car" placeholder="Input model">
      <input class="form-control input-color" type="color" id="color-car" 
      name="color-car" value="#ffffff">
      <input class="btn btn-gray" type="submit" 
      value="Create" id="create-car">
    </div>
    <div class="input-group mb-3">
      <input class="form-control update-car input-text" 
      type="text" id="update-model-car" 
      name="update-model-car" placeholder="Update model" disabled>
      <input class="form-control update-car input-color" 
      type="color" id="update-color-car" 
      name="update-color-car" value="#ffffff" disabled>
      <input class="btn btn-gray update-car" 
      type="submit" id="update-car" value="Update" disabled>
    </div>
    <div class="input-group mb-3">
      <button class="btn" id="race">Race</button>
      <button class="btn btn-red" id="reset" disabled>Reset</button>
      <button class="btn btn-gray" id="generate">Generate cars</button>
    </div>
    `;
    this.container.prepend(controlContainer);
  }

  async renderCars(): Promise<void> {
    const QUERY_PARAMS: IQueryParam[] = [
      { name: '_page', value: this.pageNumber },
      { name: '_limit', value: CAR_LIMIT },
    ];
    const cars = await this.api.getCars(QUERY_PARAMS);
    const carCount = this.container
      .querySelector('span[data-id="total-count"]') as HTMLElement;
    carCount.textContent = `${cars?.count}`;
    const carPage = this.container
      .querySelector('span[data-id="page"]') as HTMLElement;
    carPage.textContent = `#${this.pageNumber}`;
    const carsContainer = this.container
      .querySelector('.content') as HTMLElement;
    carsContainer.innerHTML = '';

    cars?.items.forEach((car) => carsContainer.append(createCar(car)));
  }
}