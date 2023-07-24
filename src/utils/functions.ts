// export function render(templateFunc, settings) {
//   return templateFunc({ ...settings })
// }

// export function createFormInputs(inputsSettings, templateFunc) {
//   let formInputs = ''
//   inputsSettings.forEach((o) => {
//     formInputs += render(templateFunc, o)
//   })
//
//   return formInputs
// }
import type Component from '../classes/Component'

export function render(rootSelector: string, component: Component): void {
  const root = document.querySelector(rootSelector)
  if (!root) {
    return
  }
  root.appendChild(component.getContent() as HTMLElement)
  component.dispatchComponentDidMount()
}
