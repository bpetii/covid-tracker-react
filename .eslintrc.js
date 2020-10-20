const { config } = require('@dhis2/cli-style')

module.exports = {
    extends: [config.eslintReact],
    rules: {
        'no-unused-vars': 'warn',
        'react/prop-types': 'warn',
    },
}
