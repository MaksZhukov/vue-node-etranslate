const config = require("config");

const { server } = config;
module.exports = {
    transpileDependencies: [/node_modules[/\\\\]vuetify[/\\\\]/],
    productionSourceMap: false,
    devServer: {
        port: 3001,
        proxy: {
            "/api": {
                target: server.origin,
            },
        },
    },
};
