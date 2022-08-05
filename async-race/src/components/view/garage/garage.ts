import { RaceApi } from '../../api/api';
import { IQueryParam } from '../../interfaces/IQueryParam';
import { createCar } from '../car/car';
import { createRandomCar } from '../car/carRandom';
import { createNode } from '../utils/createNode';
import { isNextPaginationValue, isPrevPaginationValue, setDisableValue } from '../utils/utils';

const CAR_LIMIT = 7;
const SELECT_CAR_ID = 'select-car';
const REMOVE_CAR_ID = 'remove-car';
const CARS_GENERATE_VALUE = 100;

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
    const carCount = this.container.querySelector('span[data-id="total-count"]') as HTMLElement;
    carCount.textContent = `${cars?.count}`;
    const carPage = this.container.querySelector('span[data-id="page"]') as HTMLElement;
    carPage.textContent = `#${this.pageNumber}`;
    const carsContainer = this.container.querySelector('.content') as HTMLElement;
    carsContainer.innerHTML = '';

    cars?.items.forEach((car) => carsContainer.append(createCar(car)));
  }

  addCreateCarHandler(): void {
    const modelInput = this.container.querySelector('#model-car') as HTMLInputElement;
    const colorInput = this.container.querySelector('#color-car') as HTMLInputElement;
    const createBtn = this.container.querySelector('#create-car') as HTMLInputElement;

    createBtn.addEventListener('click', () => {
      if (modelInput.value && colorInput.value) {
        this.api.createCar({ name: modelInput.value, color: colorInput.value })
      };
      this.renderCars();
    })
  }

  addUpdateCarHandler(): void {
    const modelInput = this.container.querySelector('#update-model-car') as HTMLInputElement;
    const colorInput = this.container.querySelector('#update-color-car') as HTMLInputElement;
    const updateBtn = this.container.querySelector('#update-car') as HTMLInputElement;

    updateBtn.addEventListener('click', () => {
      const carId = Number(updateBtn.dataset.car as string);
      if (modelInput.value && colorInput.value && carId) {
        this.api.updateCar(carId, { name: modelInput.value, color: colorInput.value }); 
      };
      this.renderCars();
      modelInput.value = '';
      colorInput.value = '#ffffff';
      setDisableValue(modelInput, true);
      setDisableValue(colorInput, true);
      setDisableValue(updateBtn, true);
    })
  }

  addSelectCarHandler(): void {
    const modelInput = this.container.querySelector('#update-model-car') as HTMLInputElement;
    const colorInput = this.container.querySelector('#update-color-car') as HTMLInputElement;

    this.container.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.dataset.id === SELECT_CAR_ID) {
        const color = target.dataset.color as string;
        const name = (target.closest('.car-block') as HTMLElement).querySelector('.name') as HTMLElement;

        modelInput.value = name.textContent as string || '';
        colorInput.value = color || '#ffffff';
        
        const updateSubmit = this.container.querySelector('#update-car') as HTMLInputElement;
        updateSubmit.dataset.car = `${target.dataset.car}`;

        const updateElements = this.container.querySelectorAll('.update-car');
        updateElements.forEach((element) => {
          setDisableValue(element as HTMLInputElement, false);
        })
      }
    })
  }

  addRemoveCarHandler(): void {
    this.container.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.dataset.id === REMOVE_CAR_ID) {
        this.api.deleteCar(Number(target.dataset.car));                   
        this.renderCars();
      }
    })    
  }

  addGenerateCarsHandler() {
    const generateBtn = this.container.querySelector('#generate') as HTMLButtonElement;

    generateBtn.addEventListener('click', async () => {
      for (let i = 0; i < CARS_GENERATE_VALUE; i++) {
        await this.api.createCar(createRandomCar());
      }
      this.renderCars();
    })
  }

  addPaginationHandler(): void {
    const prevBtn = this.container.querySelector('button[data-id="prev-page"]') as HTMLButtonElement;
    const nextBtn = this.container.querySelector('button[data-id="next-page"]') as HTMLButtonElement;
    const countCars = this.container.querySelector('[data-id="total-count"]') as HTMLElement;
    const pagination = this.container.querySelector('.pagination') as HTMLElement;
  
    pagination.addEventListener('click', async (e: Event) => {
      const target = e.target as HTMLElement;
      if (target === prevBtn) {
        const prevValue = isPrevPaginationValue(
          prevBtn as HTMLButtonElement,
          nextBtn as HTMLButtonElement,
          this.pageNumber,
        );  
        this.pageNumber = prevValue;
      } else if (target === nextBtn) {
        const nextValue = isNextPaginationValue(
          prevBtn as HTMLButtonElement,
          nextBtn as HTMLButtonElement,
          this.pageNumber,
          Number(countCars.textContent),
        );  
        this.pageNumber = nextValue;
      }
      this.renderCars();
    })
  }




}