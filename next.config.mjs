/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_TELEMETRY_DISABLED: "1"
    },
    webpack: function (config, options) {
        if (options.isServer) {
            config.resolve.alias['@vechain/connex'] = '@vechain/connex/dist/connex.js';
            config.module.rules.push({
                test: /connex\.js$/,
                loader: 'string-replace-loader',
                options: {
                    search: 'self',
                    replace: 'globalThis',
                },
            });
        } else {
            config.resolve.fallback = { ...config.resolve.fallback, net: false, tls: false };
        }
        return config;
    },
};

export default nextConfig;
