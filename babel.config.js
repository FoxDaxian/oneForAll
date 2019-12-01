module.exports = function(api) {
    const isTest = api.env('test');
    let presets;

    presets = [
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

    if (isTest) {
        presets = [
            ['@babel/preset-env', {targets: {node: 'current'}}],
            '@babel/preset-typescript'
        ];
    }
    const plugins = [];

    return {
        presets,
        plugins
    };
};
