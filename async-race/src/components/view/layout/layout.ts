import { createDivBlock } from '../utils/createDivBlock';
import { createNode } from '../utils/createNode';
import { addNavigationHandler } from './navigationHandler';

function createHeader(container: HTMLElement): void {
  const header = document.createElement('header');
  header.innerHTML = `
  <nav class="navbar container">
    <button class="btn data-page="garage" id="btn-garage">GARAGE</button>
    <button class="btn data-page="winners" id="btn-winners">WINNERS</button>
  </nav>
  `;
  container.prepend(header);
}

function createMain(container: HTMLElement): void {
  const main = createNode('container', 'main');
  main.innerHTML = `
  <section class="garage-view"></section>
  <section class="winners-view hide"></section>
  `;

  const garage = main.querySelector('.garage-view') as HTMLElement;
  garage.append(createDivBlock('cars-container', 'Garage'));

  const winners = main.querySelector('.winners-view') as HTMLElement;
  winners.append(createDivBlock('winners-container', 'Winners'));

  container.append(main);
}

export function renderLayout() {
  const BODY = document.querySelector('body') as HTMLBodyElement;
  
  createHeader(BODY);
  createMain(BODY);
  addNavigationHandler(BODY);
}