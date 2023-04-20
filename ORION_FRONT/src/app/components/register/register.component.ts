import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserSignUp } from 'src/app/interface/user-sign-up.interface';
import { UtenteCorrente } from 'src/app/interface/utente-corrente.interface';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    listaUtenti: any = [];

    currentUserFind: any;

    utenteCorrenteRegistrato: UtenteCorrente = {
        id: 0,
        name: '',
        username: '',
        email: '',
        password: '',
        roles: []
    }

    alertErroreVuoto: boolean = false;

    userSignUp: UserSignUp = {
        name: '',
        username: '',
        email: '',
        password: '',
        roles: []
    }

    constructor(private authSrv: AuthServiceService) { }

    ngOnInit(): void {
        this.authSrv.isAuthenticated();
        this.ricavaListaUtenti();
        this.prendiUtente();
    }

    ricavaListaUtenti() {
        this.authSrv.getUsers().subscribe((ris) => {
            this.listaUtenti = ris;
            // console.log(this.listaUtenti);
            for (let utente of this.listaUtenti) {
                if (utente.username == this.currentUserFind.username) {
                    this.utenteCorrenteRegistrato = utente;
                    // console.log(this.utenteCorrenteRegistrato);
                }
            }
        })
    }

    prendiUtente() {
        let utenteLoggato = localStorage.getItem('currentUser');
        let utenteLoggatoParse = utenteLoggato ? JSON.parse(utenteLoggato) : null;
        if (utenteLoggatoParse != null) {
            this.currentUserFind = utenteLoggatoParse;
            // console.log(this.currentUserFind);
            return this.currentUserFind;
        } else {
            console.log('Non trovato');
        }
    }

    verificaValiditaInput() {
        this.alertErroreVuoto = false;

        let name = <HTMLInputElement>document.querySelector('#name');
        let username = <HTMLInputElement>document.querySelector('#username');
        let email = <HTMLInputElement>document.querySelector('#email');
        let password = <HTMLInputElement>document.querySelector('#password');

        let buttonLogin = <HTMLButtonElement>document.querySelector('#buttonLogin');

        if (name.value.trim() == '' || username.value.trim() == '' || email.value.trim() == '' || password.value.trim() == '') {
            this.alertErroreVuoto = true;
            buttonLogin.disabled = true;
        } else {
            buttonLogin.disabled = false;
        }
    }

    creaNuovoUtente(formCrea: NgForm) {

        let roleUser: string = 'ROLE_USER';
        let roleAdmin: string = 'ROLE_ADMIN';

        let inputName = <HTMLInputElement>document.querySelector('#name');
        let inputUsername = <HTMLInputElement>document.querySelector('#username');
        let inputEmail = <HTMLInputElement>document.querySelector('#email');
        let inputPassword = <HTMLInputElement>document.querySelector('#password');
        let selectRoles = <HTMLSelectElement>document.querySelector('#roles');

        this.userSignUp.name = inputName.value;
        this.userSignUp.username = inputUsername.value;
        this.userSignUp.email = inputEmail.value;
        this.userSignUp.password = inputPassword.value;
        if (selectRoles.value == 'ROLE_USER') {
            this.userSignUp.roles.push(roleUser)
        }
        if (selectRoles.value == 'ROLE_ADMIN') {
            this.userSignUp.roles.push(roleUser)
            this.userSignUp.roles.push(roleAdmin)
        }

        console.log(this.userSignUp);
        this.authSrv.creaUtente(this.userSignUp);

        let popupInserimentoCustomUtente = <HTMLDivElement>document.querySelector('#popupInserimentoCustomUtente');
        let contenitoreFormRegister = <HTMLDivElement>document.querySelector('#contenitoreFormRegister');
        let buttonIndietro = <HTMLButtonElement>document.querySelector('#buttonIndietro');
        popupInserimentoCustomUtente.classList.remove('inattivo');
        contenitoreFormRegister.classList.add('inattivo');
        buttonIndietro.classList.add('inattivo');

    }
}
