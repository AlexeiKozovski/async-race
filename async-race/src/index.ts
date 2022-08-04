import './style.css';
import { renderLayout } from './components/view/layout/layout';
import { App } from './components/app/app';
import { RaceApi } from './components/api/api';

renderLayout();

const garageContainer = document.querySelector('.garage-view') as HTMLElement;

const API_HOST = 'http://127.0.0.1:3000';
const API_GARAGE_URL = 'garage';
const API_WINNERS_URL = 'winners';
const API_ENGINE_URL = 'engine';
const api = new RaceApi(API_HOST, API_GARAGE_URL, API_WINNERS_URL, API_ENGINE_URL);

const app = new App(garageContainer, api);

app.start();