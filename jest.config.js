const { resolve } = require('path');

module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.test.{js,jsx,ts,tsx}',
    '!app/app.tsx',
    '!app/Router.tsx',
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': 'identity-obj-proxy',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
    '@app/(.*)$': resolve(__dirname, './app/$1'),
    '@store/(.*)$': resolve(__dirname, './app/store/$1'),
    '@Layout/(.*)$': resolve(__dirname, './app/Layout/$1'),
    '@utils/(.*)$': resolve(__dirname, './app/utils/$1'),
    '@hooks/(.*)$': resolve(__dirname, './app/hooks/$1'),
    '@common/(.*)$': resolve(__dirname, './app/common/$1'),
    '@pages/(.*)$': resolve(__dirname, './app/pages/$1'),
    '@images/(.*)$': resolve(__dirname, './assets/images/$1'),
  },
  setupFilesAfterEnv: ['<rootDir>/internals/testing/test-bundler.js'],
  testRegex: '.*\\.test\\.(js|ts(x?))$',
  transform: {
    '^.+\\.(ts(x?)|js)$': 'ts-jest',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
