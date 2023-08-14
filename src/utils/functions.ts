import type Component from '../classes/Component'
import { Indexed } from '../types/Indexed'

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

export function trimAny(string: string, chars?: string): string {
  if (string && !chars) {
    return string.trim()
  }

  const reg = new RegExp(`[${chars}]`, 'gi')
  return string.replace(reg, '')
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const merged = {
    ...lhs,
    ...rhs,
  }

  for (const key of Object.keys(merged)) {
    if (typeof merged[key] === 'object' && merged[key] !== null) {
      merged[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed)
    }
  }

  return merged
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  const keys = path.split('.')
  let current = object as Indexed
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!current[key]) {
      current[key] = {}
    }
    current = current[key] as Indexed
  }
  current[keys[keys.length - 1]] = value
  return object
}
