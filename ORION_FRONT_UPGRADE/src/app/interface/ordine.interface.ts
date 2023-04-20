import { ProdottoAcquistato } from "./prodotto-acquistato.interface";

export interface Ordine {
    id: number;
    dataOrdine: Date;
    cliente: string;
    prodottiAcquistati: ProdottoAcquistato[];
}
