export function addNavigationHandler(container: HTMLElement) {
  const btnGarage = container.querySelector('#btn-garage') as HTMLElement;
  const btnWinners = container.querySelector('#btn-winners') as HTMLElement; 
  const garage = container.querySelector('.garage-view') as HTMLElement;
  const winners = container.querySelector('.winners-view') as HTMLElement;
  btnGarage.addEventListener('click', () =>{
    garage.classList.remove('hide');
    winners.classList.add('hide');
  });
  btnWinners.addEventListener('click', () =>{
    winners.classList.remove('hide');
    garage.classList.add('hide');
  });
}

export default addNavigationHandler;