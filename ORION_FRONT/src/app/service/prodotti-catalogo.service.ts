import { Injectable } from '@angular/core';
import { Racchetta } from '../interface/racchetta.interface';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { throwError, catchError, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Borsoni } from '../interface/borsoni.interface';

@Injectable({
    providedIn: 'root'
})
export class ProdottiCatalogoService {

    utenteRecuperato = localStorage.getItem("currentUser");
    utenteRecuperatoParse = this.utenteRecuperato ? JSON.parse(this.utenteRecuperato) : '';
    accesso: HttpHeaders = new HttpHeaders({
        'Authorization': 'Bearer ' + this.utenteRecuperatoParse.accessToken
    })

    linkProdottiGET: string = 'http://localhost:8080/api/lista-prodotti';
    linkProdottiPOST: string = '';
    linkProdottiPUT: string = '';
    linkProdottiDELETE: string = '';

    linkRacchetteGET: string = 'http://localhost:8080/api/lista-prodotti/categoria:Racchette';
    linkRacchettePOST: string = '';
    linkRacchettePUT: string = '';
    linkRacchetteDELETE: string = '';

    linkBorsoniGET: string = 'http://localhost:8080/api/lista-borsoni';
    linkBorsoniPOST: string = '';
    linkBorsoniPUT: string = '';
    linkBorsoniDELETE: string = '';

    constructor(private httpClient: HttpClient, private router: Router) { }

    prendiListaProdotti() {
        return this.httpClient.get(this.linkProdottiGET, {headers: this.accesso}).pipe(
            catchError((err) => {
                return throwError(this.getMessaggioErrore(err.stato))
            })
        )
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
