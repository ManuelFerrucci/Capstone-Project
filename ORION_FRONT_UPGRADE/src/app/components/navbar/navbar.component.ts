import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtenteCorrente } from 'src/app/interface/utente-corrente.interface';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { NavbarService } from 'src/app/service/navbar.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

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

    constructor(private authSrvNav: AuthServiceService, private router: Router) { }

    ngOnInit(): void {
        this.ricavaListaUtenti();
        this.prendiUtente();
    }

    ricavaListaUtenti() {
        this.authSrvNav.getUsers().subscribe((ris) => {
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

    disconnettiUtente() {
        this.authSrvNav.logout();
        this.router.navigate(['/login']);
    }

}
