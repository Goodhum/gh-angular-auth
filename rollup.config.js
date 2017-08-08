import uglify from 'rollup-plugin-uglify';

export default {
    entry: 'dist/index.js',
    dest: 'dist/gh-angular-auth.umd.js',
    format: 'umd',
    moduleName: 'ng.ghAuth',
    plugins: [
        uglify()
    ],
    globals: {
        '@angular/core': 'ng.core'
    }
}
