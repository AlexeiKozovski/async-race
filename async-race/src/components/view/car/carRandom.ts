import { ICar } from '../../interfaces/ICar';
import { CAR_BRAND, CAR_MODEL } from './dataCar';

function getRandomNumber(num: number): number {
  return Math.floor(Math.random() * num);
}

function getRandomName(): string {
  return `
  ${CAR_BRAND[getRandomNumber(CAR_BRAND.length)]} 
  ${CAR_MODEL[getRandomNumber(CAR_MODEL.length)]}
  `;
}

function getRandomColor(): string {
  const COLOR_CHARS = '0123456789ABCDEF';
  const COUNT_COLOR_CHARS = 6;
  let color = '';

  for (let i = 0; i < COUNT_COLOR_CHARS; i += 1) {
    color += COLOR_CHARS[getRandomNumber(COLOR_CHARS.length)];
  }

  return color;
}

export function createRandomCar(): ICar {
  return {
    name: `${getRandomName()}`,
    color: `#${getRandomColor()}`,
  };
}

