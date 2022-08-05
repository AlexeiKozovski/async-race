const CAR_ON_PAGE = 7;

export function setDisableValue(
  element: HTMLInputElement | HTMLButtonElement,
  value: boolean,
): void {
  element.disabled = value;
}

export function isPrevPaginationValue(
  prev: HTMLButtonElement,
  next: HTMLButtonElement,
  page: number,
): number {
  const result = page - 1;

  if(result === 1) setDisableValue(prev, true);
  setDisableValue(next, false);

  return result >= 1 ? result : page;
}

export function isNextPaginationValue(
  prev: HTMLButtonElement,
  next: HTMLButtonElement,
  page: number,
  count: number,
): number {
  const result = page + 1;
  if(result === Math.ceil(count / CAR_ON_PAGE)) setDisableValue(next, true);
  setDisableValue(prev, false);

  return result <= Math.ceil(count / CAR_ON_PAGE) ? result : page;
}