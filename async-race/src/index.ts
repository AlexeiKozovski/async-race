import './style.css';
import { renderLayout } from './components/view/layout/layout';
import { App } from './components/app/app';

renderLayout();

const garageConteiner = document.querySelector('.garage-view') as HTMLElement;

const app = new App(garageConteiner);

app.start();