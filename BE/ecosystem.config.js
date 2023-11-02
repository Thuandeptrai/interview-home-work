// config pm2 for production
module.exports = {
    apps: [
        {
            name: 'BE',
            script: 'index.js',
            instances: "max",
            exec_mode: "cluster",
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
            },
        },
    ],
};
