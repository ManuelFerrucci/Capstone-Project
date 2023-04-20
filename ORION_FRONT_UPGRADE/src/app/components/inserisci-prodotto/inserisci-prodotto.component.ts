import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Corda } from 'src/app/interface/corda.interface';
import { Palline } from 'src/app/interface/palline.interface';
import { Racchetta } from 'src/app/interface/racchetta.interface';
import { InserisciProdottoService } from 'src/app/service/inserisci-prodotto.service';
import { ProdottiCatalogoService } from 'src/app/service/prodotti-catalogo.service';
import { FiltroRicercaProdottoService } from 'src/app/service/filtro-ricerca-prodotto.service';
import { Maglietta } from 'src/app/interface/maglietta.interface';
import { Pantaloncino } from 'src/app/interface/pantaloncino.interface';
import { Borsoni } from 'src/app/interface/borsoni.interface';
import { Scarpe } from 'src/app/interface/scarpe.interface';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { UtenteCorrente } from 'src/app/interface/utente-corrente.interface';

@Component({
    selector: 'app-inserisci-prodotto',
    templateUrl: './inserisci-prodotto.component.html',
    styleUrls: ['./inserisci-prodotto.component.scss']
})
export class InserisciProdottoComponent implements OnInit {

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

    risposta: string = '';
    campanello: boolean = false;

    alertNumeroNegativo: boolean = false;

    listaRacchette: Racchetta[] = [];
    listaPalline: Palline[] = [];
    listaCorde: Corda[] = [];
    listaMagliette: Maglietta[] = [];
    listaPantaloncini: Pantaloncino[] = [];
    listaBorsoni: Borsoni[] = [];
    listaScarpe: Scarpe[] = [];

    racchettaDaCreare: Racchetta = {
        id: 10000,
        nome: '',
        prezzo: 0,
        disponibilitaProdotto: 'Disponibile',
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

    tuboPallineDaCreare: Palline = {
        id: 10000,
        nome: '',
        prezzo: 0,
        disponibilitaProdotto: 'Disponibile',
        categoriaProdotto: 'Palline',
        marchioPallineTennis: '',
        quantitaInTuboPallineTennis: '',
        tipoSuperficieDiGioco: '',
        pezziDisponibili: 0
    }

    cordaDaCreare: Corda = {
        id: 10000,
        nome: '',
        prezzo: 0,
        disponibilitaProdotto: 'Disponibile',
        categoriaProdotto: 'Corde',
        marchioCordaTennis: '',
        calibroCorda: '',
        coloreCorda: '',
        tipoSetVenditaCordaTennis: '',
        materialeCordaTennis: '',
        pezziDisponibili: 0
    }

    magliettaDaCreare: Maglietta = {
        id: 10000,
        nome: '',
        prezzo: 0,
        disponibilitaProdotto: 'Disponibile',
        categoriaProdotto: 'Magliette',
        destinatarioAbbigliamento: '',
        marchio: '',
        tagliaAbbigliamento: '',
        colore: '',
        tipoColloMaglietta: '',
        pezziDisponibili: 0
    }

    pantaloncinoDaCreare: Pantaloncino = {
        id: 10000,
        nome: '',
        prezzo: 0,
        disponibilitaProdotto: 'Disponibile',
        categoriaProdotto: 'Pantaloncini',
        destinatarioAbbigliamento: '',
        marchio: '',
        tagliaAbbigliamento: '',
        colore: '',
        lunghezzaPantaloncino: '',
        taschePantaloncino: '',
        pezziDisponibili: 0
    }

    borsoneDaCreare: Borsoni = {
        id: 10000,
        nome: '',
        prezzo: 0,
        disponibilitaProdotto: 'Disponibile',
        categoriaProdotto: 'Borsoni',
        marchio: '',
        capacitaBorsaTennis: '',
        isolamentoTermico: false,
        pezziDisponibili: 0
    }

    scarpeDaCreare: Scarpe = {
        id: 10000,
        nome: '',
        prezzo: 0,
        disponibilitaProdotto: 'Disponibile',
        categoriaProdotto: 'Scarpe',
        marchio: '',
        destinatarioAbbigliamento: '',
        tipoSuperficieDiGioco: '',
        tagliaScarpe: '',
        colore: '',
        pezziDisponibili: 0
    }

    constructor(private inserProdSrv: InserisciProdottoService, private prodCatSrvvv: ProdottiCatalogoService, private filtProdSrvvv: FiltroRicercaProdottoService, private auth: AuthServiceService) { }

    ngOnInit(): void {
        this.auth.isAuthenticated();
        this.ricavaListaUtenti();
        this.prendiUtente();
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

    verificaCategoriaProdotto(formCategoria: NgForm) {
        let selectVerificaCategoria = <HTMLSelectElement>document.querySelector('#inserisciCategoriaProdotto');
        switch (selectVerificaCategoria.value) {
            case 'Racchette':
                this.risposta = 'Racchette';
                break;
            case 'Palline':
                this.risposta = 'Palline';
                break;
            case 'Corde':
                this.risposta = 'Corde';
                break;
            case 'Magliette':
                this.risposta = 'Magliette';
                break;
            case 'Pantaloncini':
                this.risposta = 'Pantaloncini';
                break;
            case 'Borsoni':
                this.risposta = 'Borsoni';
                break;
            case 'Scarpe':
                this.risposta = 'Scarpe';
                break;
            default:
                break;
        }
        console.log(this.risposta);
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

        this.filtProdSrvvv.prendiRacchette().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiPalline().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiCorde().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiMagliette().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiPantaloncini().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiBorsoni().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiScarpe().subscribe((ris) => {
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

    creaRacchetta(formRacchetta: NgForm) {
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

        this.racchettaDaCreare.nome = inputNomeRacchetta.value;
        this.racchettaDaCreare.prezzo = parseFloat(inputPrezzoRacchetta.value);
        this.racchettaDaCreare.pezziDisponibili = parseInt(inputPezziInizialiRacchetta.value);
        this.racchettaDaCreare.marchioRacchetta = selectMarchioRacchetta.value;
        this.racchettaDaCreare.larghezzaPiattoCorde = selectLarghezzaPiattoCordeRacchetta.value;
        this.racchettaDaCreare.peso = parseFloat(inputPesoRacchetta.value);
        this.racchettaDaCreare.bilanciamento = parseFloat(inputBilanciamentoRacchetta.value);
        this.racchettaDaCreare.lunghezza = parseFloat(inputLunghezzaRacchetta.value);
        this.racchettaDaCreare.schemaCordeRacchetta = selectSchemaCordeRacchetta.value;
        this.racchettaDaCreare.grandezzaManicoRacchetta = selectGrandezzaManicoRacchetta.value;
        this.racchettaDaCreare.servitaConFodero = boolFodero;
        this.racchettaDaCreare.servitaIncordata = boolIncordata;

        console.log(this.racchettaDaCreare);
        this.inserProdSrv.creaRacchetta(this.racchettaDaCreare);

        let popupInserimentoCustomRacchette = <HTMLDivElement>document.querySelector('#popupInserimentoCustomRacchette');
        let formInserimentoCategoria = <HTMLFormElement>document.querySelector('#formInserimentoCategoria');
        let formRacchette = <HTMLFormElement>document.querySelector('#formRacchette');
        popupInserimentoCustomRacchette.classList.remove('inattivo');
        formInserimentoCategoria.classList.add('inattivo');
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

        this.filtProdSrvvv.prendiRacchette().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiPalline().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiCorde().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiMagliette().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiPantaloncini().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiBorsoni().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiScarpe().subscribe((ris) => {
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

    creaTuboPalline(formPallina: NgForm) {
        let inputNomePalline = <HTMLInputElement>document.querySelector('#nomePalline');
        let inputPrezzoPalline = <HTMLInputElement>document.querySelector('#prezzoPalline');
        let inputPezziInizialiPalline = <HTMLInputElement>document.querySelector('#pezziInizialiPalline');
        let selectMarchioPalline = <HTMLSelectElement>document.querySelector('#marchioPalline');
        let selectQuantitaInTuboPalline = <HTMLSelectElement>document.querySelector('#quantitaInTuboPalline');
        let selectTipoSuperficieDiGioco = <HTMLSelectElement>document.querySelector('#tipoSuperficieDiGioco');

        this.tuboPallineDaCreare.nome = inputNomePalline.value;
        this.tuboPallineDaCreare.prezzo = parseFloat(inputPrezzoPalline.value);
        this.tuboPallineDaCreare.pezziDisponibili = parseInt(inputPezziInizialiPalline.value);
        this.tuboPallineDaCreare.marchioPallineTennis = selectMarchioPalline.value;
        this.tuboPallineDaCreare.quantitaInTuboPallineTennis = selectQuantitaInTuboPalline.value;
        this.tuboPallineDaCreare.tipoSuperficieDiGioco = selectTipoSuperficieDiGioco.value;

        console.log(this.tuboPallineDaCreare);
        this.inserProdSrv.creaPalline(this.tuboPallineDaCreare);

        let popupInserimentoCustomPalline = <HTMLDivElement>document.querySelector('#popupInserimentoCustomPalline');
        let formInserimentoCategoria = <HTMLFormElement>document.querySelector('#formInserimentoCategoria');
        let formPalline = <HTMLFormElement>document.querySelector('#formPalline');
        popupInserimentoCustomPalline.classList.remove('inattivo');
        formInserimentoCategoria.classList.add('inattivo');
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

        this.filtProdSrvvv.prendiRacchette().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiPalline().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiCorde().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiMagliette().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiPantaloncini().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiBorsoni().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiScarpe().subscribe((ris) => {
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

        this.cordaDaCreare.nome = inputNomeCorde.value;
        this.cordaDaCreare.prezzo = parseFloat(inputPrezzoCorde.value);
        this.cordaDaCreare.pezziDisponibili = parseInt(inputPezziInizialiCorde.value);
        this.cordaDaCreare.marchioCordaTennis = selectMarchioCordaTennis.value;
        this.cordaDaCreare.calibroCorda = selectCalibroCorda.value;
        this.cordaDaCreare.coloreCorda = selectColoreCorda.value;
        this.cordaDaCreare.tipoSetVenditaCordaTennis = selectTipoSetVenditaCordaTennis.value;
        this.cordaDaCreare.materialeCordaTennis = selectMaterialeCordaTennis.value;

        console.log(this.cordaDaCreare);
        this.inserProdSrv.creaCorda(this.cordaDaCreare);

        let popupInserimentoCustomCorde = <HTMLDivElement>document.querySelector('#popupInserimentoCustomCorde');
        let formInserimentoCategoria = <HTMLFormElement>document.querySelector('#formInserimentoCategoria');
        let formCorde = <HTMLFormElement>document.querySelector('#formCorde');
        popupInserimentoCustomCorde.classList.remove('inattivo');
        formInserimentoCategoria.classList.add('inattivo');
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

        this.filtProdSrvvv.prendiRacchette().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiPalline().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiCorde().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiMagliette().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiPantaloncini().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiBorsoni().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiScarpe().subscribe((ris) => {
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

    creaMaglietta(formMaglietta: NgForm) {
        let inputNomeMagliette = <HTMLInputElement>document.querySelector('#nomeMagliette');
        let inputPrezzoMagliette = <HTMLInputElement>document.querySelector('#prezzoMagliette');
        let inputPezziInizialiMagliette = <HTMLInputElement>document.querySelector('#pezziInizialiMagliette');
        let selectDestinatarioAbbigliamentoMagl = <HTMLSelectElement>document.querySelector('#destinatarioAbbigliamentoMagl');
        let selectMarchioAbbigliamentoMagl = <HTMLSelectElement>document.querySelector('#marchioAbbigliamentoMagl');
        let selectTagliaAbbigliamentoMagl = <HTMLSelectElement>document.querySelector('#tagliaAbbigliamentoMagl');
        let selectColoreAbbigliamentoMagl = <HTMLSelectElement>document.querySelector('#coloreAbbigliamentoMagl');
        let selectTipoColloMaglietta = <HTMLSelectElement>document.querySelector('#tipoColloMaglietta');

        this.magliettaDaCreare.nome = inputNomeMagliette.value;
        this.magliettaDaCreare.prezzo = parseFloat(inputPrezzoMagliette.value);
        this.magliettaDaCreare.pezziDisponibili = parseInt(inputPezziInizialiMagliette.value);
        this.magliettaDaCreare.destinatarioAbbigliamento = selectDestinatarioAbbigliamentoMagl.value;
        this.magliettaDaCreare.marchio = selectMarchioAbbigliamentoMagl.value;
        this.magliettaDaCreare.tagliaAbbigliamento = selectTagliaAbbigliamentoMagl.value;
        this.magliettaDaCreare.colore = selectColoreAbbigliamentoMagl.value;
        this.magliettaDaCreare.tipoColloMaglietta = selectTipoColloMaglietta.value;

        console.log(this.magliettaDaCreare);
        this.inserProdSrv.creaMaglietta(this.magliettaDaCreare);

        let popupInserimentoCustomMagliette = <HTMLDivElement>document.querySelector('#popupInserimentoCustomMagliette');
        let formInserimentoCategoria = <HTMLFormElement>document.querySelector('#formInserimentoCategoria');
        let formMagliette = <HTMLFormElement>document.querySelector('#formMagliette');
        popupInserimentoCustomMagliette.classList.remove('inattivo');
        formInserimentoCategoria.classList.add('inattivo');
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

        this.filtProdSrvvv.prendiRacchette().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiPalline().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiCorde().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiMagliette().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiPantaloncini().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiBorsoni().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiScarpe().subscribe((ris) => {
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

        this.pantaloncinoDaCreare.nome = inputNomePantaloncino.value;
        this.pantaloncinoDaCreare.prezzo = parseFloat(inputPrezzoPantaloncino.value);
        this.pantaloncinoDaCreare.pezziDisponibili = parseInt(inputPezziInizialiPantaloncino.value);
        this.pantaloncinoDaCreare.destinatarioAbbigliamento = selectDestinatarioAbbigliamentoPantal.value;
        this.pantaloncinoDaCreare.marchio = selectMarchioAbbigliamentoPantal.value;
        this.pantaloncinoDaCreare.tagliaAbbigliamento = selectTagliaAbbigliamentoPantal.value;
        this.pantaloncinoDaCreare.colore = selectColoreAbbigliamentoPantal.value;
        this.pantaloncinoDaCreare.lunghezzaPantaloncino = selectLunghezzaPantal.value;
        this.pantaloncinoDaCreare.taschePantaloncino = selectTaschePantal.value;

        console.log(this.pantaloncinoDaCreare);
        this.inserProdSrv.creaPantaloncino(this.pantaloncinoDaCreare);

        let popupInserimentoCustomPantaloncini = <HTMLDivElement>document.querySelector('#popupInserimentoCustomPantaloncini');
        let formInserimentoCategoria = <HTMLFormElement>document.querySelector('#formInserimentoCategoria');
        let formPantaloncini = <HTMLFormElement>document.querySelector('#formPantaloncini');
        popupInserimentoCustomPantaloncini.classList.remove('inattivo');
        formInserimentoCategoria.classList.add('inattivo');
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

        this.filtProdSrvvv.prendiRacchette().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiPalline().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiCorde().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiMagliette().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiPantaloncini().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiBorsoni().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiScarpe().subscribe((ris) => {
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

    creaBorsone(formBorsone: NgForm) {
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

        this.borsoneDaCreare.nome = inputNomeBorsa.value;
        this.borsoneDaCreare.prezzo = parseFloat(inputPrezzoBorsa.value);
        this.borsoneDaCreare.pezziDisponibili = parseInt(inputPezziInizialiBorsa.value);
        this.borsoneDaCreare.marchio = selectMarchioBorsa.value;
        this.borsoneDaCreare.capacitaBorsaTennis = selectCapacitaBorsa.value;
        this.borsoneDaCreare.isolamentoTermico = isolamentoBool;

        console.log(this.borsoneDaCreare);
        this.inserProdSrv.creaBorsone(this.borsoneDaCreare);

        let popupInserimentoCustomBorsoni = <HTMLDivElement>document.querySelector('#popupInserimentoCustomBorsoni');
        let formInserimentoCategoria = <HTMLFormElement>document.querySelector('#formInserimentoCategoria');
        let formBorsoni = <HTMLFormElement>document.querySelector('#formBorsoni');
        popupInserimentoCustomBorsoni.classList.remove('inattivo');
        formInserimentoCategoria.classList.add('inattivo');
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

        this.filtProdSrvvv.prendiRacchette().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiPalline().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiCorde().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiMagliette().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiPantaloncini().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiBorsoni().subscribe((ris) => {
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

        this.filtProdSrvvv.prendiScarpe().subscribe((ris) => {
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

    creaScarpe(formScarpe: NgForm) {
        let inputNomeScarpe = <HTMLInputElement>document.querySelector('#nomeScarpe');
        let inputPrezzoScarpe = <HTMLInputElement>document.querySelector('#prezzoScarpe');
        let inputPezziInizialiScarpe = <HTMLInputElement>document.querySelector('#pezziInizialiScarpe');
        let selectMarchioScarpe = <HTMLSelectElement>document.querySelector('#marchioScarpe');
        let selectDestinatarioScarpe = <HTMLSelectElement>document.querySelector('#destinatarioScarpe');
        let selectTipoSuperficieDiGiocoScarpe = <HTMLSelectElement>document.querySelector('#tipoSuperficieDiGiocoScarpe');
        let selectTagliaScarpe = <HTMLSelectElement>document.querySelector('#tagliaScarpe');
        let selectColoreScarpe = <HTMLSelectElement>document.querySelector('#coloreScarpe');

        this.scarpeDaCreare.nome = inputNomeScarpe.value;
        this.scarpeDaCreare.prezzo = parseFloat(inputPrezzoScarpe.value);
        this.scarpeDaCreare.pezziDisponibili = parseInt(inputPezziInizialiScarpe.value);
        this.scarpeDaCreare.marchio = selectMarchioScarpe.value;
        this.scarpeDaCreare.destinatarioAbbigliamento = selectDestinatarioScarpe.value;
        this.scarpeDaCreare.tipoSuperficieDiGioco = selectTipoSuperficieDiGiocoScarpe.value;
        this.scarpeDaCreare.tagliaScarpe = selectTagliaScarpe.value;
        this.scarpeDaCreare.colore = selectColoreScarpe.value;

        console.log(this.scarpeDaCreare);
        this.inserProdSrv.creaScarpe(this.scarpeDaCreare);

        let popupInserimentoCustomScarpe = <HTMLDivElement>document.querySelector('#popupInserimentoCustomScarpe');
        let formInserimentoCategoria = <HTMLFormElement>document.querySelector('#formInserimentoCategoria');
        let formScarpee = <HTMLFormElement>document.querySelector('#formScarpee');
        popupInserimentoCustomScarpe.classList.remove('inattivo');
        formInserimentoCategoria.classList.add('inattivo');
        formScarpee.classList.add('inattivo');
    }

    rimettiInattivoPopupScarpe() {
        let popupInserimentoCustomScarpe = <HTMLDivElement>document.querySelector('#popupInserimentoCustomScarpe');
        popupInserimentoCustomScarpe.classList.add('inattivo');
    }
}
