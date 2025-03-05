const fs = require('fs')

let basePath = ''



const paths = {
    // product: {
    //     directoryPath: 'public/uploads/products/images',
    //     renderPath: '/uploads/products/images',
    //     customPath: 'products/images'
    // },
}


function createDirectory(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true })
    }
}

const createFileDirectories = () => {
    try {
        Object.keys(paths).forEach(key => {
            createDirectory(paths[key].directoryPath)
        })
    } catch (err) {
        console.error(`Error creating file directories: ${err.message}`)
    }

}

module.exports = { paths ,createFileDirectories };


