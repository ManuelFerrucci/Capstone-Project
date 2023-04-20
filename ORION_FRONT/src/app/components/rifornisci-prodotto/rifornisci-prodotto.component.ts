import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Corda } from 'src/app/interface/corda.interface';
import { Palline } from 'src/app/interface/palline.interface';
import { Racchetta } from 'src/app/interface/racchetta.interface';
import { FiltroRicercaProdottoService } from 'src/app/service/filtro-ricerca-prodotto.service';
import { Maglietta } from 'src/app/interface/maglietta.interface';
import { Pantaloncino } from 'src/app/interface/pantaloncino.interface';
import { Borsoni } from 'src/app/interface/borsoni.interface';
import { Scarpe } from 'src/app/interface/scarpe.interface';
import { ModificaProdottoService } from 'src/app/service/modifica-prodotto.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { UtenteCorrente } from 'src/app/interface/utente-corrente.interface';

@Component({
    selector: 'app-rifornisci-prodotto',
    templateUrl: './rifornisci-prodotto.component.html',
    styleUrls: ['./rifornisci-prodotto.component.scss']
})
export class RifornisciProdottoComponent implements OnInit {

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

    campanello: boolean = false;

    alertNumeroNegativo: boolean = false;

    categoriaRilevata: string = '';

    listaRacchette: Racchetta[] = [];
    listaPalline: Palline[] = [];
    listaCorde: Corda[] = [];
    listaMagliette: Maglietta[] = [];
    listaPantaloncini: Pantaloncino[] = [];
    listaBorsoni: Borsoni[] = [];
    listaScarpe: Scarpe[] = [];

    decisioneRifornimento: number = 0;

    racchettaDaRifornire: Racchetta = {
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

    tuboPallineDaRifornire: Palline = {
        id: 0,
        nome: '',
        prezzo: 0,
        disponibilitaProdotto: '',
        categoriaProdotto: 'Palline',
        marchioPallineTennis: '',
        quantitaInTuboPallineTennis: '',
        tipoSuperficieDiGioco: '',
        pezziDisponibili: 0
    }

    cordaDaRifornire: Corda = {
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
    }

    magliettaDaRifornire: Maglietta = {
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
    }

    pantaloncinoDaRifornire: Pantaloncino = {
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
    }

    borsoneDaRifornire: Borsoni = {
        id: 0,
        nome: '',
        prezzo: 0,
        disponibilitaProdotto: '',
        categoriaProdotto: 'Borsoni',
        marchio: '',
        capacitaBorsaTennis: '',
        isolamentoTermico: false,
        pezziDisponibili: 0
    }

    scarpeDaRifornire: Scarpe = {
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
    }

    constructor(private activRoute: ActivatedRoute, private modProdSrv: ModificaProdottoService, private filtPrSrv: FiltroRicercaProdottoService, private auth: AuthServiceService) { }

    ngOnInit(): void {
        this.auth.isAuthenticated();
        this.ricavaListaUtenti();
        this.prendiUtente();

        let idNewModificaProd: number = this.activRoute.snapshot.params['id'];
        this.decisioneRifornimento = idNewModificaProd;

        this.filtPrSrv.prendiRacchette().subscribe((ris) => {
            this.listaRacchette = ris;
            for (let racchetta of this.listaRacchette) {
                if (racchetta.id == idNewModificaProd) {
                    this.categoriaRilevata = 'Racchette';
                    this.racchettaDaRifornire = racchetta;
                    console.log(this.racchettaDaRifornire);
                }
            }
        })

        this.filtPrSrv.prendiPalline().subscribe((ris) => {
            this.listaPalline = ris;
            for (let palline of this.listaPalline) {
                if (palline.id == idNewModificaProd) {
                    this.categoriaRilevata = 'Palline';
                    this.tuboPallineDaRifornire = palline;
                    console.log(this.tuboPallineDaRifornire);
                }
            }
        })

        this.filtPrSrv.prendiCorde().subscribe((ris) => {
            this.listaCorde = ris;
            for (let corda of this.listaCorde) {
                if (corda.id == idNewModificaProd) {
                    this.categoriaRilevata = 'Corde';
                    this.cordaDaRifornire = corda;
                    console.log(this.cordaDaRifornire);
                }
            }
        })

        this.filtPrSrv.prendiMagliette().subscribe((ris) => {
            this.listaMagliette = ris;
            for (let maglietta of this.listaMagliette) {
                if (maglietta.id == idNewModificaProd) {
                    this.categoriaRilevata = 'Magliette';
                    this.magliettaDaRifornire = maglietta;
                    console.log(this.magliettaDaRifornire);
                }
            }
        })

        this.filtPrSrv.prendiPantaloncini().subscribe((ris) => {
            this.listaPantaloncini = ris;
            for (let pantaloncino of this.listaPantaloncini) {
                if (pantaloncino.id == idNewModificaProd) {
                    this.categoriaRilevata = 'Pantaloncini';
                    this.pantaloncinoDaRifornire = pantaloncino;
                    console.log(this.pantaloncinoDaRifornire);
                }
            }
        })

        this.filtPrSrv.prendiBorsoni().subscribe((ris) => {
            this.listaBorsoni = ris;
            for (let borsone of this.listaBorsoni) {
                if (borsone.id == idNewModificaProd) {
                    this.categoriaRilevata = 'Borsoni';
                    this.borsoneDaRifornire = borsone;
                    console.log(this.borsoneDaRifornire);
                }
            }
        })

        this.filtPrSrv.prendiScarpe().subscribe((ris) => {
            this.listaScarpe = ris;
            for (let scarpe of this.listaScarpe) {
                if (scarpe.id == idNewModificaProd) {
                    this.categoriaRilevata = 'Scarpe';
                    this.scarpeDaRifornire = scarpe;
                    console.log(this.scarpeDaRifornire);
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

    verificaCampiVuoti() {
        let numeroPezziDaRifornire = <HTMLInputElement>document.querySelector('#numeroPezziDaRifornire');

        let buttonRifornisciProdotto = <HTMLButtonElement>document.querySelector('#buttonRifornisciProdotto');

        if (numeroPezziDaRifornire.value.trim() == '') {
            buttonRifornisciProdotto.disabled = true;
        } else {
            buttonRifornisciProdotto.disabled = false;
        }
    }

    verificaNumeriNegativiInput() {
        this.alertNumeroNegativo = false;

        let numeroPezziDaRifornire = <HTMLInputElement>document.querySelector('#numeroPezziDaRifornire');

        let buttonRifornisciProdotto = <HTMLButtonElement>document.querySelector('#buttonRifornisciProdotto');

        if (parseFloat(numeroPezziDaRifornire.value.trim()) < 0) {
            buttonRifornisciProdotto.disabled = true;
            this.alertNumeroNegativo = true;
        }
    }

    rifornisciRacchetta(formRifornimentoRacchetta: NgForm) {
        let numeroPezziDaRifornire = <HTMLInputElement>document.querySelector('#numeroPezziDaRifornire');
        this.racchettaDaRifornire.pezziDisponibili = this.racchettaDaRifornire.pezziDisponibili + parseInt(numeroPezziDaRifornire.value);

        this.modProdSrv.modificaRacchetta(this.racchettaDaRifornire);

        let popupRifornimentoProdotto = <HTMLDivElement>document.querySelector('#popupRifornimentoProdotto');
        let contenitoreFormRifornimento = <HTMLDivElement>document.querySelector('#contenitoreFormRifornimento');
        popupRifornimentoProdotto.classList.remove('inattivo');
        contenitoreFormRifornimento.classList.add('inattivo');
    }

    rifornisciPalline(formRifornimentoPalline: NgForm) {
        let numeroPezziDaRifornire = <HTMLInputElement>document.querySelector('#numeroPezziDaRifornire');
        this.tuboPallineDaRifornire.pezziDisponibili = this.tuboPallineDaRifornire.pezziDisponibili + parseInt(numeroPezziDaRifornire.value);

        this.modProdSrv.modificaPalline(this.tuboPallineDaRifornire);

        let popupRifornimentoProdotto = <HTMLDivElement>document.querySelector('#popupRifornimentoProdotto');
        let contenitoreFormRifornimento = <HTMLDivElement>document.querySelector('#contenitoreFormRifornimento');
        popupRifornimentoProdotto.classList.remove('inattivo');
        contenitoreFormRifornimento.classList.add('inattivo');
    }

    rifornisciCorde(formRifornimentoCorde: NgForm) {
        let numeroPezziDaRifornire = <HTMLInputElement>document.querySelector('#numeroPezziDaRifornire');
        this.cordaDaRifornire.pezziDisponibili = this.cordaDaRifornire.pezziDisponibili + parseInt(numeroPezziDaRifornire.value);

        this.modProdSrv.modificaCorda(this.cordaDaRifornire);

        let popupRifornimentoProdotto = <HTMLDivElement>document.querySelector('#popupRifornimentoProdotto');
        let contenitoreFormRifornimento = <HTMLDivElement>document.querySelector('#contenitoreFormRifornimento');
        popupRifornimentoProdotto.classList.remove('inattivo');
        contenitoreFormRifornimento.classList.add('inattivo');
    }

    rifornisciMagliette(formRifornimentoMagliette: NgForm) {
        let numeroPezziDaRifornire = <HTMLInputElement>document.querySelector('#numeroPezziDaRifornire');
        this.magliettaDaRifornire.pezziDisponibili = this.magliettaDaRifornire.pezziDisponibili + parseInt(numeroPezziDaRifornire.value);

        this.modProdSrv.modificaMaglietta(this.magliettaDaRifornire);

        let popupRifornimentoProdotto = <HTMLDivElement>document.querySelector('#popupRifornimentoProdotto');
        let contenitoreFormRifornimento = <HTMLDivElement>document.querySelector('#contenitoreFormRifornimento');
        popupRifornimentoProdotto.classList.remove('inattivo');
        contenitoreFormRifornimento.classList.add('inattivo');
    }

    rifornisciPantaloncini(formRifornimentoPantaloncini: NgForm) {
        let numeroPezziDaRifornire = <HTMLInputElement>document.querySelector('#numeroPezziDaRifornire');
        this.pantaloncinoDaRifornire.pezziDisponibili = this.pantaloncinoDaRifornire.pezziDisponibili + parseInt(numeroPezziDaRifornire.value);

        this.modProdSrv.modificaPantaloncino(this.pantaloncinoDaRifornire);

        let popupRifornimentoProdotto = <HTMLDivElement>document.querySelector('#popupRifornimentoProdotto');
        let contenitoreFormRifornimento = <HTMLDivElement>document.querySelector('#contenitoreFormRifornimento');
        popupRifornimentoProdotto.classList.remove('inattivo');
        contenitoreFormRifornimento.classList.add('inattivo');
    }

    rifornisciBorsoni(formRifornimentoBorsoni: NgForm) {
        let numeroPezziDaRifornire = <HTMLInputElement>document.querySelector('#numeroPezziDaRifornire');
        this.borsoneDaRifornire.pezziDisponibili = this.borsoneDaRifornire.pezziDisponibili + parseInt(numeroPezziDaRifornire.value);

        this.modProdSrv.modificaBorsone(this.borsoneDaRifornire);

        let popupRifornimentoProdotto = <HTMLDivElement>document.querySelector('#popupRifornimentoProdotto');
        let contenitoreFormRifornimento = <HTMLDivElement>document.querySelector('#contenitoreFormRifornimento');
        popupRifornimentoProdotto.classList.remove('inattivo');
        contenitoreFormRifornimento.classList.add('inattivo');
    }

    rifornisciScarpe(formRifornimentoScarpe: NgForm) {
        let numeroPezziDaRifornire = <HTMLInputElement>document.querySelector('#numeroPezziDaRifornire');
        this.scarpeDaRifornire.pezziDisponibili = this.scarpeDaRifornire.pezziDisponibili + parseInt(numeroPezziDaRifornire.value);

        this.modProdSrv.modificaScarpe(this.scarpeDaRifornire);

        let popupRifornimentoProdotto = <HTMLDivElement>document.querySelector('#popupRifornimentoProdotto');
        let contenitoreFormRifornimento = <HTMLDivElement>document.querySelector('#contenitoreFormRifornimento');
        popupRifornimentoProdotto.classList.remove('inattivo');
        contenitoreFormRifornimento.classList.add('inattivo');
    }
}
