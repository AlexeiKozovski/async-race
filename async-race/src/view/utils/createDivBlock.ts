export function createDivBlock(classList: string, title: string): HTMLDivElement {
  const div = document.createElement('div');
  div.className = `${classList}`;
  div.innerHTML = `
  <h2 class="title">${title} (<span data-id="total-count"></span>)</h2>
  <h3 class="page">Page <span data-id="page"></span></h3>
  <div class="content"></div>
  <div class="pagination d-flex justify-content-start mb-2">
    <button class="btn btn-nav" 
    data-id="prev-page" disabled>Prev</button>
    <button class="btn btn-nav" data-id="next-page">Next</button>
  </div>  
  `;
  return div;
}