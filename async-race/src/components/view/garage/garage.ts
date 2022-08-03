export class Garage {
  container: HTMLElement;
  pageNumber: number;

  constructor(container: HTMLElement) {
    this.container = container;
    this.pageNumber = 1;
  }

  createControllGarage(): void {
    const controllContainer = document.createElement('div') as HTMLElement;
    controllContainer.classList.add('controll-garage');
    controllContainer.innerHTML = `
    <div class="input-group">
      <input class="form-control input-text" type="text" id="model-car" 
      name="model-car" placeholder="Input model">
      <input class="form-control input-color" type="color" id="color-car" 
      name="color-car" value="#ffffff">
      <input class="btn" type="submit" 
      value="Create" id="create-car">
    </div>
    <div class="input-group mb-3">
      <input class="form-control update-car input-text" 
      type="text" id="update-model-car" 
      name="update-model-car" placeholder="Update model" disabled>
      <input class="form-control update-car input-color" 
      type="color" id="update-color-car" 
      name="update-color-car" value="#ffffff" disabled>
      <input class="btn btn-secondary update-car" 
      type="submit" id="update-car" value="Update" disabled>
    </div>
    <div class="input-group mb-3">
      <button class="btn btn-success me-2" id="race">Race</button>
      <button class="btn btn-danger me-2" id="reset" disabled>Reset</button>
      <button class="btn btn-secondary" id="generate">Generate cars</button>
    </div>
    `;
    this.container.prepend(controllContainer);
  }
}