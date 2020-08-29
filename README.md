# Frontend Template

## SonarQube Analysis - Current project status

_You need to be logged in to [SonarQube](https://sonarqube.raisin.systems/) in order to be able to view the badges_
**Add your project to sonarqube and then link the badges below**

[![Quality gate]()]()

[![Bugs]()]()
[![Code Smells]()]()
[![Vulnerabilities]()]()

[![Coverage]()]()
[![Duplicated Lines (%)]()]()
[![Technical Debt]()]()

[![Security Rating]()]()
[![Reliability Rating]()]()
[![Maintainability Rating]()]()
[![Lines of Code]()]()

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you have `node` and `npm` set up on your machine. Also make sure that you are on a compatible version. You can check your versions with `node -v` and `npm -v`.

```json
  "npm": ">=6.4.1",
  "node": ">=10.13.0"
```

Install the redux-devtools extension. This will help you explore the redux store during development directly in your browser. You can find it [here](https://github.com/zalmoxisus/redux-devtools-extension)

Also make sure you have [Prettier](https://prettier.io/) installed in your preffered IDE/Code Editor. We use this to maintain the same code formatting among contributors.  
Prettier for [VSCode](https://github.com/prettier/prettier-vscode)  
Prettier for [Webstorm](https://prettier.io/docs/en/webstorm.html)  
Prettier for [Atom](https://github.com/prettier/prettier-atom)  
Prettier for [SublimeText](https://packagecontrol.io/packages/JsPrettier)

### Installing

_A step by step series of examples that tell you how to get the development env running._

Clone this repo in your prefered location:

```console
~# git clone git@github.com:davidcoroian/path-finder.git
```

Navigate to it and install required dependencies:

```console
~# cd path-finder
~# npm install
```

Start the development server:

```console
~# npm start

...

Starting type checking service...
Server started ! ✓

Access URLs:
-----------------------------------
Localhost: http://localhost:3000
      LAN: http://192.168.0.133:3000
-----------------------------------
Press CTRL-C to stop
```

Once the server is up and running, navigate to `localhost:3000` in your browser.  
_There are multiple ways to run the project. You can read more about this in the **Scripts** section._

## Branch naming convention

We follow the following pattern:  
`[meaningful name]-[jira ticket id]`  
e.g.  
`add-gtm-events-PP-420`

## Tests

_This section will guide you through how to run the unit tests in this project as well as other relevant information regarding our test setup._

We use `Jest` and `Enzyme` to keep our code bug free. [Jest](https://jestjs.io/) is the main testing framework while [Enzyme](https://enzymejs.github.io/enzyme/) helps with testing the presentational part of our components.

We have agreed to keep the coverage on our code at above X %. This will help with ensuring that our app is reliable and stable. Apart from running the tests manually yourself (see section below), tests are always ran in the pipeline for every MR or against `master` on new pushes.

Generally, for presentational components we use snapshot tests. These will detect any changes in the components output which we can then observe. **These changes should be taken seriously and checked as well by the reviewers during code reviews.** If a change in the output was not intended it should not be there.

For the components which are holding logic, utils, hooks or wherever else it makes sense, we write unit tests. Fairly often, some components will be covered by both unit and snapshot tests.

### Running all unit tests

The following command will run all the unit tests, generating a coverage report at the end. In the coverage report you can see the components and the lines in the respective components that are not covered. The report generates the coverage for `Statements`, `Branches`, `Functions` and `Lines`:

```console
~# npm run test
```

### Running tests in watch mode

If you are currently writing tests for a component, then you might want to run the tests in watch mode. Jest will re-run the tests for you as you do changes in the files:

```console
~# npm run test:watch
```

There are several options for the watch mode which can be seen after issuing the command

```console
Watch Usage
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
```

You can also run the tests only for one component in watch mode directly by appending the component name to the `test:watch` command:

```console
~# npm run test:watch Button
```

## Opening a Merge Request

_To better familiarize yourself with the Code Reviews process at Raisin, please head to the [Frontend Code Reviews](https://raisin-jira.atlassian.net/wiki/spaces/ENGPEOP/pages/141951081/Frontend+Code+Reviews) doc._

WIP: We use a template for generating the description of our MR's. You can find it in the templates when opening an MR.
We also make use of labels for MR. Please tag your MR's with the coresponding one.

As a final step, post a message in the #fe-code-reviews channel with a link to your MR and a short description. You can read more about this [here](https://raisin-jira.atlassian.net/wiki/spaces/ENGPEOP/pages/2064674/Frontend+chapter+slack+channels)

## CI Pipeline

For every new push to `master` or a merge request, the GitLab CI Pipeline is triggered. You can see the current configuration of the pipeline in the [.gitlab-ci.yml](https://github.com/davidcoroian/path-finder/blob/master/.gitlab-ci.yml) file.
There are currently three jobs which are being executed in the pipeline:

- **Test:** will run all unit and snapshot tests and notify with a message in case of failure. It is the first job because this step is the one most likely to fail. The Test job also generates the `coverage` report which is later used by SonarQube
- **Build:** will build the project
- **Sonar:** will run the sonarqube analysis indicating if the Quality Gate is passed and a couple of other metrics.

## Deployment

WIP

## Scripts

_Information about some of the scripts that might come in handy._

| Command                    |                              Description                               |
| -------------------------- | :--------------------------------------------------------------------: |
| `npm run build`            |                   Build the app. Output in `./build`                   |
| `npm run build:clean`      |                     Remove the `./build` directory                     |
| `npm start`                |                   Start the local development server                   |
| `npm run start:tunnel`     | Start the development server with ngrok. Exposes your local web server |
| `npm run start:production` |              Start the server that mimics the production               |
| `npm run generate`         |       Generate a custom template for a new `page` or `component`       |
| `npm run lint`             |                               Run eslint                               |
| `npm run lint:eslint:fix`  |         Run eslint with the attempt to fix any existing issues         |
| `npm run security`         |                           Run an audit check                           |
| `npm run test`             |                             Run all tests                              |
| `npm run test:watch`       |                      Run all tests in watch mode                       |
| `npm run test:clean`       |                   Remove the `./coverage` directory                    |
| `npm run prettify`         |                     Run prettify against all files                     |
| `npm run size`             |           Calculate app entry point file size and load time            |

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/davidcoroian/path-finder/tags).

## Authors

- **David** - [Gitlab profile](https://github.com/davidcoroian)

See also the list of [contributors](https://github.com/davidcoroian/path-finder/graphs/contributors) who participated in this project.

## Bundle analysis

`package.json` has a config flag that can be used to analyze the generated bundle. By default is false:

```json
  "config": {
    ...
    "analyze": "false"
  }
```

By turning it into `true` and running npm run build you can have an overview of size of our bundle and the various libs we are using.
