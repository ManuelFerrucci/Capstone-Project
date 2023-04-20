import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EliminaOrdineService {

    utenteRecuperato = localStorage.getItem("currentUser");
    utenteRecuperatoParse = this.utenteRecuperato ? JSON.parse(this.utenteRecuperato) : '';
    accesso: HttpHeaders = new HttpHeaders({
        'Authorization': 'Bearer ' + this.utenteRecuperatoParse.accessToken
    })

    linkOrdiniDELETE: string = 'http://localhost:8080/api/elimina-ordine/';

    constructor(private httpClient: HttpClient) { }

    eliminaOrdine(id: number) {
        return this.httpClient.delete(this.linkOrdiniDELETE + id, {headers: this.accesso})
            .subscribe()
    }
}
