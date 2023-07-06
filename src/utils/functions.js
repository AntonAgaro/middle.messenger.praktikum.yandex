import inputTmpl from '@components/input/input.hbs'

export function render(templateFunc, settings) {
  return templateFunc({ ...settings })
}

export function createFormInputs(inputsSettings, templateFunc) {
  let formInputs = ''
  inputsSettings.forEach((o) => {
    formInputs += render(templateFunc, o)
  })

  return formInputs
}
