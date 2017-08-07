import * as auth0 from 'auth0-js'
import { JwtHelper } from 'angular2-jwt'

let webAuth = new auth0.WebAuth({
    domain:       'domain-url',
    clientID:     'client-id'
})

const options: auth0.DefaultLoginOptions = {
    username: 'username',                       // username or email
    password: 'password',                       // password
    realm: 'Username-Password-Authentication',  // Basically database name
    scope: 'openid profile email'               // OIDC scopes
}

/**
 * Login without redirection or ui
 */
webAuth.client.login(options, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        let jwtHelper = new JwtHelper();
        console.log(jwtHelper.decodeToken(result.idToken))
    }
})
