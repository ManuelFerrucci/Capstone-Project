import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { throwError, catchError, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Racchetta } from '../interface/racchetta.interface';
import { Palline } from '../interface/palline.interface';
import { Corda } from '../interface/corda.interface';
import { Maglietta } from '../interface/maglietta.interface';
import { Pantaloncino } from '../interface/pantaloncino.interface';
import { Borsoni } from '../interface/borsoni.interface';
import { Scarpe } from '../interface/scarpe.interface';

@Injectable({
    providedIn: 'root'
})
export class FiltroRicercaProdottoService {

    utenteRecuperato = localStorage.getItem("currentUser");
    utenteRecuperatoParse = this.utenteRecuperato ? JSON.parse(this.utenteRecuperato) : '';
    accesso: HttpHeaders = new HttpHeaders({
        'Authorization': 'Bearer ' + this.utenteRecuperatoParse.accessToken
    })

    /// link categoria
    linkRacchetteGET: string = 'http://localhost:8080/api/lista-prodotti/categoria:Racchette';
    linkPallineGET: string = 'http://localhost:8080/api/lista-prodotti/categoria:Palline';
    linkCordeGET: string = 'http://localhost:8080/api/lista-prodotti/categoria:Corde';
    linkMaglietteGET: string = 'http://localhost:8080/api/lista-prodotti/categoria:Magliette';
    linkPantalonciniGET: string = 'http://localhost:8080/api/lista-prodotti/categoria:Pantaloncini';
    linkBorsoniGET: string = 'http://localhost:8080/api/lista-prodotti/categoria:Borsoni';
    linkScarpeGET: string = 'http://localhost:8080/api/lista-prodotti/categoria:Scarpe';

    /// link prezzo massimo
    linkPrezzoMassimo10GET: string = 'http://localhost:8080/api/lista-prodotti/prezzo-massimo:10';
    linkPrezzoMassimo25GET: string = 'http://localhost:8080/api/lista-prodotti/prezzo-massimo:25';
    linkPrezzoMassimo50GET: string = 'http://localhost:8080/api/lista-prodotti/prezzo-massimo:50';
    linkPrezzoMassimo100GET: string = 'http://localhost:8080/api/lista-prodotti/prezzo-massimo:100';
    linkPrezzoMassimo200GET: string = 'http://localhost:8080/api/lista-prodotti/prezzo-massimo:200';

    // link ricerca tramite nome
    linkProdottoNomeGET: string = 'http://localhost:8080/api/lista-prodotti/';

    constructor(private httpClient: HttpClient, private router: Router) { }

    prendiRacchette() {
        let chiamata = this.httpClient.get<Racchetta[]>(this.linkRacchetteGET, {headers: this.accesso}).pipe(
            catchError((err) => {
                return throwError(this.getMessaggioErrore(err.stato))
            })
        )
        return chiamata;
    }

    prendiPalline() {
        let chiamata = this.httpClient.get<Palline[]>(this.linkPallineGET, {headers: this.accesso}).pipe(
            catchError((err) => {
                return throwError(this.getMessaggioErrore(err.stato))
            })
        )
        return chiamata;
    }

    prendiCorde() {
        let chiamata = this.httpClient.get<Corda[]>(this.linkCordeGET, {headers: this.accesso}).pipe(
            catchError((err) => {
                return throwError(this.getMessaggioErrore(err.stato))
            })
        )
        return chiamata;
    }

    prendiMagliette() {
        let chiamata = this.httpClient.get<Maglietta[]>(this.linkMaglietteGET, {headers: this.accesso}).pipe(
            catchError((err) => {
                return throwError(this.getMessaggioErrore(err.stato))
            })
        )
        return chiamata;
    }

    prendiPantaloncini() {
        let chiamata = this.httpClient.get<Pantaloncino[]>(this.linkPantalonciniGET, {headers: this.accesso}).pipe(
            catchError((err) => {
                return throwError(this.getMessaggioErrore(err.stato))
            })
        )
        return chiamata;
    }

    prendiBorsoni() {
        let chiamata = this.httpClient.get<Borsoni[]>(this.linkBorsoniGET, {headers: this.accesso}).pipe(
            catchError((err) => {
                return throwError(this.getMessaggioErrore(err.stato))
            })
        )
        return chiamata;
    }

    prendiScarpe() {
        let chiamata = this.httpClient.get<Scarpe[]>(this.linkScarpeGET, {headers: this.accesso}).pipe(
            catchError((err) => {
                return throwError(this.getMessaggioErrore(err.stato))
            })
        )
        return chiamata;
    }

    prendiPrezzoMassimo10() {
        let chiamata = this.httpClient.get(this.linkPrezzoMassimo10GET, {headers: this.accesso}).pipe(
            catchError((err) => {
                return throwError(this.getMessaggioErrore(err.stato))
            })
        )
        return chiamata;
    }
    prendiPrezzoMassimo25() {
        let chiamata = this.httpClient.get(this.linkPrezzoMassimo25GET, {headers: this.accesso}).pipe(
            catchError((err) => {
                return throwError(this.getMessaggioErrore(err.stato))
            })
        )
        return chiamata;
    }
    prendiPrezzoMassimo50() {
        let chiamata = this.httpClient.get(this.linkPrezzoMassimo50GET, {headers: this.accesso}).pipe(
            catchError((err) => {
                return throwError(this.getMessaggioErrore(err.stato))
            })
        )
        return chiamata;
    }
    prendiPrezzoMassimo100() {
        let chiamata = this.httpClient.get(this.linkPrezzoMassimo100GET, {headers: this.accesso}).pipe(
            catchError((err) => {
                return throwError(this.getMessaggioErrore(err.stato))
            })
        )
        return chiamata;
    }
    prendiPrezzoMassimo200() {
        let chiamata = this.httpClient.get(this.linkPrezzoMassimo200GET, {headers: this.accesso}).pipe(
            catchError((err) => {
                return throwError(this.getMessaggioErrore(err.stato))
            })
        )
        return chiamata;
    }

    torna() {
        this.router.navigate(['/'])
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
