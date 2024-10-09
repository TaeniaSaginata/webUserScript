import fs from 'fs';
import path from 'path';

// required for import syntax
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {dateTimeHelpers} from './dateTimeHelpers.js';
import {stringFormatHelpers} from './stringFormatHelpers.js';

const AUTHOR = process.env.AUTHOR ?? 'NONE';
const RELATIVE_PATH_TO_SRC = '../src';

function getUsage() {
    return '*** CREATE A USER SCRIPT FROM TEMPLATE ***\n'
        + 'USAGE: node ./createUserScript.js [script-name] [path-from-src optional] [description optional] [author optional]';
}

function readSrcSubDir(dir) {
    const templateDir = path.join(__dirname, '../src', dir);
    if (!fs.existsSync(templateDir)) {
        throw Error(`No ${dir} templates found.`);
    }
    return templateDir;
}

function createDescription(description) {
    const date = new Date();
    return `${dateTimeHelpers.getFormattedDateTime(date)}${description !== '' ? `, ${description}` : ''}`;
}

function createNewScript(scriptName, pathFromSrc, description = '', author = AUTHOR) {
    const scriptDir = path.join(__dirname, pathFromSrc, stringFormatHelpers.firstLetterToLowerCase(scriptName));

    if (fs.existsSync(scriptDir)) {
        console.error(`Script ${scriptName} already exists.`);
        return;
    }

    const fileContents = []

    try {
        const templatesDir = readSrcSubDir('_templates');

        const fileNames = fs.readdirSync(templatesDir);
        fileNames.forEach((fileName) => {
            const content = fs.readFileSync(path.join(templatesDir, fileName), 'utf-8');
            fileContents.push({fileName: fileName, content: content});
        })

    } catch (error) {
        console.error(error);
    }

    const mappedFileContents = fileContents.map((fileContent) => {
        const kebabCaseFileName = stringFormatHelpers.toKebabCase(scriptName);
        const newFileName = fileContent.fileName.replace('_template', kebabCaseFileName);

        return {
            fileName: newFileName,
            content: fileContent.content
                .replace('[NAME]', kebabCaseFileName)
                .replace('[AUTHOR]', author)
                .replace('[99/99/9999], [99:99:99]', createDescription(description))
        };
    });

    fs.mkdirSync(scriptDir);

    mappedFileContents.forEach((fileContent) => {
        const indexPath = path.join(scriptDir, fileContent.fileName);
        fs.writeFileSync(indexPath, fileContent.content);
    });
    console.log(`create new script ${scriptDir} done`);
}

const scriptName = process.argv[2];
const pathFromSrc = process.argv[3] ? path.join(RELATIVE_PATH_TO_SRC, process.argv[3]) : RELATIVE_PATH_TO_SRC;
const description = process.argv[4];
const author = process.argv[5];

if (!scriptName) {
    console.log(getUsage());
    console.error('*** Please provide a script name. ***');
    process.exit(1);
}

createNewScript(scriptName, pathFromSrc, description, author);
