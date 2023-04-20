package com.SpringBoot_SpringSecurity.runner;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.SpringBoot_SpringSecurity.models.BorsaTennis;
import com.SpringBoot_SpringSecurity.models.CordaTennis;
import com.SpringBoot_SpringSecurity.models.MagliettaTennis;
import com.SpringBoot_SpringSecurity.models.PantaloncinoTennis;
import com.SpringBoot_SpringSecurity.models.Prodotto;
import com.SpringBoot_SpringSecurity.models.Racchetta;
import com.SpringBoot_SpringSecurity.models.ScarpeTennis;
import com.SpringBoot_SpringSecurity.models.TuboPallineTennis;
import com.SpringBoot_SpringSecurity.service.ProdottoService;
import com.SpringBoot_SpringSecurity.utils.CalibroCorda;
import com.SpringBoot_SpringSecurity.utils.CapacitaBorsaTennis;
import com.SpringBoot_SpringSecurity.utils.CategoriaProdotto;
import com.SpringBoot_SpringSecurity.utils.Colore;
import com.SpringBoot_SpringSecurity.utils.ColoreCorda;
import com.SpringBoot_SpringSecurity.utils.DestinatarioAbbigliamento;
import com.SpringBoot_SpringSecurity.utils.DisponibilitaProdotto;
import com.SpringBoot_SpringSecurity.utils.GrandezzaManicoRacchetta;
import com.SpringBoot_SpringSecurity.utils.LarghezzaPiattoCorde;
import com.SpringBoot_SpringSecurity.utils.LunghezzaPantaloncino;
import com.SpringBoot_SpringSecurity.utils.Marchio;
import com.SpringBoot_SpringSecurity.utils.MarchioCordaTennis;
import com.SpringBoot_SpringSecurity.utils.MarchioPallineTennis;
import com.SpringBoot_SpringSecurity.utils.MarchioRacchetta;
import com.SpringBoot_SpringSecurity.utils.MaterialeCordaTennis;
import com.SpringBoot_SpringSecurity.utils.QuantitaInTuboPallineTennis;
import com.SpringBoot_SpringSecurity.utils.SchemaCordeRacchetta;
import com.SpringBoot_SpringSecurity.utils.TagliaAbbigliamento;
import com.SpringBoot_SpringSecurity.utils.TagliaScarpe;
import com.SpringBoot_SpringSecurity.utils.TaschePantaloncino;
import com.SpringBoot_SpringSecurity.utils.TipoColloMaglietta;
import com.SpringBoot_SpringSecurity.utils.TipoSetVenditaCordaTennis;
import com.SpringBoot_SpringSecurity.utils.TipoSuperficieDiGioco;

@Component
public class ProdottoRunner implements ApplicationRunner {

	@Autowired
	ProdottoService prodottoService;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("ProdottoRunner run...");
		System.out.println();

		// CREAZIONE BORSE
		Prodotto borsaHeadProGrande = new BorsaTennis(1l, "Head-PRO Rackets Bag - 9+", 94.9,
				DisponibilitaProdotto.Disponibile, CategoriaProdotto.Borsoni, 5, Marchio.Head,
				CapacitaBorsaTennis.Piu_di_9, true);
		// prodottoService.salvaProdotto(borsaHeadProGrande);

//		System.out.println();

		// CREAZIONE CORDE
		Prodotto cordaLuxilonSavageBlack = new CordaTennis(1l, "Luxilon Savage Black - 12 mt.", 18.5,
				DisponibilitaProdotto.Disponibile, CategoriaProdotto.Corde, MarchioCordaTennis.Luxilon,
				CalibroCorda._1_25, ColoreCorda.Nero, TipoSetVenditaCordaTennis.Set_12metri,
				MaterialeCordaTennis.Monofilamento, 20);
		// prodottoService.salvaProdotto(cordaLuxilonSavageBlack);

		Prodotto cordaTecnifibreBlackCode = new CordaTennis(1l, "Tecnifibre Black-Code - 12 mt.", 13.5,
				DisponibilitaProdotto.Disponibile, CategoriaProdotto.Corde, MarchioCordaTennis.Tecnifibre,
				CalibroCorda._1_20, ColoreCorda.Nero, TipoSetVenditaCordaTennis.Set_12metri,
				MaterialeCordaTennis.Monofilamento, 15);
		// prodottoService.salvaProdotto(cordaTecnifibreBlackCode);

//		System.out.println();

		// CREAZIONE MAGLIETTE
		Prodotto magliettaBabolatAventador2023Uomo = new MagliettaTennis(1l, "T-Shirt Babolat Aventador 2023 - Man",
				32.49, DisponibilitaProdotto.Disponibile, CategoriaProdotto.Magliette, DestinatarioAbbigliamento.Uomo,
				Marchio.Babolat, TagliaAbbigliamento.L, Colore.Blu, TipoColloMaglietta.Girocollo, 10);
		// prodottoService.salvaProdotto(magliettaBabolatAventador2023Uomo);

//		System.out.println();

		// CREAZIONE PANTALONCINI
		Prodotto pantaloncinoBabolatAventador2023Uomo = new PantaloncinoTennis(1l,
				"Shorts Babolat Aventador 2023 - Man", 23.35, DisponibilitaProdotto.Disponibile,
				CategoriaProdotto.Pantaloncini, DestinatarioAbbigliamento.Uomo, Marchio.Babolat, TagliaAbbigliamento.L,
				Colore.Blu, LunghezzaPantaloncino.Normale, TaschePantaloncino.Tasche_normali, 8);
		// prodottoService.salvaProdotto(pantaloncinoBabolatAventador2023Uomo);

//		System.out.println();

		// CREAZIONE RACCHETTE
		Prodotto racchettaHeadPrestigePRO16X19 = new Racchetta(1l, "Head Prestige PRO 2023", 179.99,
				DisponibilitaProdotto.Disponibile, CategoriaProdotto.Racchette, MarchioRacchetta.Head,
				LarghezzaPiattoCorde._98, 315.0, 320.0, 68.5, SchemaCordeRacchetta._16x19, GrandezzaManicoRacchetta.L3,
				true, false, 7);
		// prodottoService.salvaProdotto(racchettaHeadPrestigePRO16X19);

		Prodotto racchettaBabolatPureAERO16X19 = new Racchetta(1l, "Babolat Pure AERO 2023", 279.9,
				DisponibilitaProdotto.Disponibile, CategoriaProdotto.Racchette, MarchioRacchetta.Babolat,
				LarghezzaPiattoCorde._100, 300.0, 320.0, 68.5, SchemaCordeRacchetta._16x19, GrandezzaManicoRacchetta.L3,
				false, false, 5);
		// prodottoService.salvaProdotto(racchettaBabolatPureAERO16X19);

//		System.out.println();

		// CREAZIONE SCARPE
		Prodotto scarpeBabolatJetMach2023Uomo = new ScarpeTennis(1l, "Babolat Jet Mach 3 (Clay) - Man", 124.5,
				DisponibilitaProdotto.Disponibile, CategoriaProdotto.Scarpe, 4, Marchio.Babolat,
				DestinatarioAbbigliamento.Uomo, TipoSuperficieDiGioco.Terra_battuta, TagliaScarpe._41, Colore.Rosso);
		// prodottoService.salvaProdotto(scarpeBabolatJetMach2023Uomo);

		Prodotto scarpeBabolatJetMach2023Donna = new ScarpeTennis(1l, "Babolat Jet Mach 3 (Clay) - Woman", 122.5,
				DisponibilitaProdotto.Disponibile, CategoriaProdotto.Scarpe, 2, Marchio.Babolat,
				DestinatarioAbbigliamento.Donna, TipoSuperficieDiGioco.Terra_battuta, TagliaScarpe._38, Colore.Rosso);
		// prodottoService.salvaProdotto(scarpeBabolatJetMach2023Donna);

//		System.out.println();

		// CREAZIONE TUBI PALLINE
		Prodotto tuboDunlopAllCourt = new TuboPallineTennis(1l, "Dunlop Fort - All-Court", 8.5,
				DisponibilitaProdotto.Disponibile, CategoriaProdotto.Palline, MarchioPallineTennis.Dunlop,
				QuantitaInTuboPallineTennis.Tubo_da_4_palline, TipoSuperficieDiGioco.All_court, 25);
		// prodottoService.salvaProdotto(tuboDunlopAllCourt);

		Prodotto tuboHeadATPAllCourt = new TuboPallineTennis(1l, "Head ATP - All-Court", 8.9,
				DisponibilitaProdotto.Disponibile, CategoriaProdotto.Palline, MarchioPallineTennis.Head,
				QuantitaInTuboPallineTennis.Tubo_da_4_palline, TipoSuperficieDiGioco.All_court, 20);
		// prodottoService.salvaProdotto(tuboHeadATPAllCourt);

		System.out.println();
	}

}
