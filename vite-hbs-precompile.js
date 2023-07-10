import Handlebars from 'handlebars'
export default function handlebarsPlugin() {
  const fileRegExp = /\.hbs$|\.handlebars$/

  return {
    name: 'vite-hbs-precompile',
    transform(src, id) {
      if (!fileRegExp.test(id)) {
        return
      }
      //language=javascript
      const code = `
        import Handlebars from 'handlebars/runtime';
        export default Handlebars.template(${Handlebars.precompile(src)})
      `

      return {
        code,
      }
    },
  }
}
