// config pm2 for production
module.exports = {
    apps: [
        {
            // pm2 scale ecosystem.config.js 1
            name: 'BE',
            script: 'index.js',
            instances: "max",
            autorestart: true,
            watch: false,
        },
    ],
};
