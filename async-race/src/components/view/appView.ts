import { RaceApi } from '../api/api';
import { Garage } from './garage/garage';
import { Winners } from './winners/winners';

export class AppView {
  garage: Garage;

  winners: Winners;

  constructor(
    carContainer: HTMLElement,
    api: RaceApi,
    winnersContainer: HTMLElement,

  ) {
    this.garage = new Garage(carContainer, api);
    this.winners = new Winners(winnersContainer, api);
  }

  renderView(): void {

    try {
      this.garage.createControlGarage();
      this.garage.renderCars();
      this.winners.createWinnersTable();
      this.winners.renderWinners();
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
    this.garage.addAnimationCarHandler();
    this.garage.resetAnimationCarHandler();
    this.garage.addRaceHandler();
    this.garage.resetCarHandler();
    this.winners.addUpdateWinnersHandler();
    this.winners.addPaginationHandler();
    this.winners.addSortHandler();
  }

}