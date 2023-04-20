import { Component, OnInit } from '@angular/core';
import { ProdottiCatalogoService } from 'src/app/service/prodotti-catalogo.service';
import { ModificaProdottoService } from 'src/app/service/modifica-prodotto.service';
import { NgForm } from '@angular/forms';
import { Ordine } from 'src/app/interface/ordine.interface';
import { ProdottoAcquistato } from 'src/app/interface/prodotto-acquistato.interface';
import { FiltroRicercaProdottoService } from 'src/app/service/filtro-ricerca-prodotto.service';
import { Racchetta } from 'src/app/interface/racchetta.interface';
import { Palline } from 'src/app/interface/palline.interface';
import { Corda } from 'src/app/interface/corda.interface';
import { Maglietta } from 'src/app/interface/maglietta.interface';
import { Pantaloncino } from 'src/app/interface/pantaloncino.interface';
import { Borsoni } from 'src/app/interface/borsoni.interface';
import { Scarpe } from 'src/app/interface/scarpe.interface';
import { InserisciOrdineService } from 'src/app/service/inserisci-ordine.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { UtenteCorrente } from 'src/app/interface/utente-corrente.interface';

@Component({
    selector: 'app-inserisci-ordine',
    templateUrl: './inserisci-ordine.component.html',
    styleUrls: ['./inserisci-ordine.component.scss']
})
export class InserisciOrdineComponent implements OnInit {

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

    alertErrore: boolean = false;
    alertErroreNumeroNegativo: boolean = false;

    listaProdotti: any = [];

    listaProdottiAcq: ProdottoAcquistato[] = [];

    listaRacchette: Racchetta[] = [];
    listaPalline: Palline[] = [];
    listaCorde: Corda[] = [];
    listaMagliette: Maglietta[] = [];
    listaPantaloncini: Pantaloncino[] = [];
    listaBorsoni: Borsoni[] = [];
    listaScarpe: Scarpe[] = [];

    listaBoh: [] = [];

    ordineDaCreare: Ordine = {
        id: 10000,
        dataOrdine: new Date(),
        cliente: 'NomeDefault',
        prodottiAcquistati: this.listaProdottiAcq
    }

    constructor(private prdCatSrv: ProdottiCatalogoService, private filtrProd: FiltroRicercaProdottoService, private ordSrv: InserisciOrdineService, private modPrdSrv: ModificaProdottoService, private auth: AuthServiceService) { }

    ngOnInit(): void {
        this.auth.isAuthenticated();
        this.ricavaListaUtenti();
        this.prendiUtente();
        this.visualizzaProdotti();
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

    visualizzaProdotti() {
        this.prdCatSrv.prendiListaProdotti().subscribe((ris) => {
            console.log(ris);
            this.listaProdotti = ris;
        });
    }

    inserisciInLista() {

        let selectProdottoDaAcquistare = <HTMLSelectElement>document.querySelector('#selectProdottoDaAcquistare');
        let pezziDaAcquistare = <HTMLInputElement>document.querySelector('#pezziDaAcquistare');

        this.filtrProd.prendiRacchette().subscribe((ris) => {
            // console.log(ris);
            this.listaRacchette = ris;
            for (let rac of this.listaRacchette) {
                if (rac.nome == selectProdottoDaAcquistare.value) {
                    let prodottoDaAcquistareRac: ProdottoAcquistato = {
                        id: 10000,
                        nome: rac.nome,
                        prezzoSingolo: rac.prezzo,
                        categoriaProdotto: rac.categoriaProdotto,
                        numeroPezziAcquistati: parseInt(pezziDaAcquistare.value),
                        prodotto: rac
                    }

                    if (prodottoDaAcquistareRac.numeroPezziAcquistati > rac.pezziDisponibili) {
                        prodottoDaAcquistareRac.numeroPezziAcquistati = rac.pezziDisponibili;
                    }

                    this.listaProdottiAcq.push(prodottoDaAcquistareRac);
                }
            }
        })

        this.filtrProd.prendiPalline().subscribe((ris) => {
            // console.log(ris);
            this.listaPalline = ris;
            for (let pal of this.listaPalline) {
                if (pal.nome == selectProdottoDaAcquistare.value) {
                    let prodottoDaAcquistarePal: ProdottoAcquistato = {
                        id: 10000,
                        nome: pal.nome,
                        prezzoSingolo: pal.prezzo,
                        categoriaProdotto: pal.categoriaProdotto,
                        numeroPezziAcquistati: parseInt(pezziDaAcquistare.value),
                        prodotto: pal
                    }

                    if (prodottoDaAcquistarePal.numeroPezziAcquistati > pal.pezziDisponibili) {
                        prodottoDaAcquistarePal.numeroPezziAcquistati = pal.pezziDisponibili;
                    }

                    this.listaProdottiAcq.push(prodottoDaAcquistarePal);
                }
            }
        })

        this.filtrProd.prendiCorde().subscribe((ris) => {
            // console.log(ris);
            this.listaCorde = ris;
            for (let cor of this.listaCorde) {
                if (cor.nome == selectProdottoDaAcquistare.value) {
                    let prodottoDaAcquistareCor: ProdottoAcquistato = {
                        id: 10000,
                        nome: cor.nome,
                        prezzoSingolo: cor.prezzo,
                        categoriaProdotto: cor.categoriaProdotto,
                        numeroPezziAcquistati: parseInt(pezziDaAcquistare.value),
                        prodotto: cor
                    }

                    if (prodottoDaAcquistareCor.numeroPezziAcquistati > cor.pezziDisponibili) {
                        prodottoDaAcquistareCor.numeroPezziAcquistati = cor.pezziDisponibili;
                    }

                    this.listaProdottiAcq.push(prodottoDaAcquistareCor);
                }
            }
        })

        this.filtrProd.prendiMagliette().subscribe((ris) => {
            // console.log(ris);
            this.listaMagliette = ris;
            for (let mag of this.listaMagliette) {
                if (mag.nome == selectProdottoDaAcquistare.value) {
                    let prodottoDaAcquistareMag: ProdottoAcquistato = {
                        id: 10000,
                        nome: mag.nome,
                        prezzoSingolo: mag.prezzo,
                        categoriaProdotto: mag.categoriaProdotto,
                        numeroPezziAcquistati: parseInt(pezziDaAcquistare.value),
                        prodotto: mag
                    }

                    if (prodottoDaAcquistareMag.numeroPezziAcquistati > mag.pezziDisponibili) {
                        prodottoDaAcquistareMag.numeroPezziAcquistati = mag.pezziDisponibili;
                    }

                    this.listaProdottiAcq.push(prodottoDaAcquistareMag);
                }
            }
        })

        this.filtrProd.prendiPantaloncini().subscribe((ris) => {
            // console.log(ris);
            this.listaPantaloncini = ris;
            for (let pant of this.listaPantaloncini) {
                if (pant.nome == selectProdottoDaAcquistare.value) {
                    let prodottoDaAcquistarePant: ProdottoAcquistato = {
                        id: 10000,
                        nome: pant.nome,
                        prezzoSingolo: pant.prezzo,
                        categoriaProdotto: pant.categoriaProdotto,
                        numeroPezziAcquistati: parseInt(pezziDaAcquistare.value),
                        prodotto: pant
                    }

                    if (prodottoDaAcquistarePant.numeroPezziAcquistati > pant.pezziDisponibili) {
                        prodottoDaAcquistarePant.numeroPezziAcquistati = pant.pezziDisponibili;
                    }

                    this.listaProdottiAcq.push(prodottoDaAcquistarePant);
                }
            }
        })

        this.filtrProd.prendiBorsoni().subscribe((ris) => {
            // console.log(ris);
            this.listaBorsoni = ris;
            for (let bor of this.listaBorsoni) {
                if (bor.nome == selectProdottoDaAcquistare.value) {
                    let prodottoDaAcquistareBor: ProdottoAcquistato = {
                        id: 10000,
                        nome: bor.nome,
                        prezzoSingolo: bor.prezzo,
                        categoriaProdotto: bor.categoriaProdotto,
                        numeroPezziAcquistati: parseInt(pezziDaAcquistare.value),
                        prodotto: bor
                    }

                    if (prodottoDaAcquistareBor.numeroPezziAcquistati > bor.pezziDisponibili) {
                        prodottoDaAcquistareBor.numeroPezziAcquistati = bor.pezziDisponibili;
                    }

                    this.listaProdottiAcq.push(prodottoDaAcquistareBor);
                }
            }
        })

        this.filtrProd.prendiScarpe().subscribe((ris) => {
            // console.log(ris);
            this.listaScarpe = ris;
            for (let scar of this.listaScarpe) {
                if (scar.nome == selectProdottoDaAcquistare.value) {
                    let prodottoDaAcquistareScar: ProdottoAcquistato = {
                        id: 10000,
                        nome: scar.nome,
                        prezzoSingolo: scar.prezzo,
                        categoriaProdotto: scar.categoriaProdotto,
                        numeroPezziAcquistati: parseInt(pezziDaAcquistare.value),
                        prodotto: scar
                    }

                    if (prodottoDaAcquistareScar.numeroPezziAcquistati > scar.pezziDisponibili) {
                        prodottoDaAcquistareScar.numeroPezziAcquistati = scar.pezziDisponibili;
                    }

                    this.listaProdottiAcq.push(prodottoDaAcquistareScar);
                }
            }
        })

        // console.log(this.ordineDaCreare);
    }

    rimuoviDallaLista(nomeProd: string) {
        let indiceDaCancellare: number = 0;
        for (let prod of this.listaProdottiAcq) {
            if (prod.nome == nomeProd) {
                indiceDaCancellare = (this.listaProdottiAcq.indexOf(prod));
            }
        }
        // console.log(nomeProd);
        this.listaProdottiAcq.splice(indiceDaCancellare, 1);
        // console.log(this.listaProdottiAcq);
        // console.log(this.ordineDaCreare);
    }

    verificaValiditaInput() {
        this.alertErrore = false;

        let inputclienteOrdine = <HTMLInputElement>document.querySelector('#clienteOrdine');
        let pezziDaAcquistare = <HTMLInputElement>document.querySelector('#pezziDaAcquistare');

        let buttonInserisciOrdine = <HTMLButtonElement>document.querySelector('#buttonInserisciOrdine');

        if (inputclienteOrdine.value.trim() == '' || pezziDaAcquistare.value.trim() == '') {
            buttonInserisciOrdine.disabled = true;
            this.alertErrore = true;
        } else if (parseFloat(pezziDaAcquistare.value.trim()) < 1) {
            buttonInserisciOrdine.disabled = true;
            this.alertErrore = true;
        } else {
            buttonInserisciOrdine.disabled = false;
        }
    }

    verificaNumeriNegativi() {
        this.alertErroreNumeroNegativo = false;

        let pezziDaAcquistare = <HTMLInputElement>document.querySelector('#pezziDaAcquistare');

        let buttonInserisciOrdine = <HTMLButtonElement>document.querySelector('#buttonInserisciOrdine');

        if (parseFloat(pezziDaAcquistare.value.trim()) < 0) {
            buttonInserisciOrdine.disabled = true;
            this.alertErroreNumeroNegativo = true;
        }
    }

    verificaInserisciInLista() {
        let pezziDaAcquistare = <HTMLInputElement>document.querySelector('#pezziDaAcquistare');
        let buttonInserisciInLista = <HTMLButtonElement>document.querySelector('#buttonInserisciInLista');

        if (pezziDaAcquistare.value.trim() == '' || parseFloat(pezziDaAcquistare.value.trim()) < 1) {
            buttonInserisciInLista.disabled = true;
        } else {
            buttonInserisciInLista.disabled = false;
        }
    }

    creaOrdine(formOrdine: NgForm) {
        let inputclienteOrdine = <HTMLInputElement>document.querySelector('#clienteOrdine');
        let dataDelMomento = new Date();
        dataDelMomento.toISOString();

        this.ordineDaCreare.cliente = inputclienteOrdine.value;
        this.ordineDaCreare.dataOrdine = dataDelMomento;

        console.log(this.ordineDaCreare);

        if (this.listaProdottiAcq.length > 0) {

            for (let proddd of this.listaProdottiAcq) {

                this.filtrProd.prendiRacchette().subscribe((ris) => {
                    // console.log(ris);
                    this.listaRacchette = ris;
                    for (let rac of this.listaRacchette) {
                        if (rac.nome == proddd.nome) {
                            let racMod: Racchetta = rac;
                            racMod.pezziDisponibili = racMod.pezziDisponibili - proddd.numeroPezziAcquistati;
                            this.modPrdSrv.modificaRacchetta(racMod);
                        }
                    }
                })

                this.filtrProd.prendiPalline().subscribe((ris) => {
                    // console.log(ris);
                    this.listaPalline = ris;
                    for (let pal of this.listaPalline) {
                        if (pal.nome == proddd.nome) {
                            let palMod: Palline = pal;
                            palMod.pezziDisponibili = palMod.pezziDisponibili - proddd.numeroPezziAcquistati;
                            this.modPrdSrv.modificaPalline(palMod);
                        }
                    }
                })

                this.filtrProd.prendiCorde().subscribe((ris) => {
                    // console.log(ris);
                    this.listaCorde = ris;
                    for (let cor of this.listaCorde) {
                        if (cor.nome == proddd.nome) {
                            let corMod: Corda = cor;
                            corMod.pezziDisponibili = corMod.pezziDisponibili - proddd.numeroPezziAcquistati;
                            this.modPrdSrv.modificaCorda(corMod);
                        }
                    }
                })

                this.filtrProd.prendiMagliette().subscribe((ris) => {
                    // console.log(ris);
                    this.listaMagliette = ris;
                    for (let mag of this.listaMagliette) {
                        if (mag.nome == proddd.nome) {
                            let magMod: Maglietta = mag;
                            magMod.pezziDisponibili = magMod.pezziDisponibili - proddd.numeroPezziAcquistati;
                            this.modPrdSrv.modificaMaglietta(magMod);
                        }
                    }
                })

                this.filtrProd.prendiPantaloncini().subscribe((ris) => {
                    // console.log(ris);
                    this.listaPantaloncini = ris;
                    for (let pant of this.listaPantaloncini) {
                        if (pant.nome == proddd.nome) {
                            let pantMod: Pantaloncino = pant;
                            pantMod.pezziDisponibili = pantMod.pezziDisponibili - proddd.numeroPezziAcquistati;
                            this.modPrdSrv.modificaPantaloncino(pantMod);
                        }
                    }
                })

                this.filtrProd.prendiBorsoni().subscribe((ris) => {
                    // console.log(ris);
                    this.listaBorsoni = ris;
                    for (let bor of this.listaBorsoni) {
                        if (bor.nome == proddd.nome) {
                            let borMod: Borsoni = bor;
                            borMod.pezziDisponibili = borMod.pezziDisponibili - proddd.numeroPezziAcquistati;
                            this.modPrdSrv.modificaBorsone(borMod);
                        }
                    }
                })

                this.filtrProd.prendiScarpe().subscribe((ris) => {
                    // console.log(ris);
                    this.listaScarpe = ris;
                    for (let scar of this.listaScarpe) {
                        if (scar.nome == proddd.nome) {
                            let scarMod: Scarpe = scar;
                            scarMod.pezziDisponibili = scarMod.pezziDisponibili - proddd.numeroPezziAcquistati;
                            this.modPrdSrv.modificaScarpe(scarMod);
                        }
                    }
                })
            }

            this.ordSrv.creaOrdine(this.ordineDaCreare);

            let popupInserimentoCustomOrdini = <HTMLDivElement>document.querySelector('#popupInserimentoCustomOrdini');
            let formInserimentoOrdine = <HTMLFormElement>document.querySelector('#formInserimentoOrdine');
            let buttonIndietro = <HTMLButtonElement>document.querySelector('#buttonIndietro');
            popupInserimentoCustomOrdini.classList.remove('inattivo');
            formInserimentoOrdine.classList.add('inattivo');
            buttonIndietro.classList.add('inattivo');
        } else {
            let popupInserimentoCustomOrdiniERR = <HTMLDivElement>document.querySelector('#popupInserimentoCustomOrdiniERR');
            let formInserimentoOrdine = <HTMLFormElement>document.querySelector('#formInserimentoOrdine');
            let buttonIndietro = <HTMLButtonElement>document.querySelector('#buttonIndietro');
            popupInserimentoCustomOrdiniERR.classList.remove('inattivo');
            formInserimentoOrdine.classList.add('inattivo');
            buttonIndietro.classList.add('inattivo');
        }
    }

    rimettiInattivoPopupInserisciOrdine() {
        let popupInserimentoCustomOrdini = <HTMLDivElement>document.querySelector('#popupInserimentoCustomOrdini');
        popupInserimentoCustomOrdini.classList.add('inattivo');
    }

    rimettiInattivoPopupInserisciOrdineERR() {
        let popupInserimentoCustomOrdiniERR = <HTMLDivElement>document.querySelector('#popupInserimentoCustomOrdiniERR');
        popupInserimentoCustomOrdiniERR.classList.add('inattivo');
    }
}
