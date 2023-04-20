import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    alertErroreUsername: boolean = false;
    alertErrorePassword: boolean = false;

    isLogged = true;
    username: string = '';

    constructor(private authService: AuthServiceService, private router: Router) { }

    ngOnInit(): void { }

    verificaValiditaInput() {
        this.alertErroreUsername = false;

        let username = <HTMLInputElement>document.querySelector('#username');
        let password = <HTMLInputElement>document.querySelector('#password');

        let buttonLogin = <HTMLButtonElement>document.querySelector('#buttonLogin');

        if (username.value.trim() == '' && password.value.trim() == '') {
            this.alertErroreUsername = true;
            this.alertErrorePassword = true;
            buttonLogin.disabled = true;
        } else if (username.value.trim() == '' && password.value.trim() != '') {
            this.alertErroreUsername = true;
            this.alertErrorePassword = false;
            buttonLogin.disabled = true;
        } else if (username.value.trim() != '' && password.value.trim() == '') {
            this.alertErroreUsername = false;
            this.alertErrorePassword = true;
            buttonLogin.disabled = true;
        } else {
            this.alertErroreUsername = false;
            this.alertErrorePassword = false;
            buttonLogin.disabled = false;
        }
    }

    accedi(formLogin: NgForm): void {
        this.authService.login(formLogin.value).subscribe(
            (data) => {
                // console.log('success', data);
                this.username = data.username;
                this.router.navigate(["/home"])
                this.isLogged = true;
            },
            (error) => {
                console.log('Submit non andato a buon fine', error);
                this.isLogged = false;
            }
        );
    }

    reloadPage() {
        window.location.reload();
    }
}
