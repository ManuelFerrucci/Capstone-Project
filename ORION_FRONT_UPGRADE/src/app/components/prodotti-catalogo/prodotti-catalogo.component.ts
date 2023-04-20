import { Component, OnInit } from '@angular/core';
import { ProdottiCatalogoService } from 'src/app/service/prodotti-catalogo.service';
import { Router } from '@angular/router';
import { Racchetta } from 'src/app/interface/racchetta.interface';
import { Borsoni } from 'src/app/interface/borsoni.interface';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { UtenteCorrente } from 'src/app/interface/utente-corrente.interface';

@Component({
    selector: 'app-prodotti-catalogo',
    templateUrl: './prodotti-catalogo.component.html',
    styleUrls: ['./prodotti-catalogo.component.scss']
})
export class ProdottiCatalogoComponent implements OnInit {

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

    listaProdotti: any = [];

    constructor(private prodCatServ: ProdottiCatalogoService, private router: Router, private auth: AuthServiceService) { }

    ngOnInit(): void {
        this.auth.isAuthenticated();
        this.ricavaListaUtenti();
        this.prendiUtente();
        this.visualizzaProdotti();
    }

    ricavaListaUtenti() {
        this.auth.getUsers().subscribe((ris) => {
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

    visualizzaProdotti() {
        this.prodCatServ.prendiListaProdotti().subscribe((ris) => {
            console.log(ris);
            this.listaProdotti = ris;
        });
    }
}
