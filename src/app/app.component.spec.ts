// import { TestBed, async } from '@angular/core/testing';
//
// import { AppComponent } from './app.component';
// import { matIconModule, matSnackBarModule } from '@angular/material';
// import { AuthService } from 'lib/services/auth/auth.service';
// import { UserService } from 'lib/services/user/user.service';
// import { GhLoginDialogService } from 'app/services/gh-login-dialog.service';
// import { GhSignUpDialogService } from 'app/services/gh-sign-up-dialog.service';
//
// describe('AppComponent', () => {
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 matIconModule,
//                 matSnackBarModule
//             ],
//             declarations: [
//                 AppComponent
//             ],
//             providers: [
//                 AuthService,
//                 UserService,
//                 GhLoginDialogService,
//                 GhSignUpDialogService
//             ]
//         }).compileComponents();
//     }));
//
//     it('should create the app', async(() => {
//         const fixture = TestBed.createComponent(AppComponent);
//         const app = fixture.debugElement.componentInstance;
//         expect(app).toBeTruthy();
//     }));
//
//     it(`should have as title 'app'`, async(() => {
//         const fixture = TestBed.createComponent(AppComponent);
//         const app = fixture.debugElement.componentInstance;
//         expect(app.title).toEqual('app');
//     }));
//
//     it('should render title in a h1 tag', async(() => {
//         const fixture = TestBed.createComponent(AppComponent);
//         fixture.detectChanges();
//         const compiled = fixture.debugElement.nativeElement;
//         expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
//     }));
// });
