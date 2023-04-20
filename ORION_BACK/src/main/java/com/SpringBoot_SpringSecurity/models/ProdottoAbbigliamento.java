package com.SpringBoot_SpringSecurity.models;

import com.SpringBoot_SpringSecurity.utils.CategoriaProdotto;
import com.SpringBoot_SpringSecurity.utils.Colore;
import com.SpringBoot_SpringSecurity.utils.DestinatarioAbbigliamento;
import com.SpringBoot_SpringSecurity.utils.DisponibilitaProdotto;
import com.SpringBoot_SpringSecurity.utils.Marchio;
import com.SpringBoot_SpringSecurity.utils.TagliaAbbigliamento;

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
public abstract class ProdottoAbbigliamento extends Prodotto {

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private DestinatarioAbbigliamento destinatarioAbbigliamento;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private Marchio marchio;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private TagliaAbbigliamento tagliaAbbigliamento;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private Colore colore;

	public ProdottoAbbigliamento(Long id, String nome, Double prezzo, DisponibilitaProdotto disponibilitaProdotto,
			CategoriaProdotto categoriaProdotto, DestinatarioAbbigliamento destinatarioAbbigliamento, Marchio marchio,
			TagliaAbbigliamento tagliaAbbigliamento, Colore colore, Integer pezziDisponibili) {
		super(id, nome, prezzo, disponibilitaProdotto, categoriaProdotto, pezziDisponibili);
		this.destinatarioAbbigliamento = destinatarioAbbigliamento;
		this.marchio = marchio;
		this.tagliaAbbigliamento = tagliaAbbigliamento;
		this.colore = colore;
	}

}
