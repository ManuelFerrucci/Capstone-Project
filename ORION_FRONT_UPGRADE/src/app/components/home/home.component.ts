import { Component, OnInit } from '@angular/core';
import { Ordine } from 'src/app/interface/ordine.interface';
import { ProdottoAcquistato } from 'src/app/interface/prodotto-acquistato.interface';
import { UserSignUp } from 'src/app/interface/user-sign-up.interface';
import { User } from 'src/app/interface/user.interface';
import { UtenteCorrente } from 'src/app/interface/utente-corrente.interface';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ListaOrdiniService } from 'src/app/service/lista-ordini.service';
import { ProdottiCatalogoService } from 'src/app/service/prodotti-catalogo.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

    listaProd: any = [];
    numeroProdotti: number = 0;
    prezzoMedioProdotto: number = 0;
    importoTotaleProdotti: number = 0;

    listaOrdini: Ordine[] = [];
    numeroOrdini: number = 0;
    importoTotaleOrdini: number = 0;
    importoMedioOrdini: number = 0;

    constructor(private authSrv: AuthServiceService, private listProdCat: ProdottiCatalogoService, private listOrd: ListaOrdiniService) { }

    ngOnInit(): void {
        this.authSrv.isAuthenticated();
        this.ricavaListaUtenti();
        this.prendiUtente();

        this.listProdCat.prendiListaProdotti().subscribe((ris) => {
            this.listaProd = ris;
            for (let prod of this.listaProd) {
                this.numeroProdotti += 1;
                this.importoTotaleProdotti += prod.prezzo;
            }
            this.prezzoMedioProdotto = Math.round(((this.importoTotaleProdotti / this.numeroProdotti) + 0.001) * 100) / 100;
        })

        this.listOrd.prendiListaOrdini().subscribe((ris) => {
            this.listaOrdini = ris;
            for (let ord of this.listaOrdini) {
                this.numeroOrdini += 1;
                let prodAcq: ProdottoAcquistato[] = ord.prodottiAcquistati;
                for (let acq of prodAcq) {
                    this.importoTotaleOrdini += (acq.prezzoSingolo * acq.numeroPezziAcquistati);
                }
            }
            this.importoMedioOrdini = Math.round(((this.importoTotaleOrdini / this.numeroOrdini) + 0.001) * 100) / 100;
        })
    }

    ricavaListaUtenti() {
        this.authSrv.getUsers().subscribe((ris) => {
            this.listaUtenti = ris;
            console.log(this.listaUtenti);
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
}
