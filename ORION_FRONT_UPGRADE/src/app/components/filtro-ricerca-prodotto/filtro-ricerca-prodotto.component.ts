import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProdottiCatalogoService } from 'src/app/service/prodotti-catalogo.service';
import { FiltroRicercaProdottoService } from 'src/app/service/filtro-ricerca-prodotto.service';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { UtenteCorrente } from 'src/app/interface/utente-corrente.interface';

@Component({
    selector: 'app-filtro-ricerca-prodotto',
    templateUrl: './filtro-ricerca-prodotto.component.html',
    styleUrls: ['./filtro-ricerca-prodotto.component.scss']
})
export class FiltroRicercaProdottoComponent implements OnInit {

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

    listaTotaleProdotti: any = [];
    lista: any = [];

    constructor(private filtrProd: FiltroRicercaProdottoService, private prodCatSrv: ProdottiCatalogoService, private router: Router, private auth: AuthServiceService) { }

    ngOnInit(): void {
        this.auth.isAuthenticated();
        this.ricavaListaUtenti();
        this.prendiUtente();
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

    cercaTramiteCategoria(formCategoria: NgForm) {
        let select = <HTMLSelectElement>document.querySelector('#ricercaCategoriaProdotto');
        switch (select.value) {
            case 'Racchette':
                this.filtrProd.prendiRacchette().subscribe((ris) => {
                    console.log(ris);
                    this.lista = ris;
                })
                break;
            case 'Palline':
                this.filtrProd.prendiPalline().subscribe((ris) => {
                    console.log(ris);
                    this.lista = ris;
                })
                break;
            case 'Corde':
                this.filtrProd.prendiCorde().subscribe((ris) => {
                    console.log(ris);
                    this.lista = ris;
                })
                break;
            case 'Magliette':
                this.filtrProd.prendiMagliette().subscribe((ris) => {
                    console.log(ris);
                    this.lista = ris;
                })
                break;
            case 'Pantaloncini':
                this.filtrProd.prendiPantaloncini().subscribe((ris) => {
                    console.log(ris);
                    this.lista = ris;
                })
                break;
            case 'Borsoni':
                this.filtrProd.prendiBorsoni().subscribe((ris) => {
                    console.log(ris);
                    this.lista = ris;
                })
                break;
            case 'Scarpe':
                this.filtrProd.prendiScarpe().subscribe((ris) => {
                    console.log(ris);
                    this.lista = ris;
                })
                break;
            default:
                'Nessun prodotto trovato';
                console.log('Nessun prodotto trovato');
                break;
        }
    }

    cercaTramitePrezzo(formPrezzo: NgForm) {
        let select = <HTMLSelectElement>document.querySelector('#ricercaPrezzoProdotto');
        switch (select.value) {
            case '10':
                this.filtrProd.prendiPrezzoMassimo10().subscribe((ris) => {
                    console.log(ris);
                    this.lista = ris;
                })
                break;
            case '25':
                this.filtrProd.prendiPrezzoMassimo25().subscribe((ris) => {
                    console.log(ris);
                    this.lista = ris;
                })
                break;
            case '50':
                this.filtrProd.prendiPrezzoMassimo50().subscribe((ris) => {
                    console.log(ris);
                    this.lista = ris;
                })
                break;
            case '100':
                this.filtrProd.prendiPrezzoMassimo100().subscribe((ris) => {
                    console.log(ris);
                    this.lista = ris;
                })
                break;
            case '200':
                this.filtrProd.prendiPrezzoMassimo200().subscribe((ris) => {
                    console.log(ris);
                    this.lista = ris;
                })
                break;
            default:
                'Nessun prodotto trovato';
                console.log('Nessun prodotto trovato');
                break;
        }
    }
}
