const { config } = require('@dhis2/cli-style')

module.exports = {
    extends: [config.eslintReact],
    rules: {
        'no-unused-vars': 'warn',
        'no-console': 'warn',
        'react/prop-types': 'warn',
    },
}
