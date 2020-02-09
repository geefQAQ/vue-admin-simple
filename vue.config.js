'use strict';
const path = require('path');
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir);
}

const name = defaultSettings.title || 'vue-admin-simple';

const port = process.env.port || 9100;

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/dev-api': {
                target: `http://127.0.0.1:${port}/mock`,
                changeOrigin: true,
                // secure: false,
                pathRewrite: {
                    ['^/dev-api']: ''
                }
            }
        }
    },

    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    }
}