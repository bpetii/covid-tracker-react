This project was bootstrapped with [DHIS2 Application Platform](https://github.com/dhis2/app-platform).

# Getting started

## DHIS Portal

This project uses the DHIS portal for creating a portal from localhost:9999 to course.dhis2.org to prevent cors.

[DHIS2 portal npm](https://www.npmjs.com/package/dhis-portal)

```code
$ dhis-portal --server=course --instance=course --target='https://course.dhis2.org' --auth='username:password'
```

Install packages and start dev server

```code
$ yarn
$ yarn start
```

## App and Components outline

App.js handles the query for the resource - trackedEntityInstances the result is extracted and stored as a state - "clusters". The clusters is then passed through as props to the to main components - Clusters and Map, and rendered. Clusters component consist of a simple search function and a dhis2/ui-core table. Clusters component renders the Accordion component in the body of the table. Accordion is a react memo component which only will re render if props change. This can be a potential speedup. The Accordion component queries relationships, extracts the data and renders a Modal, a TableRow and the map component. The accordions modal renders the ClusterInfo or CasesInfo component based on click events. Clusterinfo contains a table with the persons in the cluster and casesinfo shows more information about a specific person.

## Git workflow

When commiting to git husky will check that all files are formatted correctly and that the commit message is on the right format.

[Husky commit message validation](https://github.com/conventional-changelog/commitlint/#what-is-commitlint)

Example:

```code
$ git commit -m"fix(server): send cors headers"
```

## Pull request

When starting a new tast you should make a new branch

```code
$ git checkout -b feat/new-feature
```

When the feature is done, all test passed and all code is formatted correctly, you can create a pull request.

First be sure that the branch is up to date with master

```code
$ git checkout master && git pull
$ git checkout feat/new-feature
$ git merge master
```

Resolve potential merge conflicts.

Create the pull request

```code
$ git push origin feat/new-feature
```

Go to github and publish the pull request.

Make sure to checkout master and delete branch when finished

```code
$ git checkout master && git pull
```

## Code formatting

Check that yarn format runs successfully, this command will format the code and check for linting errors.

```code
$ yarn format
```

## DHIS2 cli style

This project uses the @dhis2/cli-app-scripts for linting, prettier and husky

## Usefull links

[DHIS2 npm](https://www.npmjs.com/search?q=%40dhis2)

[DHIS2 storybook](https://ui.dhis2.nu/demo/?path=/story/menu--default)

[DHIS2 style CLI](https://cli-style.dhis2.nu/#/)

[DHIS2 CLI](https://cli.dhis2.nu/#/)

## Cypress

Add a cypress.env.json

| key                   | value                   |
| --------------------- | ----------------------- |
| dhis2_base_url        | http://localhost:9999   |
| dhis2_username        | username                |
| dhis2_password        | password                |
| dhis2_datatest_prefix | dhis2-clustermanagement |

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner and runs all available tests found in `/src`.<br />

See the section about [running tests](https://platform.dhis2.nu/#/scripts/test) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
A deployable `.zip` file can be found in `build/bundle`!

See the section about [building](https://platform.dhis2.nu/#/scripts/build) for more information.

### `yarn deploy`

Deploys the built app in the `build` folder to a running DHIS2 instance.<br />
This command will prompt you to enter a server URL as well as the username and password of a DHIS2 user with the App Management authority.<br/>
You must run `yarn build` before running `yarn deploy`.<br />

See the section about [deploying](https://platform.dhis2.nu/#/scripts/deploy) for more information.

## Learn More

You can learn more about the platform in the [DHIS2 Application Platform Documentation](https://platform.dhis2.nu/).

You can learn more about the runtime in the [DHIS2 Application Runtime Documentation](https://runtime.dhis2.nu/).

To learn React, check out the [React documentation](https://reactjs.org/).
