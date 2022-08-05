import { RaceApi } from '../api/api';
import { Garage } from './garage/garage';

export class AppView {
  garage: Garage;

  constructor(
    carContainer: HTMLElement,
    api: RaceApi,

  ) {
    this.garage = new Garage(carContainer, api);
  }

  renderView(): void {

    try {
      this.garage.createControlGarage();
      this.garage.renderCars();
    } catch (error) {
      console.error('Error');
    }
    
  }

  addHandlers(): void {
    this.garage.addCreateCarHandler();
    this.garage.addUpdateCarHandler();
    this.garage.addSelectCarHandler();
    this.garage.addRemoveCarHandler();
    this.garage.addGenerateCarsHandler();
    this.garage.addPaginationHandler();
  }

}