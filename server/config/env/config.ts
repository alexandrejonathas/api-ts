let extension: string = 'js';
let ambiente: string = process.env.NODE_ENV || 'development';

if(ambiente == 'development'){
    extension = 'ts';
}

module.exports = () => require(`../env/${ambiente}.env.${extension}`);

