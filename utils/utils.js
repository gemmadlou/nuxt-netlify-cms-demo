const path = require('path');
const fs = require('fs');

/**
 * @author https://gist.github.com/mathewbyrne/1280286
 */
const slugify = text => {
    // Use hash map for special characters 
    let specialChars = {"à":'a',"ä":'a',"á":'a',"â":'a',"æ":'a',"å":'a',"ë":'e',"è":'e',"é":'e', "ê":'e',"î":'i',"ï":'i',"ì":'i',"í":'i',"ò":'o',"ó":'o',"ö":'o',"ô":'o',"ø":'o',"ù":'o',"ú":'u',"ü":'u',"û":'u',"ñ":'n',"ç":'c',"ß":'s',"ÿ":'y',"œ":'o',"ŕ":'r',"ś":'s',"ń":'n',"ṕ":'p',"ẃ":'w',"ǵ":'g',"ǹ":'n',"ḿ":'m',"ǘ":'u',"ẍ":'x',"ź":'z',"ḧ":'h',"·":'-',"/":'-',"_":'-',",":'-',":":'-',";":'-'};

    return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/./g,(target, index, str) => specialChars[target] || target) // Replace special characters using the hash map
    .replace(/&/g, '-and-')     // Replace & with 'and'
    .replace(/'/g, '-')         // Because that's how netlify cms converts apostrophes
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');             // Trim - from end of text
};

/**
 * Assists in getting 
 * @param {*} filepath 
 */
const getImport = (filepath) => {
    try {
        return fs.readFileSync(path.resolve(__dirname, filepath), { encoding: 'utf8'});
    } catch (e) {
        return new Error(e);
    }
}

const getDir = (folder) => {
    return fs.readdirSync(folder, { encoding: 'utf8'});
    // return new Promise((resolve, reject) => {
    //     fs.readdir(folder, (err, files) => {
    //         if (err) {
    //             return reject(new Error(err));
    //         }
    //         resolve(files);
    //     });
    // });
}

const getFile = (filepath) => {
    return fs.readFileSync(filepath, { encoding: 'utf8'});
    // return new Promise((resolve, reject) => {
    //     fs.readFile(filepath, 'utf8', (err, file) => {
    //         if (err) {
    //             return reject(new Error(err));
    //         }
    //         resolve(file);
    //     });
    // });
}

let getDataBy = (fieldName, categoriesFolder) => {
    const files = getDir(categoriesFolder).map(file => `${categoriesFolder}/${file}`);
        // .then(files => files.map(file => `${categoriesFolder}/${file}`))

    const items = files.map(getFile).map(JSON.parse);
       // .then(data => data.map(JSON.parse));

    return items.map(item => ({
        ...item,
        _key: slugify(item[fieldName])
    }))

    // return items.reduce((accum, current) => {
    //     console.log(current, fieldName, current[fieldName])
    //     let key = slugify(current[fieldName])
    //     if (!accum[current[fieldName]]) {
    //         accum[key] = [];
    //     }
    //     accum[key].push(current);
    //     return accum;
    // }, {});
}

module.exports = {
    getDataBy: getDataBy,
    slugify: slugify
}