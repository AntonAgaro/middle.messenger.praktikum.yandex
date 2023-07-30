import type Component from '../classes/Component'

export function render(rootSelector: string, component: Component): void {
  const root = document.querySelector(rootSelector)
  if (!root) {
    return
  }
  root.appendChild(component.getContent() as HTMLElement)
  component.dispatchComponentDidMount()
}
