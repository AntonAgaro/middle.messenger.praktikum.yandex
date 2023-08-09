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

  // Loop through the properties of the merged object
  for (const key of Object.keys(merged)) {
    // Check if the property is an object
    if (typeof merged[key] === 'object' && merged[key] !== null) {
      // If the property is an object, recursively merge the objects
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

// function isEqualObj(a: Record<string, any>, b: Record<string, any>): boolean {
//   // Код здесь
//   const isObject = (o: object) => o !== null && typeof o === 'object'
//
//   const keys1 = Object.keys(a)
//
//   for (const key of keys1) {
//     const val1 = a[key] as any
//     const val2 = b[key] as any
//     const areObjects = isObject(val1) && isObject(val2)
//     if ((areObjects && !isEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
//       return false
//     }
//   }
//   return true
// }

// type StringIndexed = Record<string, any>
// function queryStringify(data: StringIndexed): string | never {
//   if (data !== null && typeof data !== 'object') {
//     throw new Error('input must be an object')
//   }
//   const getPairs = (obj: Record<string, any>, keys: string[] = []) =>
//     Object.entries(obj).reduce((pairs: Record<string, any>[], [key, value]) => {
//       if (typeof value === 'object') {
//         pairs.push(...getPairs(value, [...keys, key]))
//       } else {
//         pairs.push([[...keys, key], value])
//       }
//       return pairs
//     }, [])
//   let res = ''
//   Object.keys(data).forEach((i, idx, arr) => {
//     const value = data[i]
//     if (value !== null && typeof value === 'object') {
//       if (Array.isArray(value)) {
//         const serviceStr = value.map((el, index) => `${i}[${index}]=${el}`).join('&')
//         res += serviceStr + (idx === arr.length - 1 ? '' : '&')
//       } else {
//         const x = getPairs(data[i]).map(
//           ([[key0, ...keysRest], val]) => `${i}[${key0}]${keysRest.map((a: string) => `[${a}]`).join('')}=${val}`,
//         )
//         console.log(x)
//         res += x + (idx === arr.length - 1 ? '' : '&')
//       }
//     } else if (value) {
//       res = `${res + i}=${value.toString()}${idx === arr.length - 1 ? '' : '&'}`
//     }
//   })
//   return res
// }
