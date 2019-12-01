module.exports = {
    moduleFileExtensions: ['vue', 'js', 'ts', 'jsx', 'json'],
    collectCoverage: true,
    transform: {
        '^.+\\.[t|j]sx?$': '<rootDir>/node_modules/babel-jest',
        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$'
};
