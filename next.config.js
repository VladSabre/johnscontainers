/** @type {import('next').NextConfig} */
module.exports = {
    optimization: {
        minimize: false
    },
    reactStrictMode: true,
    i18n: {
        localeDetection: false,
        locales: ['default', 'en-US', 'de-DE'],
        defaultLocale: 'default',
    },
    trailingSlash: false,
}
