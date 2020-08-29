/**
 * Page Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a new page',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Cockpit',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or page with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'input',
      name: 'path',
      message: 'What will the path to the page be?',
      default: '/some-path',
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
        path: '../../app/pages/{{properCase name}}/index.tsx',
        templateFile: './page/index.tsx.hbs',
        abortOnFail: true,
      },
    ];

    // If component wants styles
    if (data.wantStyles) {
      actions.push({
        type: 'add',
        path: '../../app/pages/{{properCase name}}/styles.module.scss',
        abortOnFail: true,
      });
    }

    // If component wants tests
    if (data.wantTests) {
      actions.push({
        type: 'add',
        path: '../../app/pages/{{properCase name}}/tests/index.test.tsx',
        templateFile: './page/test.tsx.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'modify',
      path: '../../app/Router.tsx',
      pattern: new RegExp(/.*\{\/\*.*\[INSERT NEW ROUTE ABOVE\].+\n/),
      templateFile: './page/insertNewPageRoute.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'modify',
      path: '../../app/Router.tsx',
      pattern: new RegExp(/.*\/\/.*\[IMPORT NEW PAGE ABOVE\].+\n/),
      templateFile: './page/importNewPage.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'prettify',
      path: '/pages/',
    });

    return actions;
  },
};
