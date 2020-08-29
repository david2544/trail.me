/**
 * Common Component Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a new common component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A common component or page with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantStyles',
      default: true,
      message: 'Do you want to have styles',
    },
    {
      type: 'confirm',
      name: 'wantTests',
      default: true,
      message: 'Do you want to have tests',
    },
  ],
  actions: data => {
    // Generate index.ts and index.test.tsx
    const actions = [
      {
        type: 'add',
        path: '../../app/common/{{properCase name}}/index.tsx',
        templateFile: './common/index.tsx.hbs',
        abortOnFail: true,
      },
    ];

    // If component wants styles
    if (data.wantStyles) {
      actions.push({
        type: 'add',
        path: '../../app/common/{{properCase name}}/styles.module.scss',
        abortOnFail: true,
      });
    }

    // If component wants tests
    if (data.wantTests) {
      actions.push({
        type: 'add',
        path: '../../app/common/{{properCase name}}/tests/index.test.tsx',
        templateFile: './common/test.tsx.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/common/',
    });

    return actions;
  },
};
