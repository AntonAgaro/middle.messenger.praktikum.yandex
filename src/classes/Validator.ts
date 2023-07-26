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
    console.log(input)
    return input.value.length !== 0
  }
}
