export function render(templateFunc, settings) {
  return templateFunc({ ...settings })
}
