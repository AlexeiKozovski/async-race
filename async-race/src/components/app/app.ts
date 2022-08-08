import { RaceApi } from '../api/api';
import { AppView } from '../view/appView';

export class App {
  appView: AppView;

  constructor(
    carContainer: HTMLElement,
    api: RaceApi,
    winnersContainer: HTMLElement,
  ) {
    this.appView = new AppView(carContainer, api, winnersContainer);
  }

  start(): void {
    this.appView.renderView();
    this.appView.addHandlers();
  }
}