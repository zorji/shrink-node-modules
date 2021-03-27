const del = require('del')

async function rm(dir, deletePath) {
  const path = `${dir}/${deletePath}`
  console.log(`searching files match pattern ${path}...`)
  const matchedFiles = await del(`${path}`)
  matchedFiles.forEach(file => console.log(`deleted ${file}`))
}

exports.rm = rm
