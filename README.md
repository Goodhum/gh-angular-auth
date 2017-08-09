# gh-angular-auth

An Angular4+ library module for quickly adding Auth0 and Firebase suupport to an Angular app.

## Run for Development

The library should be able to be tested by running `ng serve`. This will start an app that uses the library module.

You are free to modify the test app as you like. These changes are not published with the library.

## NPM Bundle Instructions

(For those who have permission to publish)

```bash
npm run bundle
cd dist
npm publish --access public
```

First the module is transpiled and a minified umd bundle is created with rollup into the dist folder. In the dist folder there is a package.json file that configures the package for publishing. Then the package is published from the dist folder.
