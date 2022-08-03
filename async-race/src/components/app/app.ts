import { AppView } from "../view/appView";

export class App {
  appView: AppView;

  constructor(
    carContainer: HTMLElement,
  ) {
    this.appView = new AppView(carContainer);
  }

  start(): void {
    this.appView.renderView();
  }
}