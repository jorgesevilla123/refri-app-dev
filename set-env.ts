const {writeFile} = require('fs')
const {argv} = require('yargs')


//read enviroment variables from .env file
require('dotenv').config();


//read the command line arguments passed with yargs
const environment = argv.environment


const isProduction = environment === 'prod';

console.log(isProduction);


const targetPath = isProduction ? `./src/environments/environment.prod.ts` : `./src/environments/environment.ts`;

// we have access to our environment variables
// in the process.env object thanks to dotenv

const environmentFileContent = `
export const environment = {
    production: ${isProduction},
    PRODUCTS_API: "${process.env.PRODUCTS_API}",
    CLIENTS_API: "${process.env.CLIENTS_API}",
    CONFIG_API: "${process.env.CONFIG_API}",
    USERS_API: "${process.env.USERS_API}",
    CATEGORY_API: "${process.env.CATEGORY_API}",
    SUPPLIERS_API: "${process.env.SUPPLIERS_API}",
    WAREHOUSE_API: "${process.env.WAREHOUSE_API}",
    SALES_API: "${process.env.SALES_API}"
};
`;

//Writing the content to the respective file

writeFile(targetPath, environmentFileContent, (err) => {
    if(err) {
        console.log(err);
    }

    console.log(`Wrote variables to path ${targetPath}`);

});