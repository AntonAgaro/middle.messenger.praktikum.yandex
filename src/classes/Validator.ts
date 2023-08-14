import Component from './Component'

export default class Validator {
  static checkNames(input: HTMLInputElement): boolean {
    return /^[A-ZА-Я][a-zа-я|-]*$/.test(input.value)
  }

  static checkLogin(input: HTMLInputElement): boolean {
    return /^(?![\d+_@.]+$)[A-Za-z0-9-_]{3,20}$/.test(input.value)
  }

  static checkEmail(input: HTMLInputElement): boolean {
    return /^\S+[A-Za-z]+@.\S+$/.test(input.value)
  }

  static checkPass(input: HTMLInputElement): boolean {
    return /(?=.*[A-Z])(?=.*[0-9])\S{8,40}/.test(input.value)
  }

  static checkPhone(input: HTMLInputElement): boolean {
    return /^(\+?\d){10,15}$/.test(input.value)
  }

  static checkIsNotEmpty(input: HTMLInputElement): boolean {
    return input.value.length !== 0
  }

  static setErrorMessage(validateMethod: (input: HTMLInputElement) => boolean): string {
    switch (validateMethod) {
      case Validator.checkNames:
        return 'Только буквы, первая - заглавная!'
      case Validator.checkLogin:
        return 'Только английские буквы и цифры, 3-20 символов'
      case Validator.checkEmail:
        return 'Неверно введен email. Пример: example@gmail.com'
      case Validator.checkPass:
        return '8-40 символов, обязательно заглавная буква и цифра'
      case Validator.checkPhone:
        return 'Неверно введен номер. Пример, +7 (777) 232 13 13'
      case Validator.checkIsNotEmpty:
        return 'Поле не должно быть пустым'
      default:
        return 'Проверьте введенные данные'
    }
  }

  static validate(
    inputComponent: Component,
    validateMethod: (input: HTMLInputElement) => boolean,
    inputGroup: Component,
  ): boolean {
    const target = inputComponent.getContent() as HTMLInputElement
    // remove blur before rerender
    inputComponent.removeEvents()
    if (!validateMethod(target)) {
      inputGroup.setProps({
        error: Validator.setErrorMessage(validateMethod),
      })
      inputComponent.addEvents()
      return false
    }
    inputGroup.setProps({
      error: '',
    })
    inputComponent.addEvents()
    return true
  }
}
