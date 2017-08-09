import { User } from './user.model';
import { Observable } from 'rxjs/Observable';

export interface Provider {
    login: (user: User) => Observable<any>
    logout: () => void
    forgotPassword?: () => void
}
