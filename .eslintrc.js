module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:vue/recommended'
    ],

    rules: {
        "vue/html-indent": ["error", 'tab', {
            "attribute": 1,
            "baseIndent": 1,
            "alignAttributesVertically": false,
        }],
        "indent": ["error", "tab"],
    }
}