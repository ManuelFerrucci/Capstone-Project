package com.SpringBoot_SpringSecurity.models;

import com.SpringBoot_SpringSecurity.utils.CategoriaProdotto;
import com.SpringBoot_SpringSecurity.utils.DisponibilitaProdotto;
import com.SpringBoot_SpringSecurity.utils.MarchioPallineTennis;
import com.SpringBoot_SpringSecurity.utils.QuantitaInTuboPallineTennis;
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
public class TuboPallineTennis extends Prodotto {

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private MarchioPallineTennis marchioPallineTennis;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private QuantitaInTuboPallineTennis quantitaInTuboPallineTennis;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private TipoSuperficieDiGioco tipoSuperficieDiGioco;

	public TuboPallineTennis(Long id, String nome, Double prezzo, DisponibilitaProdotto disponibilitaProdotto,
			CategoriaProdotto categoriaProdotto, MarchioPallineTennis marchioPallineTennis,
			QuantitaInTuboPallineTennis quantitaInTuboPallineTennis, TipoSuperficieDiGioco tipoSuperficieDiGioco,
			Integer pezziDisponibili) {
		super(id, nome, prezzo, disponibilitaProdotto, categoriaProdotto, pezziDisponibili);
		this.marchioPallineTennis = marchioPallineTennis;
		this.quantitaInTuboPallineTennis = quantitaInTuboPallineTennis;
		this.tipoSuperficieDiGioco = tipoSuperficieDiGioco;
		if (this.getPezziDisponibili() < 1) {
			this.setDisponibilitaProdotto(DisponibilitaProdotto.Esaurito);
		} else {
			this.setDisponibilitaProdotto(DisponibilitaProdotto.Disponibile);
		}
	}

	@Override
	public String toString() {
		return "TuboPallineTennis [id=" + +getId() + ", nome=" + getNome() + ", marchioPallineTennis="
				+ marchioPallineTennis + ", quantitaInTuboPallineTennis=" + quantitaInTuboPallineTennis
				+ ", tipoSuperficieDiGioco=" + tipoSuperficieDiGioco + ", prezzo=" + getPrezzo()
				+ ", disponibilitaProdotto=" + getDisponibilitaProdotto() + ", categoriaProdotto="
				+ getCategoriaProdotto() + ", pezziDisponibili=" + getPezziDisponibili() + "]";
	}

}
