# gh-angular-auth

## NPM Bundle Instructions

(For those who have permission to publish)

```bash
npm run bundle
cd dist
npm publish --access public
```

First the module is transpiled and a minified umd bundle is created with rollup into the dist folder. In the dist folder there is a package.json file that configures the package for publishing. Then the package is published from the dist folder.
