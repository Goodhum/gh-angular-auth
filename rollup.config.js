import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: 'dist/index.js',
    dest: 'dist/gh-angular-auth.umd.js',
    format: 'umd',
    moduleName: 'ng.ghAuth',
    plugins: [
        commonjs({
            namedExports: {
                'node_modules/angular2-jwt/angular2-jwt.js': ['angular2-jwt']
            }
            // include: 'node_modules/angular2-jwt/angular2-jwt.js'
        }),
        uglify()
    ],
    globals: {
        '@angular/core': 'ng.core',
        '@angular/http': 'ng.http',
        'rxjs/Observable': 'Rx',
        'rxjs/add/observable/of': 'Rx.Observable'
    },
    external: [
        '@angular/core',
        '@angular/http',
        'angular2-jwt',
        'firebase',
        'rxjs/Observable',
        'rxjs/add/observable/of'
    ]
}
