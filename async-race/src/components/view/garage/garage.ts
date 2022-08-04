import { createNode } from '../utils/createNode';

export class Garage {
  container: HTMLElement;
  pageNumber: number;

  constructor(container: HTMLElement) {
    this.container = container;
    this.pageNumber = 1;
  }

  createControllGarage(): void {
    const controllContainer = createNode('controll-garage');
    controllContainer.innerHTML = `
    <div class="input-group">
      <input class="form-control input-text" type="text" id="model-car" 
      name="model-car" placeholder="Input model">
      <input class="form-control input-color" type="color" id="color-car" 
      name="color-car" value="#ffffff">
      <input class="btn btn-gray" type="submit" 
      value="Create" id="create-car">
    </div>
    <div class="input-group mb-3">
      <input class="form-control update-car input-text" 
      type="text" id="update-model-car" 
      name="update-model-car" placeholder="Update model" disabled>
      <input class="form-control update-car input-color" 
      type="color" id="update-color-car" 
      name="update-color-car" value="#ffffff" disabled>
      <input class="btn btn-gray update-car" 
      type="submit" id="update-car" value="Update" disabled>
    </div>
    <div class="input-group mb-3">
      <button class="btn" id="race">Race</button>
      <button class="btn btn-red" id="reset" disabled>Reset</button>
      <button class="btn btn-gray" id="generate">Generate cars</button>
    </div>
    `;
    this.container.prepend(controllContainer);
  }
}