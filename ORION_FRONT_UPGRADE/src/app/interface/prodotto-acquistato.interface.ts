import { Borsoni } from "./borsoni.interface";
import { Corda } from "./corda.interface";
import { Maglietta } from "./maglietta.interface";
import { Palline } from "./palline.interface";
import { Pantaloncino } from "./pantaloncino.interface";
import { Racchetta } from "./racchetta.interface";
import { Scarpe } from "./scarpe.interface";

export interface ProdottoAcquistato {
    id: number;
    nome: string;
    prezzoSingolo: number;
    categoriaProdotto: string;
    numeroPezziAcquistati: number;
    prodotto: Racchetta | Palline | Corda | Maglietta | Pantaloncino | Borsoni | Scarpe;
}
