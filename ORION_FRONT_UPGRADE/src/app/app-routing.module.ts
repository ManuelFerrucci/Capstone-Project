import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ProdottiCatalogoComponent } from './components/prodotti-catalogo/prodotti-catalogo.component';
import { ListaOrdiniComponent } from './components/lista-ordini/lista-ordini.component';
import { FiltroRicercaProdottoComponent } from './components/filtro-ricerca-prodotto/filtro-ricerca-prodotto.component';
import { InserisciOrdineComponent } from './components/inserisci-ordine/inserisci-ordine.component';
import { InserisciProdottoComponent } from './components/inserisci-prodotto/inserisci-prodotto.component';
import { DettaglioOrdineComponent } from './components/dettaglio-ordine/dettaglio-ordine.component';
import { ModificaProdottoComponent } from './components/modifica-prodotto/modifica-prodotto.component';
import { RifornisciProdottoComponent } from './components/rifornisci-prodotto/rifornisci-prodotto.component';
import { EliminaOrdineComponent } from './components/elimina-ordine/elimina-ordine.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'lista-prodotti',
        component: ProdottiCatalogoComponent,
    },
    {
        path: 'lista-ordini',
        component: ListaOrdiniComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'lista-prodotti/filtro',
        component: FiltroRicercaProdottoComponent,
    },
    {
        path: 'lista-ordini/inserisci-ordine',
        component: InserisciOrdineComponent,
    },
    {
        path: 'lista-ordini/dettaglio-ordine/:id',
        component: DettaglioOrdineComponent,
    },
    {
        path: 'lista-ordini/elimina-ordine/:id',
        component: EliminaOrdineComponent,
    },
    {
        path: 'lista-prodotti/inserisci-prodotto',
        component: InserisciProdottoComponent,
    },
    {
        path: 'lista-prodotti/modifica-prodotto/:id',
        component: ModificaProdottoComponent,
    },
    {
        path: 'lista-prodotti/rifornisci-prodotto/:id',
        component: RifornisciProdottoComponent,
    },
    {
        path: '**',
        redirectTo: 'home'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), HttpClientModule],
    exports: [RouterModule]
})
export class AppRoutingModule { }
