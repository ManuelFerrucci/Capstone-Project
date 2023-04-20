import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProdottiCatalogoService } from 'src/app/service/prodotti-catalogo.service';
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
    selector: 'app-modifica-prodotto',
    templateUrl: './modifica-prodotto.component.html',
    styleUrls: ['./modifica-prodotto.component.scss']
})
export class ModificaProdottoComponent implements OnInit {

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

    decisioneModifica: number = 0;

    racchettaDaModificare: Racchetta = {
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

    tuboPallineDaModificare: Palline = {
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

    cordaDaModificare: Corda = {
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

    magliettaDaModificare: Maglietta = {
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

    pantaloncinoDaModificare: Pantaloncino = {
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

    borsoneDaModificare: Borsoni = {
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

    scarpeDaModificare: Scarpe = {
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
        this.decisioneModifica = idNewModificaProd;

        this.filtPrSrv.prendiRacchette().subscribe((ris) => {
            this.listaRacchette = ris;
            for (let racchetta of this.listaRacchette) {
                if (racchetta.id == idNewModificaProd) {
                    this.racchettaDaModificare = racchetta;
                    this.categoriaRilevata = 'Racchette';
                }
            }
        })

        this.filtPrSrv.prendiPalline().subscribe((ris) => {
            this.listaPalline = ris;
            for (let palline of this.listaPalline) {
                if (palline.id == idNewModificaProd) {
                    this.tuboPallineDaModificare = palline;
                    this.categoriaRilevata = 'Palline';
                }
            }
        })

        this.filtPrSrv.prendiCorde().subscribe((ris) => {
            this.listaCorde = ris;
            for (let corda of this.listaCorde) {
                if (corda.id == idNewModificaProd) {
                    this.cordaDaModificare = corda;
                    this.categoriaRilevata = 'Corde';
                }
            }
        })

        this.filtPrSrv.prendiMagliette().subscribe((ris) => {
            this.listaMagliette = ris;
            for (let maglietta of this.listaMagliette) {
                if (maglietta.id == idNewModificaProd) {
                    this.magliettaDaModificare = maglietta;
                    this.categoriaRilevata = 'Magliette';
                }
            }
        })

        this.filtPrSrv.prendiPantaloncini().subscribe((ris) => {
            this.listaPantaloncini = ris;
            for (let pantaloncino of this.listaPantaloncini) {
                if (pantaloncino.id == idNewModificaProd) {
                    this.pantaloncinoDaModificare = pantaloncino;
                    this.categoriaRilevata = 'Pantaloncini';
                }
            }
        })

        this.filtPrSrv.prendiBorsoni().subscribe((ris) => {
            this.listaBorsoni = ris;
            for (let borsone of this.listaBorsoni) {
                if (borsone.id == idNewModificaProd) {
                    this.borsoneDaModificare = borsone;
                    this.categoriaRilevata = 'Borsoni';
                }
            }
        })

        this.filtPrSrv.prendiScarpe().subscribe((ris) => {
            this.listaScarpe = ris;
            for (let scarpe of this.listaScarpe) {
                if (scarpe.id == idNewModificaProd) {
                    this.scarpeDaModificare = scarpe;
                    this.categoriaRilevata = 'Scarpe';
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

    ////////// RACCHETTE //////////
    verificaCampiVuotiRacchetta() {
        let inputNomeRacchetta = <HTMLInputElement>document.querySelector('#nomeRacchetta');
        let inputPrezzoRacchetta = <HTMLInputElement>document.querySelector('#prezzoRacchetta');
        let inputPezziInizialiRacchetta = <HTMLInputElement>document.querySelector('#pezziInizialiRacchetta');
        let inputPesoRacchetta = <HTMLInputElement>document.querySelector('#pesoRacchetta');
        let inputBilanciamentoRacchetta = <HTMLInputElement>document.querySelector('#bilanciamentoRacchetta');
        let inputLunghezzaRacchetta = <HTMLInputElement>document.querySelector('#lunghezzaRacchetta');

        let buttonInserisciRacchetta = <HTMLButtonElement>document.querySelector('#inserisciRacchetta');

        if (inputNomeRacchetta.value.trim() == '' || inputPrezzoRacchetta.value.trim() == '' || inputPezziInizialiRacchetta.value.trim() == '' || inputPesoRacchetta.value.trim() == '' || inputBilanciamentoRacchetta.value.trim() == '' || inputLunghezzaRacchetta.value.trim() == '') {
            buttonInserisciRacchetta.disabled = true;
        } else {
            buttonInserisciRacchetta.disabled = false;
        }
    }

    verificaNumeriNegativiInputRacchetta() {
        this.alertNumeroNegativo = false;

        let inputPrezzoRacchetta = <HTMLInputElement>document.querySelector('#prezzoRacchetta');
        let inputPezziInizialiRacchetta = <HTMLInputElement>document.querySelector('#pezziInizialiRacchetta');
        let inputPesoRacchetta = <HTMLInputElement>document.querySelector('#pesoRacchetta');
        let inputBilanciamentoRacchetta = <HTMLInputElement>document.querySelector('#bilanciamentoRacchetta');
        let inputLunghezzaRacchetta = <HTMLInputElement>document.querySelector('#lunghezzaRacchetta');

        let buttonInserisciRacchetta = <HTMLButtonElement>document.querySelector('#inserisciRacchetta');

        if (parseFloat(inputPrezzoRacchetta.value.trim()) < 0 || parseInt(inputPezziInizialiRacchetta.value.trim()) < 0 || parseFloat(inputPesoRacchetta.value.trim()) < 0 || parseFloat(inputBilanciamentoRacchetta.value.trim()) < 0 || parseFloat(inputLunghezzaRacchetta.value.trim()) < 0) {
            buttonInserisciRacchetta.disabled = true;
            this.alertNumeroNegativo = true;
        }
    }

    verificaPresenzaNomeRacchetta() {
        this.campanello = false;

        let inputNomeRacchetta = <HTMLInputElement>document.querySelector('#nomeRacchetta');
        let buttonInserisciRacchetta = <HTMLButtonElement>document.querySelector('#inserisciRacchetta');

        this.filtPrSrv.prendiRacchette().subscribe((ris) => {
            this.listaRacchette = ris;
        });

        for (let i = 0; i < this.listaRacchette.length; i++) {
            let racchetta = this.listaRacchette[i];
            if (racchetta.nome == inputNomeRacchetta.value) {
                this.campanello = true;
                buttonInserisciRacchetta.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiPalline().subscribe((ris) => {
            this.listaPalline = ris;
        });

        for (let i = 0; i < this.listaPalline.length; i++) {
            let tuboPalline = this.listaPalline[i];
            if (tuboPalline.nome == inputNomeRacchetta.value) {
                this.campanello = true;
                buttonInserisciRacchetta.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiCorde().subscribe((ris) => {
            this.listaCorde = ris;
        });

        for (let i = 0; i < this.listaCorde.length; i++) {
            let corda = this.listaCorde[i];
            if (corda.nome == inputNomeRacchetta.value) {
                this.campanello = true;
                buttonInserisciRacchetta.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiMagliette().subscribe((ris) => {
            this.listaMagliette = ris;
        });

        for (let i = 0; i < this.listaMagliette.length; i++) {
            let maglietta = this.listaMagliette[i];
            if (maglietta.nome == inputNomeRacchetta.value) {
                this.campanello = true;
                buttonInserisciRacchetta.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiPantaloncini().subscribe((ris) => {
            this.listaPantaloncini = ris;
        });

        for (let i = 0; i < this.listaPantaloncini.length; i++) {
            let pantaloncino = this.listaPantaloncini[i];
            if (pantaloncino.nome == inputNomeRacchetta.value) {
                this.campanello = true;
                buttonInserisciRacchetta.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiBorsoni().subscribe((ris) => {
            this.listaBorsoni = ris;
        });

        for (let i = 0; i < this.listaBorsoni.length; i++) {
            let borsone = this.listaBorsoni[i];
            if (borsone.nome == inputNomeRacchetta.value) {
                this.campanello = true;
                buttonInserisciRacchetta.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiScarpe().subscribe((ris) => {
            this.listaScarpe = ris;
        });

        for (let i = 0; i < this.listaScarpe.length; i++) {
            let scarpe = this.listaScarpe[i];
            if (scarpe.nome == inputNomeRacchetta.value) {
                this.campanello = true;
                buttonInserisciRacchetta.disabled = true;
                break;
            }
        }
    }

    modificaRacchetta(formRacchetta: NgForm) {
        let inputNomeRacchetta = <HTMLInputElement>document.querySelector('#nomeRacchetta');
        let inputPrezzoRacchetta = <HTMLInputElement>document.querySelector('#prezzoRacchetta');
        let inputPezziInizialiRacchetta = <HTMLInputElement>document.querySelector('#pezziInizialiRacchetta');
        let selectMarchioRacchetta = <HTMLSelectElement>document.querySelector('#marchioRacchetta');
        let selectLarghezzaPiattoCordeRacchetta = <HTMLSelectElement>document.querySelector('#larghezzaPiattoCordeRacchetta');
        let inputPesoRacchetta = <HTMLInputElement>document.querySelector('#pesoRacchetta');
        let inputBilanciamentoRacchetta = <HTMLInputElement>document.querySelector('#bilanciamentoRacchetta');
        let inputLunghezzaRacchetta = <HTMLInputElement>document.querySelector('#lunghezzaRacchetta');
        let selectSchemaCordeRacchetta = <HTMLSelectElement>document.querySelector('#schemaCordeRacchetta');
        let selectGrandezzaManicoRacchetta = <HTMLSelectElement>document.querySelector('#grandezzaManicoRacchetta');
        let selectFornitaFoderoRacchetta = <HTMLSelectElement>document.querySelector('#fornitaFoderoRacchetta');
        let selectFornitaIncordataRacchetta = <HTMLSelectElement>document.querySelector('#fornitaIncordataRacchetta');

        let boolFodero: boolean = false;
        let boolIncordata: boolean = false;
        if (selectFornitaFoderoRacchetta.value == 'true') {
            boolFodero = true;
        }
        if (selectFornitaIncordataRacchetta.value == 'true') {
            boolIncordata = true;
        }

        this.racchettaDaModificare.nome = inputNomeRacchetta.value;
        this.racchettaDaModificare.prezzo = parseFloat(inputPrezzoRacchetta.value);
        this.racchettaDaModificare.pezziDisponibili = parseInt(inputPezziInizialiRacchetta.value);
        this.racchettaDaModificare.marchioRacchetta = selectMarchioRacchetta.value;
        this.racchettaDaModificare.larghezzaPiattoCorde = selectLarghezzaPiattoCordeRacchetta.value;
        this.racchettaDaModificare.peso = parseFloat(inputPesoRacchetta.value);
        this.racchettaDaModificare.bilanciamento = parseFloat(inputBilanciamentoRacchetta.value);
        this.racchettaDaModificare.lunghezza = parseFloat(inputLunghezzaRacchetta.value);
        this.racchettaDaModificare.schemaCordeRacchetta = selectSchemaCordeRacchetta.value;
        this.racchettaDaModificare.grandezzaManicoRacchetta = selectGrandezzaManicoRacchetta.value;
        this.racchettaDaModificare.servitaConFodero = boolFodero;
        this.racchettaDaModificare.servitaIncordata = boolIncordata;

        console.log(this.racchettaDaModificare);
        this.modProdSrv.modificaRacchetta(this.racchettaDaModificare);

        let popupInserimentoCustomRacchette = <HTMLDivElement>document.querySelector('#popupInserimentoCustomRacchette');
        let h1ModificaRacch = <HTMLHeadingElement>document.querySelector('#h1ModificaRacch');
        let formRacchette = <HTMLFormElement>document.querySelector('#formRacchette');
        popupInserimentoCustomRacchette.classList.remove('inattivo');
        h1ModificaRacch.classList.add('inattivo');
        formRacchette.classList.add('inattivo');
    }

    rimettiInattivoPopupRacchette() {
        let popupInserimentoCustomRacchette = <HTMLDivElement>document.querySelector('#popupInserimentoCustomRacchette');
        popupInserimentoCustomRacchette.classList.add('inattivo');
    }


    ////////// PALLINE //////////
    verificaCampiVuotiPalline() {
        let inputNomePalline = <HTMLInputElement>document.querySelector('#nomePalline');
        let inputPrezzoPalline = <HTMLInputElement>document.querySelector('#prezzoPalline');
        let inputPezziInizialiPalline = <HTMLInputElement>document.querySelector('#pezziInizialiPalline');

        let buttonInserisciTuboPalline = <HTMLButtonElement>document.querySelector('#inserisciTuboPalline');

        if (inputNomePalline.value.trim() == '' || inputPrezzoPalline.value.trim() == '' || inputPezziInizialiPalline.value.trim() == '') {
            buttonInserisciTuboPalline.disabled = true;
        } else {
            buttonInserisciTuboPalline.disabled = false;
        }
    }

    verificaNumeriNegativiInputPalline() {
        this.alertNumeroNegativo = false;

        let inputPrezzoPalline = <HTMLInputElement>document.querySelector('#prezzoPalline');
        let inputPezziInizialiPalline = <HTMLInputElement>document.querySelector('#pezziInizialiPalline');

        let buttonInserisciTuboPalline = <HTMLButtonElement>document.querySelector('#inserisciTuboPalline');

        if (parseFloat(inputPrezzoPalline.value.trim()) < 0 || parseInt(inputPezziInizialiPalline.value.trim()) < 0) {
            buttonInserisciTuboPalline.disabled = true;
            this.alertNumeroNegativo = true;
        }
    }

    verificaPresenzaNomePalline() {
        this.campanello = false;

        let inputNomePalline = <HTMLInputElement>document.querySelector('#nomePalline');
        let buttonInserisciTuboPalline = <HTMLButtonElement>document.querySelector('#inserisciTuboPalline');

        this.filtPrSrv.prendiRacchette().subscribe((ris) => {
            this.listaRacchette = ris;
        });

        for (let i = 0; i < this.listaRacchette.length; i++) {
            let racchetta = this.listaRacchette[i];
            if (racchetta.nome == inputNomePalline.value) {
                this.campanello = true;
                buttonInserisciTuboPalline.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiPalline().subscribe((ris) => {
            this.listaPalline = ris;
        });

        for (let i = 0; i < this.listaPalline.length; i++) {
            let tuboPalline = this.listaPalline[i];
            if (tuboPalline.nome == inputNomePalline.value) {
                this.campanello = true;
                buttonInserisciTuboPalline.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiCorde().subscribe((ris) => {
            this.listaCorde = ris;
        });

        for (let i = 0; i < this.listaCorde.length; i++) {
            let corda = this.listaCorde[i];
            if (corda.nome == inputNomePalline.value) {
                this.campanello = true;
                buttonInserisciTuboPalline.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiMagliette().subscribe((ris) => {
            this.listaMagliette = ris;
        });

        for (let i = 0; i < this.listaMagliette.length; i++) {
            let maglietta = this.listaMagliette[i];
            if (maglietta.nome == inputNomePalline.value) {
                this.campanello = true;
                buttonInserisciTuboPalline.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiPantaloncini().subscribe((ris) => {
            this.listaPantaloncini = ris;
        });

        for (let i = 0; i < this.listaPantaloncini.length; i++) {
            let pantaloncino = this.listaPantaloncini[i];
            if (pantaloncino.nome == inputNomePalline.value) {
                this.campanello = true;
                buttonInserisciTuboPalline.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiBorsoni().subscribe((ris) => {
            this.listaBorsoni = ris;
        });

        for (let i = 0; i < this.listaBorsoni.length; i++) {
            let borsone = this.listaBorsoni[i];
            if (borsone.nome == inputNomePalline.value) {
                this.campanello = true;
                buttonInserisciTuboPalline.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiScarpe().subscribe((ris) => {
            this.listaScarpe = ris;
        });

        for (let i = 0; i < this.listaScarpe.length; i++) {
            let scarpe = this.listaScarpe[i];
            if (scarpe.nome == inputNomePalline.value) {
                this.campanello = true;
                buttonInserisciTuboPalline.disabled = true;
                break;
            }
        }
    }

    modificaTuboPalline(formPallina: NgForm) {
        let inputNomePalline = <HTMLInputElement>document.querySelector('#nomePalline');
        let inputPrezzoPalline = <HTMLInputElement>document.querySelector('#prezzoPalline');
        let inputPezziInizialiPalline = <HTMLInputElement>document.querySelector('#pezziInizialiPalline');
        let selectMarchioPalline = <HTMLSelectElement>document.querySelector('#marchioPalline');
        let selectQuantitaInTuboPalline = <HTMLSelectElement>document.querySelector('#quantitaInTuboPalline');
        let selectTipoSuperficieDiGioco = <HTMLSelectElement>document.querySelector('#tipoSuperficieDiGioco');

        this.tuboPallineDaModificare.nome = inputNomePalline.value;
        this.tuboPallineDaModificare.prezzo = parseFloat(inputPrezzoPalline.value);
        this.tuboPallineDaModificare.pezziDisponibili = parseInt(inputPezziInizialiPalline.value);
        this.tuboPallineDaModificare.marchioPallineTennis = selectMarchioPalline.value;
        this.tuboPallineDaModificare.quantitaInTuboPallineTennis = selectQuantitaInTuboPalline.value;
        this.tuboPallineDaModificare.tipoSuperficieDiGioco = selectTipoSuperficieDiGioco.value;

        console.log(this.tuboPallineDaModificare);
        this.modProdSrv.modificaPalline(this.tuboPallineDaModificare);

        let popupInserimentoCustomPalline = <HTMLDivElement>document.querySelector('#popupInserimentoCustomPalline');
        let h1ModificaPall = <HTMLHeadingElement>document.querySelector('#h1ModificaPall');
        let formPalline = <HTMLFormElement>document.querySelector('#formPalline');
        popupInserimentoCustomPalline.classList.remove('inattivo');
        h1ModificaPall.classList.add('inattivo');
        formPalline.classList.add('inattivo');
    }

    rimettiInattivoPopupPalline() {
        let popupInserimentoCustomPalline = <HTMLDivElement>document.querySelector('#popupInserimentoCustomPalline');
        popupInserimentoCustomPalline.classList.add('inattivo');
    }

    ////////// CORDE //////////
    verificaCampiVuotiCorde() {
        let inputNomeCorde = <HTMLInputElement>document.querySelector('#nomeCorde');
        let inputPrezzoCorde = <HTMLInputElement>document.querySelector('#prezzoCorde');
        let inputPezziInizialiCorde = <HTMLInputElement>document.querySelector('#pezziInizialiCorde');

        let buttonInserisciCorda = <HTMLButtonElement>document.querySelector('#inserisciCorda');

        if (inputNomeCorde.value.trim() == '' || inputPrezzoCorde.value.trim() == '' || inputPezziInizialiCorde.value.trim() == '') {
            buttonInserisciCorda.disabled = true;
        } else {
            buttonInserisciCorda.disabled = false;
        }
    }

    verificaNumeriNegativiInputCorde() {
        this.alertNumeroNegativo = false;

        let inputPrezzoCorde = <HTMLInputElement>document.querySelector('#prezzoCorde');
        let inputPezziInizialiCorde = <HTMLInputElement>document.querySelector('#pezziInizialiCorde');

        let buttonInserisciCorda = <HTMLButtonElement>document.querySelector('#inserisciCorda');

        if (parseFloat(inputPrezzoCorde.value.trim()) < 0 || parseInt(inputPezziInizialiCorde.value.trim()) < 0) {
            buttonInserisciCorda.disabled = true;
            this.alertNumeroNegativo = true;
        }
    }

    verificaPresenzaNomeCorda() {
        this.campanello = false;

        let inputNomeCorde = <HTMLInputElement>document.querySelector('#nomeCorde');
        let buttonInserisciCorda = <HTMLButtonElement>document.querySelector('#inserisciCorda');

        this.filtPrSrv.prendiRacchette().subscribe((ris) => {
            this.listaRacchette = ris;
        });

        for (let i = 0; i < this.listaRacchette.length; i++) {
            let racchetta = this.listaRacchette[i];
            if (racchetta.nome == inputNomeCorde.value) {
                this.campanello = true;
                buttonInserisciCorda.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiPalline().subscribe((ris) => {
            this.listaPalline = ris;
        });

        for (let i = 0; i < this.listaPalline.length; i++) {
            let tuboPalline = this.listaPalline[i];
            if (tuboPalline.nome == inputNomeCorde.value) {
                this.campanello = true;
                buttonInserisciCorda.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiCorde().subscribe((ris) => {
            this.listaCorde = ris;
        });

        for (let i = 0; i < this.listaCorde.length; i++) {
            let corda = this.listaCorde[i];
            if (corda.nome == inputNomeCorde.value) {
                this.campanello = true;
                buttonInserisciCorda.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiMagliette().subscribe((ris) => {
            this.listaMagliette = ris;
        });

        for (let i = 0; i < this.listaMagliette.length; i++) {
            let maglietta = this.listaMagliette[i];
            if (maglietta.nome == inputNomeCorde.value) {
                this.campanello = true;
                buttonInserisciCorda.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiPantaloncini().subscribe((ris) => {
            this.listaPantaloncini = ris;
        });

        for (let i = 0; i < this.listaPantaloncini.length; i++) {
            let pantaloncino = this.listaPantaloncini[i];
            if (pantaloncino.nome == inputNomeCorde.value) {
                this.campanello = true;
                buttonInserisciCorda.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiBorsoni().subscribe((ris) => {
            this.listaBorsoni = ris;
        });

        for (let i = 0; i < this.listaBorsoni.length; i++) {
            let borsone = this.listaBorsoni[i];
            if (borsone.nome == inputNomeCorde.value) {
                this.campanello = true;
                buttonInserisciCorda.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiScarpe().subscribe((ris) => {
            this.listaScarpe = ris;
        });

        for (let i = 0; i < this.listaScarpe.length; i++) {
            let scarpe = this.listaScarpe[i];
            if (scarpe.nome == inputNomeCorde.value) {
                this.campanello = true;
                buttonInserisciCorda.disabled = true;
                break;
            }
        }
    }

    creaCorda(formCorda: NgForm) {
        let inputNomeCorde = <HTMLInputElement>document.querySelector('#nomeCorde');
        let inputPrezzoCorde = <HTMLInputElement>document.querySelector('#prezzoCorde');
        let inputPezziInizialiCorde = <HTMLInputElement>document.querySelector('#pezziInizialiCorde');
        let selectMarchioCordaTennis = <HTMLSelectElement>document.querySelector('#marchioCordaTennis');
        let selectCalibroCorda = <HTMLSelectElement>document.querySelector('#calibroCorda');
        let selectColoreCorda = <HTMLSelectElement>document.querySelector('#coloreCorda');
        let selectTipoSetVenditaCordaTennis = <HTMLSelectElement>document.querySelector('#tipoSetVenditaCordaTennis');
        let selectMaterialeCordaTennis = <HTMLSelectElement>document.querySelector('#materialeCordaTennis');

        this.cordaDaModificare.nome = inputNomeCorde.value;
        this.cordaDaModificare.prezzo = parseFloat(inputPrezzoCorde.value);
        this.cordaDaModificare.pezziDisponibili = parseInt(inputPezziInizialiCorde.value);
        this.cordaDaModificare.marchioCordaTennis = selectMarchioCordaTennis.value;
        this.cordaDaModificare.calibroCorda = selectCalibroCorda.value;
        this.cordaDaModificare.coloreCorda = selectColoreCorda.value;
        this.cordaDaModificare.tipoSetVenditaCordaTennis = selectTipoSetVenditaCordaTennis.value;
        this.cordaDaModificare.materialeCordaTennis = selectMaterialeCordaTennis.value;

        console.log(this.cordaDaModificare);
        this.modProdSrv.modificaCorda(this.cordaDaModificare);

        let popupInserimentoCustomCorde = <HTMLDivElement>document.querySelector('#popupInserimentoCustomCorde');
        let h1ModificaCord = <HTMLHeadingElement>document.querySelector('#h1ModificaCord');
        let formCorde = <HTMLFormElement>document.querySelector('#formCorde');
        popupInserimentoCustomCorde.classList.remove('inattivo');
        h1ModificaCord.classList.add('inattivo');
        formCorde.classList.add('inattivo');

    }

    rimettiInattivoPopupCorde() {
        let popupInserimentoCustomCorde = <HTMLDivElement>document.querySelector('#popupInserimentoCustomCorde');
        popupInserimentoCustomCorde.classList.add('inattivo');
    }

    ////////// MAGLIETTE //////////
    verificaCampiVuotiMaglietta() {
        let inputNomeMagliette = <HTMLInputElement>document.querySelector('#nomeMagliette');
        let inputPrezzoMagliette = <HTMLInputElement>document.querySelector('#prezzoMagliette');
        let inputPezziInizialiMagliette = <HTMLInputElement>document.querySelector('#pezziInizialiMagliette');

        let buttonInserisciMaglietta = <HTMLButtonElement>document.querySelector('#inserisciMaglietta');

        if (inputNomeMagliette.value.trim() == '' || inputPrezzoMagliette.value.trim() == '' || inputPezziInizialiMagliette.value.trim() == '') {
            buttonInserisciMaglietta.disabled = true;
        } else {
            buttonInserisciMaglietta.disabled = false;
        }
    }

    verificaNumeriNegativiInputMagliette() {
        this.alertNumeroNegativo = false;

        let inputPrezzoMagliette = <HTMLInputElement>document.querySelector('#prezzoMagliette');
        let inputPezziInizialiMagliette = <HTMLInputElement>document.querySelector('#pezziInizialiMagliette');

        let buttonInserisciMaglietta = <HTMLButtonElement>document.querySelector('#inserisciMaglietta');

        if (parseFloat(inputPrezzoMagliette.value.trim()) < 0 || parseInt(inputPezziInizialiMagliette.value.trim()) < 0) {
            buttonInserisciMaglietta.disabled = true;
            this.alertNumeroNegativo = true;
        }
    }

    verificaPresenzaNomeMaglietta() {
        this.campanello = false;

        let inputNomeMagliette = <HTMLInputElement>document.querySelector('#nomeMagliette');
        let buttonInserisciMaglietta = <HTMLButtonElement>document.querySelector('#inserisciMaglietta');

        this.filtPrSrv.prendiRacchette().subscribe((ris) => {
            this.listaRacchette = ris;
        });

        for (let i = 0; i < this.listaRacchette.length; i++) {
            let racchetta = this.listaRacchette[i];
            if (racchetta.nome == inputNomeMagliette.value) {
                this.campanello = true;
                buttonInserisciMaglietta.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiPalline().subscribe((ris) => {
            this.listaPalline = ris;
        });

        for (let i = 0; i < this.listaPalline.length; i++) {
            let tuboPalline = this.listaPalline[i];
            if (tuboPalline.nome == inputNomeMagliette.value) {
                this.campanello = true;
                buttonInserisciMaglietta.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiCorde().subscribe((ris) => {
            this.listaCorde = ris;
        });

        for (let i = 0; i < this.listaCorde.length; i++) {
            let corda = this.listaCorde[i];
            if (corda.nome == inputNomeMagliette.value) {
                this.campanello = true;
                buttonInserisciMaglietta.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiMagliette().subscribe((ris) => {
            this.listaMagliette = ris;
        });

        for (let i = 0; i < this.listaMagliette.length; i++) {
            let maglietta = this.listaMagliette[i];
            if (maglietta.nome == inputNomeMagliette.value) {
                this.campanello = true;
                buttonInserisciMaglietta.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiPantaloncini().subscribe((ris) => {
            this.listaPantaloncini = ris;
        });

        for (let i = 0; i < this.listaPantaloncini.length; i++) {
            let pantaloncino = this.listaPantaloncini[i];
            if (pantaloncino.nome == inputNomeMagliette.value) {
                this.campanello = true;
                buttonInserisciMaglietta.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiBorsoni().subscribe((ris) => {
            this.listaBorsoni = ris;
        });

        for (let i = 0; i < this.listaBorsoni.length; i++) {
            let borsone = this.listaBorsoni[i];
            if (borsone.nome == inputNomeMagliette.value) {
                this.campanello = true;
                buttonInserisciMaglietta.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiScarpe().subscribe((ris) => {
            this.listaScarpe = ris;
        });

        for (let i = 0; i < this.listaScarpe.length; i++) {
            let scarpe = this.listaScarpe[i];
            if (scarpe.nome == inputNomeMagliette.value) {
                this.campanello = true;
                buttonInserisciMaglietta.disabled = true;
                break;
            }
        }
    }

    modificaMaglietta(formMaglietta: NgForm) {
        let inputNomeMagliette = <HTMLInputElement>document.querySelector('#nomeMagliette');
        let inputPrezzoMagliette = <HTMLInputElement>document.querySelector('#prezzoMagliette');
        let inputPezziInizialiMagliette = <HTMLInputElement>document.querySelector('#pezziInizialiMagliette');
        let selectDestinatarioAbbigliamentoMagl = <HTMLSelectElement>document.querySelector('#destinatarioAbbigliamentoMagl');
        let selectMarchioAbbigliamentoMagl = <HTMLSelectElement>document.querySelector('#marchioAbbigliamentoMagl');
        let selectTagliaAbbigliamentoMagl = <HTMLSelectElement>document.querySelector('#tagliaAbbigliamentoMagl');
        let selectColoreAbbigliamentoMagl = <HTMLSelectElement>document.querySelector('#coloreAbbigliamentoMagl');
        let selectTipoColloMaglietta = <HTMLSelectElement>document.querySelector('#tipoColloMaglietta');

        this.magliettaDaModificare.nome = inputNomeMagliette.value;
        this.magliettaDaModificare.prezzo = parseFloat(inputPrezzoMagliette.value);
        this.magliettaDaModificare.pezziDisponibili = parseInt(inputPezziInizialiMagliette.value);
        this.magliettaDaModificare.destinatarioAbbigliamento = selectDestinatarioAbbigliamentoMagl.value;
        this.magliettaDaModificare.marchio = selectMarchioAbbigliamentoMagl.value;
        this.magliettaDaModificare.tagliaAbbigliamento = selectTagliaAbbigliamentoMagl.value;
        this.magliettaDaModificare.colore = selectColoreAbbigliamentoMagl.value;
        this.magliettaDaModificare.tipoColloMaglietta = selectTipoColloMaglietta.value;

        console.log(this.magliettaDaModificare);
        this.modProdSrv.modificaMaglietta(this.magliettaDaModificare);

        let popupInserimentoCustomMagliette = <HTMLDivElement>document.querySelector('#popupInserimentoCustomMagliette');
        let h1ModificaMagl = <HTMLHeadingElement>document.querySelector('#h1ModificaMagl');
        let formMagliette = <HTMLFormElement>document.querySelector('#formMagliette');
        popupInserimentoCustomMagliette.classList.remove('inattivo');
        h1ModificaMagl.classList.add('inattivo');
        formMagliette.classList.add('inattivo');
    }

    rimettiInattivoPopupMagliette() {
        let popupInserimentoCustomMagliette = <HTMLDivElement>document.querySelector('#popupInserimentoCustomMagliette');
        popupInserimentoCustomMagliette.classList.add('inattivo');
    }

    ////////// PANTALONCINI //////////
    verificaCampiVuotiPantaloncino() {
        let inputNomePantaloncino = <HTMLInputElement>document.querySelector('#nomePantaloncino');
        let inputPrezzoPantaloncino = <HTMLInputElement>document.querySelector('#prezzoPantaloncino');
        let inputPezziInizialiPantaloncino = <HTMLInputElement>document.querySelector('#pezziInizialiPantaloncino');

        let buttonInserisciPantaloncino = <HTMLButtonElement>document.querySelector('#inserisciPantaloncino');

        if (inputNomePantaloncino.value.trim() == '' || inputPrezzoPantaloncino.value.trim() == '' || inputPezziInizialiPantaloncino.value.trim() == '') {
            buttonInserisciPantaloncino.disabled = true;
        } else {
            buttonInserisciPantaloncino.disabled = false;
        }
    }

    verificaNumeriNegativiInputPantaloncini() {
        this.alertNumeroNegativo = false;

        let inputPrezzoPantaloncino = <HTMLInputElement>document.querySelector('#prezzoPantaloncino');
        let inputPezziInizialiPantaloncino = <HTMLInputElement>document.querySelector('#pezziInizialiPantaloncino');

        let buttonInserisciPantaloncino = <HTMLButtonElement>document.querySelector('#inserisciPantaloncino');

        if (parseFloat(inputPrezzoPantaloncino.value.trim()) < 0 || parseInt(inputPezziInizialiPantaloncino.value.trim()) < 0) {
            buttonInserisciPantaloncino.disabled = true;
            this.alertNumeroNegativo = true;
        }
    }

    verificaPresenzaNomePantaloncino() {
        this.campanello = false;

        let inputNomePantaloncino = <HTMLInputElement>document.querySelector('#nomePantaloncino');
        let buttonInserisciPantaloncino = <HTMLButtonElement>document.querySelector('#inserisciPantaloncino');

        this.filtPrSrv.prendiRacchette().subscribe((ris) => {
            this.listaRacchette = ris;
        });

        for (let i = 0; i < this.listaRacchette.length; i++) {
            let racchetta = this.listaRacchette[i];
            if (racchetta.nome == inputNomePantaloncino.value) {
                this.campanello = true;
                buttonInserisciPantaloncino.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiPalline().subscribe((ris) => {
            this.listaPalline = ris;
        });

        for (let i = 0; i < this.listaPalline.length; i++) {
            let tuboPalline = this.listaPalline[i];
            if (tuboPalline.nome == inputNomePantaloncino.value) {
                this.campanello = true;
                buttonInserisciPantaloncino.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiCorde().subscribe((ris) => {
            this.listaCorde = ris;
        });

        for (let i = 0; i < this.listaCorde.length; i++) {
            let corda = this.listaCorde[i];
            if (corda.nome == inputNomePantaloncino.value) {
                this.campanello = true;
                buttonInserisciPantaloncino.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiMagliette().subscribe((ris) => {
            this.listaMagliette = ris;
        });

        for (let i = 0; i < this.listaMagliette.length; i++) {
            let maglietta = this.listaMagliette[i];
            if (maglietta.nome == inputNomePantaloncino.value) {
                this.campanello = true;
                buttonInserisciPantaloncino.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiPantaloncini().subscribe((ris) => {
            this.listaPantaloncini = ris;
        });

        for (let i = 0; i < this.listaPantaloncini.length; i++) {
            let pantaloncino = this.listaPantaloncini[i];
            if (pantaloncino.nome == inputNomePantaloncino.value) {
                this.campanello = true;
                buttonInserisciPantaloncino.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiBorsoni().subscribe((ris) => {
            this.listaBorsoni = ris;
        });

        for (let i = 0; i < this.listaBorsoni.length; i++) {
            let borsone = this.listaBorsoni[i];
            if (borsone.nome == inputNomePantaloncino.value) {
                this.campanello = true;
                buttonInserisciPantaloncino.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiScarpe().subscribe((ris) => {
            this.listaScarpe = ris;
        });

        for (let i = 0; i < this.listaScarpe.length; i++) {
            let scarpe = this.listaScarpe[i];
            if (scarpe.nome == inputNomePantaloncino.value) {
                this.campanello = true;
                buttonInserisciPantaloncino.disabled = true;
                break;
            }
        }
    }

    creaPantaloncino(formPantaloncino: NgForm) {
        let inputNomePantaloncino = <HTMLInputElement>document.querySelector('#nomePantaloncino');
        let inputPrezzoPantaloncino = <HTMLInputElement>document.querySelector('#prezzoPantaloncino');
        let inputPezziInizialiPantaloncino = <HTMLInputElement>document.querySelector('#pezziInizialiPantaloncino');
        let selectDestinatarioAbbigliamentoPantal = <HTMLSelectElement>document.querySelector('#destinatarioAbbigliamentoPantal');
        let selectMarchioAbbigliamentoPantal = <HTMLSelectElement>document.querySelector('#marchioAbbigliamentoPantal');
        let selectTagliaAbbigliamentoPantal = <HTMLSelectElement>document.querySelector('#tagliaAbbigliamentoPantal');
        let selectColoreAbbigliamentoPantal = <HTMLSelectElement>document.querySelector('#coloreAbbigliamentoPantal');
        let selectLunghezzaPantal = <HTMLSelectElement>document.querySelector('#lunghezzaPantal');
        let selectTaschePantal = <HTMLSelectElement>document.querySelector('#taschePantal');

        this.pantaloncinoDaModificare.nome = inputNomePantaloncino.value;
        this.pantaloncinoDaModificare.prezzo = parseFloat(inputPrezzoPantaloncino.value);
        this.pantaloncinoDaModificare.pezziDisponibili = parseInt(inputPezziInizialiPantaloncino.value);
        this.pantaloncinoDaModificare.destinatarioAbbigliamento = selectDestinatarioAbbigliamentoPantal.value;
        this.pantaloncinoDaModificare.marchio = selectMarchioAbbigliamentoPantal.value;
        this.pantaloncinoDaModificare.tagliaAbbigliamento = selectTagliaAbbigliamentoPantal.value;
        this.pantaloncinoDaModificare.colore = selectColoreAbbigliamentoPantal.value;
        this.pantaloncinoDaModificare.lunghezzaPantaloncino = selectLunghezzaPantal.value;
        this.pantaloncinoDaModificare.taschePantaloncino = selectTaschePantal.value;

        console.log(this.pantaloncinoDaModificare);
        this.modProdSrv.modificaPantaloncino(this.pantaloncinoDaModificare);

        let popupInserimentoCustomPantaloncini = <HTMLDivElement>document.querySelector('#popupInserimentoCustomPantaloncini');
        let h1ModificaPantal = <HTMLHeadingElement>document.querySelector('#h1ModificaPantal');
        let formPantaloncini = <HTMLFormElement>document.querySelector('#formPantaloncini');
        popupInserimentoCustomPantaloncini.classList.remove('inattivo');
        h1ModificaPantal.classList.add('inattivo');
        formPantaloncini.classList.add('inattivo');
    }

    rimettiInattivoPopupPantaloncini() {
        let popupInserimentoCustomPantaloncini = <HTMLDivElement>document.querySelector('#popupInserimentoCustomPantaloncini');
        popupInserimentoCustomPantaloncini.classList.add('inattivo');
    }

    ////////// BORSONI //////////
    verificaCampiVuotiBorsone() {
        let inputNomeBorsa = <HTMLInputElement>document.querySelector('#nomeBorsa');
        let inputPrezzoBorsa = <HTMLInputElement>document.querySelector('#prezzoBorsa');
        let inputPezziInizialiBorsa = <HTMLInputElement>document.querySelector('#pezziInizialiBorsa');

        let buttonInserisciBorsa = <HTMLButtonElement>document.querySelector('#inserisciBorsa');

        if (inputNomeBorsa.value.trim() == '' || inputPrezzoBorsa.value.trim() == '' || inputPezziInizialiBorsa.value.trim() == '') {
            buttonInserisciBorsa.disabled = true;
        } else {
            buttonInserisciBorsa.disabled = false;
        }
    }

    verificaNumeriNegativiInputBorsoni() {
        this.alertNumeroNegativo = false;

        let inputPrezzoBorsa = <HTMLInputElement>document.querySelector('#prezzoBorsa');
        let inputPezziInizialiBorsa = <HTMLInputElement>document.querySelector('#pezziInizialiBorsa');

        let buttonInserisciBorsa = <HTMLButtonElement>document.querySelector('#inserisciBorsa');

        if (parseFloat(inputPrezzoBorsa.value.trim()) < 0 || parseInt(inputPezziInizialiBorsa.value.trim()) < 0) {
            buttonInserisciBorsa.disabled = true;
            this.alertNumeroNegativo = true;
        }
    }

    verificaPresenzaNomeBorsone() {
        this.campanello = false;

        let inputNomeBorsa = <HTMLInputElement>document.querySelector('#nomeBorsa');
        let buttonInserisciBorsa = <HTMLButtonElement>document.querySelector('#inserisciBorsa');

        this.filtPrSrv.prendiRacchette().subscribe((ris) => {
            this.listaRacchette = ris;
        });

        for (let i = 0; i < this.listaRacchette.length; i++) {
            let racchetta = this.listaRacchette[i];
            if (racchetta.nome == inputNomeBorsa.value) {
                this.campanello = true;
                buttonInserisciBorsa.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiPalline().subscribe((ris) => {
            this.listaPalline = ris;
        });

        for (let i = 0; i < this.listaPalline.length; i++) {
            let tuboPalline = this.listaPalline[i];
            if (tuboPalline.nome == inputNomeBorsa.value) {
                this.campanello = true;
                buttonInserisciBorsa.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiCorde().subscribe((ris) => {
            this.listaCorde = ris;
        });

        for (let i = 0; i < this.listaCorde.length; i++) {
            let corda = this.listaCorde[i];
            if (corda.nome == inputNomeBorsa.value) {
                this.campanello = true;
                buttonInserisciBorsa.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiMagliette().subscribe((ris) => {
            this.listaMagliette = ris;
        });

        for (let i = 0; i < this.listaMagliette.length; i++) {
            let maglietta = this.listaMagliette[i];
            if (maglietta.nome == inputNomeBorsa.value) {
                this.campanello = true;
                buttonInserisciBorsa.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiPantaloncini().subscribe((ris) => {
            this.listaPantaloncini = ris;
        });

        for (let i = 0; i < this.listaPantaloncini.length; i++) {
            let pantaloncino = this.listaPantaloncini[i];
            if (pantaloncino.nome == inputNomeBorsa.value) {
                this.campanello = true;
                buttonInserisciBorsa.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiBorsoni().subscribe((ris) => {
            this.listaBorsoni = ris;
        });

        for (let i = 0; i < this.listaBorsoni.length; i++) {
            let borsone = this.listaBorsoni[i];
            if (borsone.nome == inputNomeBorsa.value) {
                this.campanello = true;
                buttonInserisciBorsa.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiScarpe().subscribe((ris) => {
            this.listaScarpe = ris;
        });

        for (let i = 0; i < this.listaScarpe.length; i++) {
            let scarpe = this.listaScarpe[i];
            if (scarpe.nome == inputNomeBorsa.value) {
                this.campanello = true;
                buttonInserisciBorsa.disabled = true;
                break;
            }
        }
    }

    modificaBorsone(formBorsone: NgForm) {
        let inputNomeBorsa = <HTMLInputElement>document.querySelector('#nomeBorsa');
        let inputPrezzoBorsa = <HTMLInputElement>document.querySelector('#prezzoBorsa');
        let inputPezziInizialiBorsa = <HTMLInputElement>document.querySelector('#pezziInizialiBorsa');
        let selectMarchioBorsa = <HTMLSelectElement>document.querySelector('#marchioBorsa');
        let selectCapacitaBorsa = <HTMLSelectElement>document.querySelector('#capacitaBorsa');
        let selectIsolamentoTermicoBorsa = <HTMLSelectElement>document.querySelector('#isolamentoTermicoBorsa');

        let isolamentoBool: boolean = false;
        if (selectIsolamentoTermicoBorsa.value == 'true') {
            isolamentoBool = true;
        }

        this.borsoneDaModificare.nome = inputNomeBorsa.value;
        this.borsoneDaModificare.prezzo = parseFloat(inputPrezzoBorsa.value);
        this.borsoneDaModificare.pezziDisponibili = parseInt(inputPezziInizialiBorsa.value);
        this.borsoneDaModificare.marchio = selectMarchioBorsa.value;
        this.borsoneDaModificare.capacitaBorsaTennis = selectCapacitaBorsa.value;
        this.borsoneDaModificare.isolamentoTermico = isolamentoBool;

        console.log(this.borsoneDaModificare);
        this.modProdSrv.modificaBorsone(this.borsoneDaModificare);

        let popupInserimentoCustomBorsoni = <HTMLDivElement>document.querySelector('#popupInserimentoCustomBorsoni');
        let h1ModificaBors = <HTMLHeadingElement>document.querySelector('#h1ModificaBors');
        let formBorsoni = <HTMLFormElement>document.querySelector('#formBorsoni');
        popupInserimentoCustomBorsoni.classList.remove('inattivo');
        h1ModificaBors.classList.add('inattivo');
        formBorsoni.classList.add('inattivo');

    }

    rimettiInattivoPopupBorsoni() {
        let popupInserimentoCustomBorsoni = <HTMLDivElement>document.querySelector('#popupInserimentoCustomBorsoni');
        popupInserimentoCustomBorsoni.classList.add('inattivo');
    }

    ////////// SCARPE //////////
    verificaCampiVuotiScarpe() {
        let inputNomeScarpe = <HTMLInputElement>document.querySelector('#nomeScarpe');
        let inputPrezzoScarpe = <HTMLInputElement>document.querySelector('#prezzoScarpe');
        let inputPezziInizialiScarpe = <HTMLInputElement>document.querySelector('#pezziInizialiScarpe');

        let buttonInserisciScarpe = <HTMLButtonElement>document.querySelector('#inserisciScarpe');

        if (inputNomeScarpe.value.trim() == '' || inputPrezzoScarpe.value.trim() == '' || inputPezziInizialiScarpe.value.trim() == '') {
            buttonInserisciScarpe.disabled = true;
        } else {
            buttonInserisciScarpe.disabled = false;
        }
    }

    verificaNumeriNegativiInputScarpe() {
        this.alertNumeroNegativo = false;

        let inputPrezzoScarpe = <HTMLInputElement>document.querySelector('#prezzoScarpe');
        let inputPezziInizialiScarpe = <HTMLInputElement>document.querySelector('#pezziInizialiScarpe');

        let buttonInserisciScarpe = <HTMLButtonElement>document.querySelector('#inserisciScarpe');

        if (parseFloat(inputPrezzoScarpe.value.trim()) < 0 || parseInt(inputPezziInizialiScarpe.value.trim()) < 0) {
            buttonInserisciScarpe.disabled = true;
            this.alertNumeroNegativo = true;
        }
    }

    verificaPresenzaNomeScarpe() {
        this.campanello = false;

        let inputNomeScarpe = <HTMLInputElement>document.querySelector('#nomeScarpe');
        let buttonInserisciScarpe = <HTMLButtonElement>document.querySelector('#inserisciScarpe');

        this.filtPrSrv.prendiRacchette().subscribe((ris) => {
            this.listaRacchette = ris;
        });

        for (let i = 0; i < this.listaRacchette.length; i++) {
            let racchetta = this.listaRacchette[i];
            if (racchetta.nome == inputNomeScarpe.value) {
                this.campanello = true;
                buttonInserisciScarpe.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiPalline().subscribe((ris) => {
            this.listaPalline = ris;
        });

        for (let i = 0; i < this.listaPalline.length; i++) {
            let tuboPalline = this.listaPalline[i];
            if (tuboPalline.nome == inputNomeScarpe.value) {
                this.campanello = true;
                buttonInserisciScarpe.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiCorde().subscribe((ris) => {
            this.listaCorde = ris;
        });

        for (let i = 0; i < this.listaCorde.length; i++) {
            let corda = this.listaCorde[i];
            if (corda.nome == inputNomeScarpe.value) {
                this.campanello = true;
                buttonInserisciScarpe.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiMagliette().subscribe((ris) => {
            this.listaMagliette = ris;
        });

        for (let i = 0; i < this.listaMagliette.length; i++) {
            let maglietta = this.listaMagliette[i];
            if (maglietta.nome == inputNomeScarpe.value) {
                this.campanello = true;
                buttonInserisciScarpe.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiPantaloncini().subscribe((ris) => {
            this.listaPantaloncini = ris;
        });

        for (let i = 0; i < this.listaPantaloncini.length; i++) {
            let pantaloncino = this.listaPantaloncini[i];
            if (pantaloncino.nome == inputNomeScarpe.value) {
                this.campanello = true;
                buttonInserisciScarpe.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiBorsoni().subscribe((ris) => {
            this.listaBorsoni = ris;
        });

        for (let i = 0; i < this.listaBorsoni.length; i++) {
            let borsone = this.listaBorsoni[i];
            if (borsone.nome == inputNomeScarpe.value) {
                this.campanello = true;
                buttonInserisciScarpe.disabled = true;
                break;
            }
        }

        this.filtPrSrv.prendiScarpe().subscribe((ris) => {
            this.listaScarpe = ris;
        });

        for (let i = 0; i < this.listaScarpe.length; i++) {
            let scarpe = this.listaScarpe[i];
            if (scarpe.nome == inputNomeScarpe.value) {
                this.campanello = true;
                buttonInserisciScarpe.disabled = true;
                break;
            }
        }
    }

    modificaScarpe(formScarpe: NgForm) {
        let inputNomeScarpe = <HTMLInputElement>document.querySelector('#nomeScarpe');
        let inputPrezzoScarpe = <HTMLInputElement>document.querySelector('#prezzoScarpe');
        let inputPezziInizialiScarpe = <HTMLInputElement>document.querySelector('#pezziInizialiScarpe');
        let selectMarchioScarpe = <HTMLSelectElement>document.querySelector('#marchioScarpe');
        let selectDestinatarioScarpe = <HTMLSelectElement>document.querySelector('#destinatarioScarpe');
        let selectTipoSuperficieDiGiocoScarpe = <HTMLSelectElement>document.querySelector('#tipoSuperficieDiGiocoScarpe');
        let selectTagliaScarpe = <HTMLSelectElement>document.querySelector('#tagliaScarpe');
        let selectColoreScarpe = <HTMLSelectElement>document.querySelector('#coloreScarpe');

        this.scarpeDaModificare.nome = inputNomeScarpe.value;
        this.scarpeDaModificare.prezzo = parseFloat(inputPrezzoScarpe.value);
        this.scarpeDaModificare.pezziDisponibili = parseInt(inputPezziInizialiScarpe.value);
        this.scarpeDaModificare.marchio = selectMarchioScarpe.value;
        this.scarpeDaModificare.destinatarioAbbigliamento = selectDestinatarioScarpe.value;
        this.scarpeDaModificare.tipoSuperficieDiGioco = selectTipoSuperficieDiGiocoScarpe.value;
        this.scarpeDaModificare.tagliaScarpe = selectTagliaScarpe.value;
        this.scarpeDaModificare.colore = selectColoreScarpe.value;

        console.log(this.scarpeDaModificare);
        this.modProdSrv.modificaScarpe(this.scarpeDaModificare);

        let popupInserimentoCustomScarpe = <HTMLDivElement>document.querySelector('#popupInserimentoCustomScarpe');
        let h1ModificaScarp = <HTMLHeadingElement>document.querySelector('#h1ModificaScarp');
        let formScarpee = <HTMLFormElement>document.querySelector('#formScarpee');
        popupInserimentoCustomScarpe.classList.remove('inattivo');
        h1ModificaScarp.classList.add('inattivo');
        formScarpee.classList.add('inattivo');
    }

    rimettiInattivoPopupScarpe() {
        let popupInserimentoCustomScarpe = <HTMLDivElement>document.querySelector('#popupInserimentoCustomScarpe');
        popupInserimentoCustomScarpe.classList.add('inattivo');
    }
}
