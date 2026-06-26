const fs = require('fs')
const path = require('path')

class File {
    constructor(filename, name, ext, isFile, size, createTime, updateTime) {
        this.filename = filename
        this.name = name
        this.ext = ext
        this.isFile = isFile
        this.size = size
        this.createTime = createTime
        this.updateTime = updateTime
    }

    async getContent(isBuffer = false, filename) {
        if (this.isFile) {
            if (isBuffer) {
                return await fs.promises.readFile(this.filename)
            } else {
                return await fs.promises.readFile(this.filename, 'utf-8')
            }
        } else {
            return null
        }
    }


    async getChildren() {
        if (this.isFile) {
            return []
        }
        let children = await fs.promises.readdir(this.filename)
        children = children.map(e => {
            const jojo = path.resolve(this.filename, e)
            return File.getFile(jojo)
        })

        return Promise.all(children)
    }

    static async getFile(filename) {
        const stat = await fs.promises.stat(filename)
        const name = path.basename(filename)
        const ext = path.extname(filename)
        const isFile = stat.isFile()
        const size = stat.size
        const createTime = new Date(stat.birthtime)
        const updateTime = new Date(stat.mtime)

        return new File(filename, name, ext, isFile, size, createTime, updateTime)
    }
}

// const dirname = path.resolve(__dirname, './files')
// async function text() {
//     const file = await File.getFile(dirname)
//     console.log(file);
//     // console.log(await file.getContent());
//     console.log(await file.getChildren());

// }
// text()

async function readDir(dirname) {
    const file = await File.getFile(dirname)
    return await file.getChildren()
}


async function jojo() {
    const dirname = path.resolve(__dirname, './files')
    const res = await readDir(dirname)
    // console.log(res, 111111111111111);
    for (let i = 0; i < res.length; i++) {
        if (!res[i].isFile) {
            const r = await res[i].getChildren()
            // console.log(r, 2222222222222);
        }
    }
}

jojo()