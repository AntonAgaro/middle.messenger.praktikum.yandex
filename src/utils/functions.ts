import type Component from '../classes/Component'

export function render(rootSelector: string, component: Component): void {
  const root = document.querySelector(rootSelector)
  if (!root) {
    return
  }
  root.appendChild(component.getContent() as HTMLElement)
  component.dispatchComponentDidMount()
}

export function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs
}

export function routeRender(selector: string, component: Component): Element | null {
  const root = document.querySelector(selector)
  if (!root) {
    return null
  }
  root.appendChild(component.getContent() as HTMLElement)
  return root
}
