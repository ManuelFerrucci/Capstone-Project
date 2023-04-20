import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { throwError, catchError, Subject } from 'rxjs';
import { Ordine } from '../interface/ordine.interface';

@Injectable({
    providedIn: 'root'
})
export class InserisciOrdineService {

    utenteRecuperato = localStorage.getItem("currentUser");
    utenteRecuperatoParse = this.utenteRecuperato ? JSON.parse(this.utenteRecuperato) : '';
    accesso: HttpHeaders = new HttpHeaders({
        'Authorization': 'Bearer ' + this.utenteRecuperatoParse.accessToken
    })

    linkOrdiniPOST: string = 'http://localhost:8080/api/inserisci-ordine';

    constructor(private httpClient: HttpClient) { }

    creaOrdine(ordine: Ordine) {
        this.httpClient.post(this.linkOrdiniPOST, ordine, {headers: this.accesso})
            .subscribe()
    }
}