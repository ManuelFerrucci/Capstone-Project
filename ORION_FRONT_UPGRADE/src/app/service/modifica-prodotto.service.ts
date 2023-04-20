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
export class ModificaProdottoService {

    utenteRecuperato = localStorage.getItem("currentUser");
    utenteRecuperatoParse = this.utenteRecuperato ? JSON.parse(this.utenteRecuperato) : '';
    accesso: HttpHeaders = new HttpHeaders({
        'Authorization': 'Bearer ' + this.utenteRecuperatoParse.accessToken
    })

    linkRacchettePUT: string = 'http://localhost:8080/api/modifica-prodotto/racchette';
    linkPallinePUT: string = 'http://localhost:8080/api/modifica-prodotto/tubo-palline';
    linkCordePUT: string = 'http://localhost:8080/api/modifica-prodotto/corde';
    linkMagliettePUT: string = 'http://localhost:8080/api/modifica-prodotto/magliette';
    linkPantalonciniPUT: string = 'http://localhost:8080/api/modifica-prodotto/pantaloncini';
    linkBorsoniPUT: string = 'http://localhost:8080/api/modifica-prodotto/borse';
    linkScarpePUT: string = 'http://localhost:8080/api/modifica-prodotto/scarpe'

    constructor(private httpClient: HttpClient, private router: Router) { }

    modificaRacchetta(racchetta: Racchetta) {
        this.httpClient.put(this.linkRacchettePUT, racchetta, {headers: this.accesso})
            .subscribe()
    }

    modificaPalline(palline: Palline) {
        this.httpClient.put(this.linkPallinePUT, palline, {headers: this.accesso})
            .subscribe()
    }

    modificaCorda(corda: Corda) {
        this.httpClient.put(this.linkCordePUT, corda, {headers: this.accesso})
            .subscribe()
    }

    modificaMaglietta(maglietta: Maglietta) {
        this.httpClient.put(this.linkMagliettePUT, maglietta, {headers: this.accesso})
            .subscribe()
    }

    modificaPantaloncino(pantaloncino: Pantaloncino) {
        this.httpClient.put(this.linkPantalonciniPUT, pantaloncino, {headers: this.accesso})
            .subscribe()
    }

    modificaBorsone(borsone: Borsoni) {
        this.httpClient.put(this.linkBorsoniPUT, borsone, {headers: this.accesso})
            .subscribe()
    }

    modificaScarpe(scarpe: Scarpe) {
        this.httpClient.put(this.linkScarpePUT, scarpe, {headers: this.accesso})
            .subscribe()
    }
}