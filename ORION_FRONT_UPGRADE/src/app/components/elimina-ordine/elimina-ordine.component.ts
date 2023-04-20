import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Borsoni } from 'src/app/interface/borsoni.interface';
import { Corda } from 'src/app/interface/corda.interface';
import { Maglietta } from 'src/app/interface/maglietta.interface';
import { Ordine } from 'src/app/interface/ordine.interface';
import { Palline } from 'src/app/interface/palline.interface';
import { Pantaloncino } from 'src/app/interface/pantaloncino.interface';
import { ProdottoAcquistato } from 'src/app/interface/prodotto-acquistato.interface';
import { Racchetta } from 'src/app/interface/racchetta.interface';
import { Scarpe } from 'src/app/interface/scarpe.interface';
import { UtenteCorrente } from 'src/app/interface/utente-corrente.interface';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { EliminaOrdineService } from 'src/app/service/elimina-ordine.service';
import { FiltroRicercaProdottoService } from 'src/app/service/filtro-ricerca-prodotto.service';
import { ListaOrdiniService } from 'src/app/service/lista-ordini.service';
import { ModificaProdottoService } from 'src/app/service/modifica-prodotto.service';

@Component({
    selector: 'app-elimina-ordine',
    templateUrl: './elimina-ordine.component.html',
    styleUrls: ['./elimina-ordine.component.scss']
})
export class EliminaOrdineComponent implements OnInit {

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

    listaOrdini: Ordine[] = [];

    listaPrdAcq: ProdottoAcquistato[] = [];

    listaRacchette: Racchetta[] = [];
    listaPalline: Palline[] = [];
    listaCorde: Corda[] = [];
    listaMagliette: Maglietta[] = [];
    listaPantaloncini: Pantaloncino[] = [];
    listaBorsoni: Borsoni[] = [];
    listaScarpe: Scarpe[] = [];

    ordineDaEliminare: Ordine = {
        id: 0,
        dataOrdine: new Date(),
        cliente: '',
        prodottiAcquistati: []
    }

    decisioneEliminazione: number = 0;

    constructor(private activRoute: ActivatedRoute, private lisOrdSrv: ListaOrdiniService, private elimOrd: EliminaOrdineService, private filtPrSrv: FiltroRicercaProdottoService, private modProd: ModificaProdottoService, private auth: AuthServiceService) { }

    ngOnInit(): void {
        this.auth.isAuthenticated();
        this.ricavaListaUtenti();
        this.prendiUtente();

        let idNewEliminaOrd: number = this.activRoute.snapshot.params['id'];
        this.decisioneEliminazione = idNewEliminaOrd;

        this.lisOrdSrv.prendiListaOrdini().subscribe((ris) => {
            this.listaOrdini = ris;
            for (let ordine of this.listaOrdini) {
                if (ordine.id == idNewEliminaOrd) {
                    this.ordineDaEliminare = ordine;
                    this.listaPrdAcq = ordine.prodottiAcquistati;
                }
            }
        })
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

    eliminaOrdineDef(id: number) {

        this.filtPrSrv.prendiRacchette().subscribe((ris) => {
            this.listaRacchette = ris;
            for (let prod of this.listaPrdAcq) {
                for (let racchetta of this.listaRacchette) {
                    if (racchetta.nome == prod.nome) {
                        let racchettaDaReintegrare: Racchetta = {
                            id: 0,
                            nome: '',
                            prezzo: 0,
                            disponibilitaProdotto: '',
                            categoriaProdotto: 'Racchette',
                            marchioRacchetta: '',
                            larghezzaPiattoCorde: '',
                            peso: 0,
                            bilanciamento: 0,
                            lunghezza: 0,
                            schemaCordeRacchetta: '',
                            grandezzaManicoRacchetta: '',
                            servitaConFodero: false,
                            servitaIncordata: false,
                            pezziDisponibili: 0
                        };
                        racchettaDaReintegrare = racchetta;
                        racchettaDaReintegrare.pezziDisponibili = (racchettaDaReintegrare.pezziDisponibili + prod.numeroPezziAcquistati);
                        this.modProd.modificaRacchetta(racchettaDaReintegrare);
                    }
                }
            }
        })

        this.filtPrSrv.prendiPalline().subscribe((ris) => {
            this.listaPalline = ris;
            for (let prod of this.listaPrdAcq) {
                for (let palline of this.listaPalline) {
                    if (palline.nome == prod.nome) {
                        let tuboPallineDaReintegrare: Palline = {
                            id: 0,
                            nome: '',
                            prezzo: 0,
                            disponibilitaProdotto: '',
                            categoriaProdotto: 'Palline',
                            marchioPallineTennis: '',
                            quantitaInTuboPallineTennis: '',
                            tipoSuperficieDiGioco: '',
                            pezziDisponibili: 0
                        };
                        tuboPallineDaReintegrare = palline;
                        tuboPallineDaReintegrare.pezziDisponibili = (tuboPallineDaReintegrare.pezziDisponibili + prod.numeroPezziAcquistati);
                        this.modProd.modificaPalline(tuboPallineDaReintegrare);
                    }
                }
            }
        })

        this.filtPrSrv.prendiCorde().subscribe((ris) => {
            this.listaCorde = ris;
            for (let prod of this.listaPrdAcq) {
                for (let corda of this.listaCorde) {
                    if (corda.nome == prod.nome) {
                        let cordaDaReintegrare: Corda = {
                            id: 0,
                            nome: '',
                            prezzo: 0,
                            disponibilitaProdotto: '',
                            categoriaProdotto: 'Corde',
                            marchioCordaTennis: '',
                            calibroCorda: '',
                            coloreCorda: '',
                            tipoSetVenditaCordaTennis: '',
                            materialeCordaTennis: '',
                            pezziDisponibili: 0
                        };
                        cordaDaReintegrare = corda;
                        cordaDaReintegrare.pezziDisponibili = (cordaDaReintegrare.pezziDisponibili + prod.numeroPezziAcquistati);
                        this.modProd.modificaCorda(cordaDaReintegrare);
                    }
                }
            }
        })

        this.filtPrSrv.prendiMagliette().subscribe((ris) => {
            this.listaMagliette = ris;
            for (let prod of this.listaPrdAcq) {
                for (let maglietta of this.listaMagliette) {
                    if (maglietta.nome == prod.nome) {
                        let magliettaDaReintegrare: Maglietta = {
                            id: 0,
                            nome: '',
                            prezzo: 0,
                            disponibilitaProdotto: '',
                            categoriaProdotto: 'Magliette',
                            destinatarioAbbigliamento: '',
                            marchio: '',
                            tagliaAbbigliamento: '',
                            colore: '',
                            tipoColloMaglietta: '',
                            pezziDisponibili: 0
                        };
                        magliettaDaReintegrare = maglietta;
                        magliettaDaReintegrare.pezziDisponibili = (magliettaDaReintegrare.pezziDisponibili + prod.numeroPezziAcquistati);
                        this.modProd.modificaMaglietta(magliettaDaReintegrare);
                    }
                }
            }
        })

        this.filtPrSrv.prendiPantaloncini().subscribe((ris) => {
            this.listaPantaloncini = ris;
            for (let prod of this.listaPrdAcq) {
                for (let pantaloncino of this.listaPantaloncini) {
                    if (pantaloncino.nome == prod.nome) {
                        let pantaloncinoDaReintegrare: Pantaloncino = {
                            id: 0,
                            nome: '',
                            prezzo: 0,
                            disponibilitaProdotto: '',
                            categoriaProdotto: 'Pantaloncini',
                            destinatarioAbbigliamento: '',
                            marchio: '',
                            tagliaAbbigliamento: '',
                            colore: '',
                            lunghezzaPantaloncino: '',
                            taschePantaloncino: '',
                            pezziDisponibili: 0
                        };
                        pantaloncinoDaReintegrare = pantaloncino;
                        pantaloncinoDaReintegrare.pezziDisponibili = (pantaloncinoDaReintegrare.pezziDisponibili + prod.numeroPezziAcquistati);
                        this.modProd.modificaPantaloncino(pantaloncinoDaReintegrare);
                    }
                }
            }
        })

        this.filtPrSrv.prendiBorsoni().subscribe((ris) => {
            this.listaBorsoni = ris;
            for (let prod of this.listaPrdAcq) {
                for (let borsone of this.listaBorsoni) {
                    if (borsone.nome == prod.nome) {
                        let borsoneDaReintegrare: Borsoni = {
                            id: 0,
                            nome: '',
                            prezzo: 0,
                            disponibilitaProdotto: '',
                            categoriaProdotto: 'Borsoni',
                            marchio: '',
                            capacitaBorsaTennis: '',
                            isolamentoTermico: false,
                            pezziDisponibili: 0
                        };
                        borsoneDaReintegrare = borsone;
                        borsoneDaReintegrare.pezziDisponibili = (borsoneDaReintegrare.pezziDisponibili + prod.numeroPezziAcquistati);
                        this.modProd.modificaBorsone(borsoneDaReintegrare);
                    }
                }
            }
        })

        this.filtPrSrv.prendiScarpe().subscribe((ris) => {
            this.listaScarpe = ris;
            for (let prod of this.listaPrdAcq) {
                for (let scarpe of this.listaScarpe) {
                    if (scarpe.nome == prod.nome) {
                        let scarpeDaReintegrare: Scarpe = {
                            id: 0,
                            nome: '',
                            prezzo: 0,
                            disponibilitaProdotto: '',
                            categoriaProdotto: 'Scarpe',
                            marchio: '',
                            destinatarioAbbigliamento: '',
                            tipoSuperficieDiGioco: '',
                            tagliaScarpe: '',
                            colore: '',
                            pezziDisponibili: 0
                        };
                        scarpeDaReintegrare = scarpe;
                        scarpeDaReintegrare.pezziDisponibili = (scarpeDaReintegrare.pezziDisponibili + prod.numeroPezziAcquistati);
                        this.modProd.modificaScarpe(scarpeDaReintegrare);
                    }
                }
            }
        })

        this.elimOrd.eliminaOrdine(id);

        let popupEliminaOrdine = <HTMLDivElement>document.querySelector('#popupEliminaOrdine');
        let contenitoreEliminazione = <HTMLDivElement>document.querySelector('#contenitoreEliminazione');
        popupEliminaOrdine.classList.remove('inattivo');
        contenitoreEliminazione.classList.add('inattivo');
    }
}
