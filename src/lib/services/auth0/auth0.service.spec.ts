import { inject, TestBed } from '@angular/core/testing';
import {
    BaseRequestOptions, Http, HttpModule, RequestMethod, RequestOptions, ResponseOptions, Response,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ProvidersConfig } from 'lib/models';
import { LocalStorageService } from 'lib/services';

import { Auth0Service } from './auth0.service';

describe('Auth0Service', () => {
    const ls: LocalStorageService = new LocalStorageService();
    const pc: ProvidersConfig = {
        auth0: {
            domain: 'test.com',
            client_id: 'test_id'
        }
    }
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                Auth0Service,
                LocalStorageService,
                ProvidersConfig,
                MockBackend,
                BaseRequestOptions,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        });
        ls.initialize('auth0');
    });

    it('auth0 service should be created', inject([Auth0Service], (auth0Service) => {
        expect(auth0Service).toBeTruthy();
    }));

    it('login should return an Observable and sets token to local storage',
        inject([XHRBackend], (mockBackend) => {
            const authService = new Auth0Service(ls, new Http(mockBackend, new RequestOptions()), pc);
            const mockResponse = {
                id_token: 'Bearer x04rc0s'
            };

            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond({ _body: JSON.stringify(mockResponse) });
            });

            authService.login({ username: 'test@gmail.com', password: 'test' }).subscribe((res) => {
                expect(res.id_token).toEqual('Bearer x04rc0s');

                // Expect the localstorage save token to be same.
                expect(ls.token).toEqual('Bearer x04rc0s');
            });
        })
    );

    it('sign up should return an Observable',
        inject([XHRBackend], (mockBackend) => {
            const authService = new Auth0Service(ls, new Http(mockBackend, new RequestOptions()), pc);

            mockBackend.connections.subscribe((connection) => {
                expect(connection.request.method).toBe(RequestMethod.Post);
                expect(connection.request.url).toBe('https://test.com/dbconnections/change_password');
                connection.mockRespond(
                    new Response(
                        new ResponseOptions({
                            body: {
                                message: 'Password changed'
                            }
                        }))
                )
            });

            authService.resetPassword('test@test.com').subscribe((res) => {
                // console.log(res)
                expect(res.json().message).toEqual('Password changed');
            });
        })
    );


    it('Reset Password as Observable',
        inject([XHRBackend], (mockBackend) => {
            const authService = new Auth0Service(ls, new Http(mockBackend, new RequestOptions()), pc);

            mockBackend.connections.subscribe((connection) => {
                expect(connection.request.method).toBe(RequestMethod.Post);
                expect(connection.request.url).toBe('https://test.com/dbconnections/signup');
                connection.mockRespond(
                    new Response(
                        new ResponseOptions({
                            body: {
                                name: 'Test name',
                                password: 'pass',
                                token: '234lsdfsdf'
                            }
                        }))
                )
            });

            authService.signUp({ username: 'test@gmail.com', password: 'test' }).subscribe((res) => {
                // console.log(res)
                expect(res.name).toEqual('Test name');

                // Expect the localstorage save token to be same.
                expect(res.password).toEqual('pass');
            });
        })
    );

    it('logout should return an Observable and clear token from local storage',
        inject([XHRBackend], (mockBackend) => {
            const authService = new Auth0Service(ls, new Http(mockBackend, new RequestOptions()), ProvidersConfig);
            authService.logout().subscribe((res) => {
                expect(res).toEqual(true);

                // Expect the localstorage save token to be same.
                expect(ls.token).toEqual(null);
            });
        })
    );
});
