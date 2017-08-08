import { NgModule } from '@angular/core';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
      AuthService,
      UserService
  ]
})
export class AuthModule { }
