import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProdottiCatalogoComponent } from './components/prodotti-catalogo/prodotti-catalogo.component';
import { HomeComponent } from './components/home/home.component';
import { ListaOrdiniComponent } from './components/lista-ordini/lista-ordini.component';
import { FiltroRicercaProdottoComponent } from './components/filtro-ricerca-prodotto/filtro-ricerca-prodotto.component';
import { FormsModule } from '@angular/forms';
import { InserisciOrdineComponent } from './components/inserisci-ordine/inserisci-ordine.component';
import { InserisciProdottoComponent } from './components/inserisci-prodotto/inserisci-prodotto.component';
import { DettaglioOrdineComponent } from './components/dettaglio-ordine/dettaglio-ordine.component';
import { ModificaProdottoComponent } from './components/modifica-prodotto/modifica-prodotto.component';
import { RifornisciProdottoComponent } from './components/rifornisci-prodotto/rifornisci-prodotto.component';
import { EliminaOrdineComponent } from './components/elimina-ordine/elimina-ordine.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ProdottiCatalogoComponent,
        HomeComponent,
        ListaOrdiniComponent,
        FiltroRicercaProdottoComponent,
        InserisciOrdineComponent,
        InserisciProdottoComponent,
        DettaglioOrdineComponent,
        ModificaProdottoComponent,
        RifornisciProdottoComponent,
        EliminaOrdineComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
