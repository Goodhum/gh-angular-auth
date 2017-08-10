import { User } from './user.model';
import { Observable } from 'rxjs/Observable';

export interface Provider {
    login: (user: User) => Observable<any>;
    signup?: (user: User) => Observable<any>;
    loginWithToken?: (token) => Observable<any>;
    authenticate?: (userData: Object) => Observable<any>;
    isAuthenticated?: () => boolean;
    getToken?: () => any;
    setToken?: (token) => any;
    getPayload?: () => any;
    setPayload?: () => any;
    logout: () => void;
    forgotPassword?: () => void;

    removeToekn?: () => void;
}
