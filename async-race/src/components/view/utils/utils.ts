export function setDisableValue(
  element: HTMLInputElement | HTMLButtonElement,
  value: boolean,
): void {
  element.disabled = value;
}