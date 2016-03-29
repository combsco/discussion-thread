React Redux Starter Kit
=======================

Requirements
------------

* node `^4.2.0`
* npm `^3.0.0`

Getting Started
---------------

Just clone the repo and install the necessary node modules:

```shell
$ npm install                   # Install Node modules listed in ./package.json (may take a while the first time)
$ npm start                     # Compile and launch
```

Usage
-----

* Doing live development? Use `npm start` to spin up the dev server.
* Compiling the application to disk? Use `npm run compile`.
* Deploying to an environment? `npm run deploy` can help with that.

|Script|Description|
|---|---|
|`npm start`|Spins up Koa server to serve your app at `localhost:3000`. HMR will be enabled in development.|
|`npm run compile`|Compiles the application to disk (`~/dist` by default).|
|`npm run dev`|Same as `npm start`, but enables nodemon to automatically restart the server when server-related code is changed.|
|`npm run dev:nw`|Same as `npm run dev`, but opens the redux devtools in a new window.|
|`npm run dev:no-debug`|Same as `npm run dev` but disables redux devtools.|
|`npm run test`|Runs unit tests with Karma and generates a coverage report.|
|`npm run test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`npm run deploy`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`npm run flow:check`|Analyzes the project for type errors.|
|`npm run lint`|Lint all `.js` files.|
|`npm run lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|

**NOTE:** Deploying to a specific environment? Make sure to specify your target `NODE_ENV` so webpack will use the correct configuration. For example: `NODE_ENV=production npm run compile` will compile your application with `~/build/webpack/_production.js`.
