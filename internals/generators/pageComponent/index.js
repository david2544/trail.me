/**
 * Page Component Generator
 */
const componentExists = require('../utils/componentExists');


module.exports = {
  description: 'Add a new component to an existing page',
  prompts: [
    {
      type: 'input',
      name: 'parent',
      message: 'What should be the parent page',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
          ? true
          : 'A page with this name does not exist';
        }

        return 'The name is required';
      },
      default: 'SwitchToFairr',
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should the component be called',
      default: 'Header',
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
        path: '../../app/pages/{{properCase parent}}/{{properCase name}}/index.tsx',
        templateFile: './pageComponent/index.tsx.hbs',
        abortOnFail: true,
      },
    ];

    // If component wants styles
    if (data.wantStyles) {
      actions.push({
        type: 'add',
        path: '../../app/pages/{{properCase parent}}/{{properCase name}}/styles.module.scss',
        abortOnFail: true,
      });
    }

    // If component wants tests
    if (data.wantTests) {
      actions.push({
        type: 'add',
        path: '../../app/pages/{{properCase parent}}/{{properCase name}}/tests/index.test.tsx',
        templateFile: './pageComponent/test.tsx.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/pages/',
    });

    return actions;
  },
};
