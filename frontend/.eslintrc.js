module.exports = {
    'env': {
        'browser': true,
        'es2020': true,
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 11,
        'sourceType': 'module',
    },
    'rules': {
        'indent': [
            'error',
            4,
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'always',
        ],
        'no-console': 'off',
        // 'comma-dangle': [
        //     'error',
        //     'always',
        // ],

    },
};
