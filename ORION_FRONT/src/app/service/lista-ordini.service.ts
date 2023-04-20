import { Injectable } from '@angular/core';
import { Ordine } from '../interface/ordine.interface';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { throwError, catchError, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ListaOrdiniService {

    utenteRecuperato = localStorage.getItem("currentUser");
    utenteRecuperatoParse = this.utenteRecuperato ? JSON.parse(this.utenteRecuperato) : '';
    accesso: HttpHeaders = new HttpHeaders({
        'Authorization': 'Bearer ' + this.utenteRecuperatoParse.accessToken
    })

    linkOrdiniGET: string = 'http://localhost:8080/api/lista-ordini';

    constructor(private httpClient: HttpClient, private router: Router) { }

    prendiListaOrdini() {
        return this.httpClient.get<Ordine[]>(this.linkOrdiniGET, {headers: this.accesso}).pipe(
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
