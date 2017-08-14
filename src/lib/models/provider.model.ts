import { User } from './user.model';
import { Observable } from 'rxjs/Observable';

export interface Provider {
    login: (user: User) => Observable<any>;
    signUp: (user: User) => Observable<any>;
    resetPassword: (email: string) => Observable<any>;
    logout: () => void;
}
