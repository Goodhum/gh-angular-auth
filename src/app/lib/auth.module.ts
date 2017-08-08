import { NgModule } from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
      AuthService,
      UserService
  ]
})
export class AuthModule { }
