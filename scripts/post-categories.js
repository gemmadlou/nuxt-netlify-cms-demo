const path = require('path');
const fs = require('fs');
const process = require('process');
const {slugify} = require('../utils/utils');

const OBJ_FIELD = process.env.FIELDNAME || 'rel';
const OUTPUT_FILE = process.env.OUTPUT || 'categorized-posts.json';
const CATEGORIES_FOLDER = path.join(__dirname, '..', 'content', 'post');
const CONTENT_FOLDER = path.join(__dirname, '..', 'content');

const processData = async () => {
    try {
        const categorizedPosts = await getData(OBJ_FIELD, CATEGORIES_FOLDER);
        fs.writeFileSync(`${CONTENT_FOLDER}/${OUTPUT_FILE}`, JSON.stringify(categorizedPosts))
        console.log(categorizedPosts);
    } catch (e) {
        console.error(e);
    }
}

processData();