const webpackConfigProd = require('./webpack.prod.conf');
const webpackConfigDev = require('./webpack.dev.conf');

const webpackConfig = () => {
    if(process.env.NODE_ENV === 'development') {
        return webpackConfigDev; 
    } 
    return webpackConfigProd;
}

module.exports = webpackConfig