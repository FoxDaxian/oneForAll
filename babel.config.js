module.exports = function(api) {
    // api.cache(true);
    api.cache.never();

    const presets = [
        [
            '@babel/preset-env',
            {
                modules: false,
                useBuiltIns: 'usage',
                corejs: {version: 3, proposals: true}
            }
        ],
        '@babel/preset-typescript'
    ];
    const plugins = [];

    return {
        presets,
        plugins
    };
};
