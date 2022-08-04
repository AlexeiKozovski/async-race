import { Garage } from "./garage/garage";

export class AppView {
  garage: Garage;

  constructor(
    carContainer: HTMLElement,

  ) {
    this.garage = new Garage(carContainer);
  }

  renderView(): void {

    try {
      this.garage.createControlGarage();
    } catch (error) {
      console.error('Error');
    }
    
  }

}