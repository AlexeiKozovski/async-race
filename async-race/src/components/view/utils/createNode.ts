export function createNode(classList: string, element = 'div'): HTMLElement {
  const node = document.createElement(element) as HTMLElement;
  node.className = classList;
  return node;
}