package com.SpringBoot_SpringSecurity.models;

import com.SpringBoot_SpringSecurity.utils.CapacitaBorsaTennis;
import com.SpringBoot_SpringSecurity.utils.CategoriaProdotto;
import com.SpringBoot_SpringSecurity.utils.DisponibilitaProdotto;
import com.SpringBoot_SpringSecurity.utils.Marchio;

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
public class BorsaTennis extends Prodotto {

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private Marchio marchio;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private CapacitaBorsaTennis capacitaBorsaTennis;

	@Column(nullable = true)
	private Boolean isolamentoTermico;

	public BorsaTennis(Long id, String nome, Double prezzo, DisponibilitaProdotto disponibilitaProdotto,
			CategoriaProdotto categoriaProdotto, Integer pezziDisponibili, Marchio marchio,
			CapacitaBorsaTennis capacitaBorsaTennis, Boolean isolamentoTermico) {
		super(id, nome, prezzo, disponibilitaProdotto, categoriaProdotto, pezziDisponibili);
		this.marchio = marchio;
		this.capacitaBorsaTennis = capacitaBorsaTennis;
		this.isolamentoTermico = isolamentoTermico;
		if (this.getPezziDisponibili() < 1) {
			this.setDisponibilitaProdotto(DisponibilitaProdotto.Esaurito);
		} else {
			this.setDisponibilitaProdotto(DisponibilitaProdotto.Disponibile);
		}
	}

	@Override
	public String toString() {
		return "BorsaTennis [id=" + getId() + ", nome=" + getNome() + ", marchio=" + marchio + ", capacitaBorsaTennis="
				+ capacitaBorsaTennis + ", isolamentoTermico=" + isolamentoTermico + ", prezzo=" + getPrezzo()
				+ ", disponibilitaProdotto=" + getDisponibilitaProdotto() + ", categoriaProdotto="
				+ getCategoriaProdotto() + ", pezziDisponibili=" + getPezziDisponibili() + "]";
	}

}
