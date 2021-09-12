const commandLineArgs = require('command-line-args');
const dotenv = require('dotenv');

const options = commandLineArgs([
    {
        name: 'env',
        alias: 'e',
        defaultValue: 'development',
        type: String,
    },
])

const result = dotenv.config({
    path: `./env/${options.env}.env`,
});

if (result.error) {
    // throw result.error;
}