package com.SpringBoot_SpringSecurity.models;

import com.SpringBoot_SpringSecurity.utils.CategoriaProdotto;
import com.SpringBoot_SpringSecurity.utils.Colore;
import com.SpringBoot_SpringSecurity.utils.DestinatarioAbbigliamento;
import com.SpringBoot_SpringSecurity.utils.DisponibilitaProdotto;
import com.SpringBoot_SpringSecurity.utils.Marchio;
import com.SpringBoot_SpringSecurity.utils.TagliaScarpe;
import com.SpringBoot_SpringSecurity.utils.TipoSuperficieDiGioco;

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
public class ScarpeTennis extends Prodotto {

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private Marchio marchio;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private DestinatarioAbbigliamento destinatarioAbbigliamento;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private TipoSuperficieDiGioco tipoSuperficieDiGioco;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private TagliaScarpe tagliaScarpe;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private Colore colore;

	public ScarpeTennis(Long id, String nome, Double prezzo, DisponibilitaProdotto disponibilitaProdotto,
			CategoriaProdotto categoriaProdotto, Integer pezziDisponibili, Marchio marchio,
			DestinatarioAbbigliamento destinatarioAbbigliamento, TipoSuperficieDiGioco tipoSuperficieDiGioco,
			TagliaScarpe tagliaScarpe, Colore colore) {
		super(id, nome, prezzo, disponibilitaProdotto, categoriaProdotto, pezziDisponibili);
		this.marchio = marchio;
		this.destinatarioAbbigliamento = destinatarioAbbigliamento;
		this.tipoSuperficieDiGioco = tipoSuperficieDiGioco;
		this.tagliaScarpe = tagliaScarpe;
		this.colore = colore;
		if (this.getPezziDisponibili() < 1) {
			this.setDisponibilitaProdotto(DisponibilitaProdotto.Esaurito);
		} else {
			this.setDisponibilitaProdotto(DisponibilitaProdotto.Disponibile);
		}
	}

	@Override
	public String toString() {
		return "ScarpeTennis [id=" + getId() + ", nome=" + getNome() + ", marchio=" + marchio
				+ ", destinatarioAbbigliamento=" + destinatarioAbbigliamento + ", tipoSuperficieDiGioco="
				+ tipoSuperficieDiGioco + ", tagliaScarpe=" + tagliaScarpe + ", colore=" + colore + ", prezzo="
				+ getPrezzo() + ", disponibilitaProdotto=" + getDisponibilitaProdotto() + ", categoriaProdotto="
				+ getCategoriaProdotto() + ", pezziDisponibili=" + getPezziDisponibili() + "]";
	}

}
