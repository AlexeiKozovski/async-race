import { ICar } from '../../interfaces/ICar';
import { createNode } from '../utils/createNode';
import { setColorCarImage } from './carImage';

export function createCar(car: ICar): HTMLElement {
  const newCar = createNode('car-block');
  newCar.dataset.car = `${car.id}`;
  newCar.innerHTML = `
  <div class="control">
    <button class="btn btn-gray" data-id="select-car" 
    data-color="${car.color}" data-car="${car.id}">Select</button>
    <button class="btn btn-gray" 
    data-id="remove-car" data-car="${car.id}">Remove</button>
    <p class="name">${car.name}</p>
  </div>
  <div class="wrapper-track">
    <div class="engine">
      <button class="btn" data-id="start-engine" data-car="${car.id}">A</button>
      <button class="btn btn-red" data-id="stop-engine" data-car="${car.id}" disabled>B</button>
    </div>
    <div class="race-track">
      ${setColorCarImage(car.color as string)}
    </div>
  </div>
  `;
  return newCar;
}
