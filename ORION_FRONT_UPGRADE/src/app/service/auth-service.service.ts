import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, throwError } from 'rxjs';
import { User } from '../interface/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserSignUp } from '../interface/user-sign-up.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthServiceService {

    utenteRecuperato = localStorage.getItem("currentUser");
    utenteRecuperatoParse = this.utenteRecuperato ? JSON.parse(this.utenteRecuperato) : '';
    accesso: HttpHeaders = new HttpHeaders({
        'Authorization': 'Bearer ' + this.utenteRecuperatoParse.accessToken
    })

    currentUserSubject: BehaviorSubject<User | null>;
    currentUser: Observable<User | null>;

    authStatusSource = new Subject<boolean>;
    authStatus$ = this.authStatusSource.asObservable();

    httpOptions: HttpHeaders = new HttpHeaders({
        'Authorization': 'Bearer' + localStorage.getItem('token')
    });

    getUsersLink = 'http://localhost:8080/api/lista-users';

    apiUrl: string = 'http://localhost:8080/api/auth';

    isLoggedIn: boolean = false;

    constructor(private http: HttpClient, private router: Router) {
        const storedUser = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User | null>(
            storedUser ? JSON.parse(storedUser) : null
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    authSubject = new BehaviorSubject<any>(null);

    user$ = this.authSubject.asObservable();
    isLoggedIn$ = this.user$.pipe(map((user) => !!user));

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    login(data: { username: string; password: string }): Observable<User> {
        return this.http.post<User>(this.apiUrl + '/login', data).pipe(
            map((user) => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                this.updateAuthStatus(true);
                return user;
            })
        )
    }

    creaUtente(userSignUp: UserSignUp) {
        return this.http.post(this.apiUrl + '/register', userSignUp, {headers: this.accesso})
            .subscribe()
    }

    getToken() {
        const token = JSON.parse(localStorage.getItem("currentUser")!);
        return token.accessToken
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.updateAuthStatus(false);
    }

    isAuthenticated() {
        const storedUser = localStorage.getItem('currentUser');
        if (!storedUser) {
            this.router.navigate(['/login'])
        }
    }

    updateAuthStatus(status: boolean): void {
        this.authStatusSource.next(status);
    }

    getUsers() {
        return this.http.get(this.getUsersLink, {headers: this.accesso}).pipe(
            catchError((err) => {
                return throwError(this.getMessaggioErrore(err.stato))
            })
        )
    }

    getMessaggioErrore(stato: number) {
        let messaggio: string = '';
        if (199 < stato && stato < 299) {
            messaggio = 'TUTTO OK';
        } else if (stato < 399) {
            messaggio = 'PROBLEMI DI COMUNICAZIONE DATI';
        } else {
            messaggio = 'PROBLEMI GENERICI';
        }
    }

}
