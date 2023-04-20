import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaOrdiniService } from 'src/app/service/lista-ordini.service';
import { Ordine } from 'src/app/interface/ordine.interface';
import { ProdottoAcquistato } from 'src/app/interface/prodotto-acquistato.interface';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
    selector: 'app-dettaglio-ordine',
    templateUrl: './dettaglio-ordine.component.html',
    styleUrls: ['./dettaglio-ordine.component.scss']
})
export class DettaglioOrdineComponent implements OnInit {

    listaOrdiniDettaglioComp: Ordine[] = [];

    ordine: Ordine = {
        id: 0,
        dataOrdine: new Date(),
        cliente: '',
        prodottiAcquistati: []
    }

    listaProdottiAcquistatiDettaglioComp: ProdottoAcquistato[] = [];

    decisione: number = 0;

    importoOrdine: number = 0;

    constructor(private activRoute: ActivatedRoute, private listOrdSrv: ListaOrdiniService, private auth: AuthServiceService) { }

    ngOnInit(): void {
        this.auth.isAuthenticated();

        let idNew: number = this.activRoute.snapshot.params['id'];
        this.decisione = idNew;
        this.listOrdSrv.prendiListaOrdini().subscribe((ris) => {
            this.listaOrdiniDettaglioComp = ris;
            for (let ord of this.listaOrdiniDettaglioComp) {
                if (ord.id == idNew) {
                    this.ordine = ord;
                    this.listaProdottiAcquistatiDettaglioComp = ord.prodottiAcquistati;
                    for (let prodotto of this.listaProdottiAcquistatiDettaglioComp) {
                        let totaleParziale: number = 0;
                        totaleParziale = Math.round(((prodotto.prezzoSingolo * prodotto.numeroPezziAcquistati) + 0.001) * 100) / 100;
                        this.importoOrdine += totaleParziale;
                    }
                    this.importoOrdine = Math.round((this.importoOrdine + 0.001) * 100) / 100;
                }
            }
        })
    }
}
