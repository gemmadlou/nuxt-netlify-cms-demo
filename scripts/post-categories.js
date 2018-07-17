const path = require('path');
const fs = require('fs');
const process = require('process');

const OBJ_FIELD = process.env.FIELDNAME || 'rel';

const categoriesFolder = path.join(__dirname, '..', 'content', 'post');
const contentFolder = path.join(__dirname, '..', 'content');

/**
 * @author https://gist.github.com/mathewbyrne/1280286
 */
const slugify = text => {
    // Use hash map for special characters 
    let specialChars = {"à":'a',"ä":'a',"á":'a',"â":'a',"æ":'a',"å":'a',"ë":'e',"è":'e',"é":'e', "ê":'e',"î":'i',"ï":'i',"ì":'i',"í":'i',"ò":'o',"ó":'o',"ö":'o',"ô":'o',"ø":'o',"ù":'o',"ú":'u',"ü":'u',"û":'u',"ñ":'n',"ç":'c',"ß":'s',"ÿ":'y',"œ":'o',"ŕ":'r',"ś":'s',"ń":'n',"ṕ":'p',"ẃ":'w',"ǵ":'g',"ǹ":'n',"ḿ":'m',"ǘ":'u',"ẍ":'x',"ź":'z',"ḧ":'h',"·":'-',"/":'-',"_":'-',",":'-',":":'-',";":'-'};

    return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/./g,(target, index, str) => specialChars[target] || target) // Replace special characters using the hash map
    .replace(/&/g, '-and-')         // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');             // Trim - from end of text
};

const getCategorizedPosts = () => {
    return new Promise((resolve, reject) => {
        fs.readdir(categoriesFolder, (err, files) => {
            if (err) {
                return reject(new Error(err));
            }
            resolve(files);
        });
    });
}

const getFile = (filepath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf8', (err, file) => {
            if (err) {
                return reject(new Error(err));
            }
            resolve(file);
        });
    });
}
    

const processData = async (fieldName) => {
    try {
        const files = await getCategorizedPosts()
            .then(files => files.map(file => `${categoriesFolder}/${file}`))

        const posts = await Promise.all(files.map(getFile))
            .then(data => data.map(JSON.parse))

        const categorizedPosts = posts.reduce((accum, current) => {
            let key = slugify(current[fieldName])
            if (!accum[current[fieldName]]) {
                accum[key] = [];
            }
            accum[key].push(slugify(current.title));
            return accum;
        }, {});

        fs.writeFileSync(`${contentFolder}/categorized-posts.json`, JSON.stringify(categorizedPosts))

        console.log(categorizedPosts);
    } catch (e) {
        console.error(e);
    }
}

processData(OBJ_FIELD);
