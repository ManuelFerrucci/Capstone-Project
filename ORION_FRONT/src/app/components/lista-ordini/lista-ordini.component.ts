import { Component, OnInit } from '@angular/core';
import { ListaOrdiniService } from 'src/app/service/lista-ordini.service';
import { Router } from '@angular/router';
import { Ordine } from 'src/app/interface/ordine.interface';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { UtenteCorrente } from 'src/app/interface/utente-corrente.interface';

@Component({
    selector: 'app-lista-ordini',
    templateUrl: './lista-ordini.component.html',
    styleUrls: ['./lista-ordini.component.scss']
})
export class ListaOrdiniComponent implements OnInit {

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

    listaOrdini: Ordine[] = [];

    constructor(private listOrdServ: ListaOrdiniService, private router: Router, private auth: AuthServiceService) { }

    ngOnInit(): void {
        this.auth.isAuthenticated();
        this.ricavaListaUtenti();
        this.prendiUtente();
        this.visualizzaOrdini();
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

    visualizzaOrdini() {
        this.listOrdServ.prendiListaOrdini().subscribe((ris) => {
            console.log(ris);
            this.listaOrdini = ris;
        });
    }
}
