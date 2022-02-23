const files = require.context('.', false, /\.json$/)
const modules = {}

files.keys().forEach(key => {
  const tmpKey = key.replace(/(\.\/|\.json)/g, '')
  modules[tmpKey] = files(key)
})

export default modules
