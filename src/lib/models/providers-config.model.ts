export interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
}

export interface Auth0Config {
    domain: string;
    client_id: string;
}

export abstract class ProvidersConfig {
    firebase?: FirebaseConfig;
    auth0?: Auth0Config;
    redirectURl?: string;
};
