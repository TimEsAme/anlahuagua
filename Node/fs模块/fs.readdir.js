const fs = require('fs')
const path = require('path')

const dirname = path.resolve(__dirname, './files')

async function jojo() {
    const paths = await fs.promises.readdir(dirname)
    console.log(paths);
}
jojo() 