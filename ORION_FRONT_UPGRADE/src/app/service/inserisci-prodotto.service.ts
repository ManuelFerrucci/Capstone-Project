import { Injectable } from '@angular/core';
import { Racchetta } from '../interface/racchetta.interface';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { throwError, catchError, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Palline } from '../interface/palline.interface';
import { Corda } from '../interface/corda.interface';
import { Maglietta } from '../interface/maglietta.interface';
import { Pantaloncino } from '../interface/pantaloncino.interface';
import { Borsoni } from '../interface/borsoni.interface';
import { Scarpe } from '../interface/scarpe.interface';

@Injectable({
    providedIn: 'root'
})
export class InserisciProdottoService {

    utenteRecuperato = localStorage.getItem("currentUser");
    utenteRecuperatoParse = this.utenteRecuperato ? JSON.parse(this.utenteRecuperato) : '';
    accesso: HttpHeaders = new HttpHeaders({
        'Authorization': 'Bearer ' + this.utenteRecuperatoParse.accessToken
    })

    linkRacchettePOST: string = 'http://localhost:8080/api/inserisci-prodotto/racchette';
    linkPallinePOST: string = 'http://localhost:8080/api/inserisci-prodotto/tubo-palline';
    linkCordePOST: string = 'http://localhost:8080/api/inserisci-prodotto/corde';
    linkMagliettePOST: string = 'http://localhost:8080/api/inserisci-prodotto/magliette';
    linkPantalonciniPOST: string = 'http://localhost:8080/api/inserisci-prodotto/pantaloncini';
    linkBorsoniPOST: string = 'http://localhost:8080/api/inserisci-prodotto/borse';
    linkScarpePOST: string = 'http://localhost:8080/api/inserisci-prodotto/scarpe';

    constructor(private httpClient: HttpClient, private router: Router) { }

    creaRacchetta(racchetta: Racchetta) {
        this.httpClient.post(this.linkRacchettePOST, racchetta, {headers: this.accesso})
            .subscribe()
    }

    creaPalline(tuboPalline: Palline) {
        this.httpClient.post(this.linkPallinePOST, tuboPalline, {headers: this.accesso})
            .subscribe()
    }

    creaCorda(corda: Corda) {
        this.httpClient.post(this.linkCordePOST, corda, {headers: this.accesso})
            .subscribe()
    }

    creaMaglietta(maglietta: Maglietta) {
        this.httpClient.post(this.linkMagliettePOST, maglietta, {headers: this.accesso})
            .subscribe()
    }

    creaPantaloncino(pantaloncino: Pantaloncino) {
        this.httpClient.post(this.linkPantalonciniPOST, pantaloncino, {headers: this.accesso})
            .subscribe()
    }

    creaBorsone(borsone: Borsoni) {
        this.httpClient.post(this.linkBorsoniPOST, borsone, {headers: this.accesso})
            .subscribe()
    }

    creaScarpe(scarpe: Scarpe) {
        this.httpClient.post(this.linkScarpePOST, scarpe, {headers: this.accesso})
            .subscribe()
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
