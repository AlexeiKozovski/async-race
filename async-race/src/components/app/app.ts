import { RaceApi } from '../api/api';
import { AppView } from '../view/appView';

export class App {
  appView: AppView;

  constructor(
    carContainer: HTMLElement,
    api: RaceApi,
  ) {
    this.appView = new AppView(carContainer, api);
  }

  start(): void {
    this.appView.renderView();
    this.appView.addHandlers();
  }
}