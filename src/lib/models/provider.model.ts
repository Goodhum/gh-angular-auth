import { User } from './user.model';
import { Observable } from 'rxjs/Observable';

export interface Provider {
    logout: () => void;
    forgotPassword?: () => void;
    login: (user: User) => Observable<any>;
    loginWithToken?: (token) => Observable<any>;
}
