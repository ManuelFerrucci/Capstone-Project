package com.SpringBoot_SpringSecurity.models;

import com.SpringBoot_SpringSecurity.utils.CategoriaProdotto;
import com.SpringBoot_SpringSecurity.utils.DisponibilitaProdotto;
import com.SpringBoot_SpringSecurity.utils.GrandezzaManicoRacchetta;
import com.SpringBoot_SpringSecurity.utils.LarghezzaPiattoCorde;
import com.SpringBoot_SpringSecurity.utils.MarchioRacchetta;
import com.SpringBoot_SpringSecurity.utils.SchemaCordeRacchetta;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Racchetta extends Prodotto {

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private MarchioRacchetta marchioRacchetta;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private LarghezzaPiattoCorde larghezzaPiattoCorde;

	@Column(nullable = true)
	private Double peso;

	@Column(nullable = true)
	private Double bilanciamento;

	@Column(nullable = true)
	private Double lunghezza;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private SchemaCordeRacchetta schemaCordeRacchetta;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private GrandezzaManicoRacchetta grandezzaManicoRacchetta;

	@Column(nullable = true)
	private Boolean servitaConFodero;

	@Column(nullable = true)
	private Boolean servitaIncordata;

	public Racchetta(Long id, String nome, Double prezzo, DisponibilitaProdotto disponibilitaProdotto,
			CategoriaProdotto categoriaProdotto, MarchioRacchetta marchioRacchetta,
			LarghezzaPiattoCorde larghezzaPiattoCorde, Double peso, Double bilanciamento, Double lunghezza,
			SchemaCordeRacchetta schemaCordeRacchetta, GrandezzaManicoRacchetta grandezzaManicoRacchetta,
			Boolean servitaConFodero, Boolean servitaIncordata, Integer pezziDisponibili) {
		super(id, nome, prezzo, disponibilitaProdotto, categoriaProdotto, pezziDisponibili);
		this.marchioRacchetta = marchioRacchetta;
		this.larghezzaPiattoCorde = larghezzaPiattoCorde;
		this.peso = peso;
		this.bilanciamento = bilanciamento;
		this.lunghezza = lunghezza;
		this.schemaCordeRacchetta = schemaCordeRacchetta;
		this.grandezzaManicoRacchetta = grandezzaManicoRacchetta;
		this.servitaConFodero = servitaConFodero;
		this.servitaIncordata = servitaIncordata;
		if (this.getPezziDisponibili() < 1) {
			this.setDisponibilitaProdotto(DisponibilitaProdotto.Esaurito);
		} else {
			this.setDisponibilitaProdotto(DisponibilitaProdotto.Disponibile);
		}
	}

	@Override
	public String toString() {
		return "Racchetta [id=" + getId() + ", nome=" + getNome() + ", marchioRacchetta=" + marchioRacchetta
				+ ", larghezzaPiattoCorde=" + larghezzaPiattoCorde + ", peso=" + peso + ", bilanciamento="
				+ bilanciamento + ", lunghezza=" + lunghezza + ", schemaCordeRacchetta=" + schemaCordeRacchetta
				+ ", grandezzaManicoRacchetta=" + grandezzaManicoRacchetta + ", servitaConFodero=" + servitaConFodero
				+ ", servitaIncordata=" + servitaIncordata + ", prezzo=" + getPrezzo() + ", disponibilitaProdotto="
				+ getDisponibilitaProdotto() + ", categoriaProdotto=" + getCategoriaProdotto() + ", pezziDisponibili="
				+ getPezziDisponibili() + "]";
	}

}
