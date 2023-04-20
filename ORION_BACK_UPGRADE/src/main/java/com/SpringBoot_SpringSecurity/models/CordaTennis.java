package com.SpringBoot_SpringSecurity.models;

import com.SpringBoot_SpringSecurity.utils.CalibroCorda;
import com.SpringBoot_SpringSecurity.utils.CategoriaProdotto;
import com.SpringBoot_SpringSecurity.utils.ColoreCorda;
import com.SpringBoot_SpringSecurity.utils.DisponibilitaProdotto;
import com.SpringBoot_SpringSecurity.utils.MarchioCordaTennis;
import com.SpringBoot_SpringSecurity.utils.MaterialeCordaTennis;
import com.SpringBoot_SpringSecurity.utils.TipoSetVenditaCordaTennis;

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
public class CordaTennis extends Prodotto {

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private MarchioCordaTennis marchioCordaTennis;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private CalibroCorda calibroCorda;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private ColoreCorda coloreCorda;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private TipoSetVenditaCordaTennis tipoSetVenditaCordaTennis;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private MaterialeCordaTennis materialeCordaTennis;

	public CordaTennis(Long id, String nome, Double prezzo, DisponibilitaProdotto disponibilitaProdotto,
			CategoriaProdotto categoriaProdotto, MarchioCordaTennis marchioCordaTennis, CalibroCorda calibroCorda,
			ColoreCorda coloreCorda, TipoSetVenditaCordaTennis tipoSetVenditaCordaTennis,
			MaterialeCordaTennis materialeCordaTennis, Integer pezziDisponibili) {
		super(id, nome, prezzo, disponibilitaProdotto, categoriaProdotto, pezziDisponibili);
		this.marchioCordaTennis = marchioCordaTennis;
		this.calibroCorda = calibroCorda;
		this.coloreCorda = coloreCorda;
		this.tipoSetVenditaCordaTennis = tipoSetVenditaCordaTennis;
		this.materialeCordaTennis = materialeCordaTennis;
		if (this.getPezziDisponibili() < 1) {
			this.setDisponibilitaProdotto(DisponibilitaProdotto.Esaurito);
		} else {
			this.setDisponibilitaProdotto(DisponibilitaProdotto.Disponibile);
		}
	}

	@Override
	public String toString() {
		return "CordaTennis [id=" + getId() + ", nome=" + getNome() + ", marchioCordaTennis=" + marchioCordaTennis
				+ ", calibroCorda=" + calibroCorda + ", coloreCorda=" + coloreCorda + ", tipoSetVenditaCordaTennis="
				+ tipoSetVenditaCordaTennis + ", materialeCordaTennis=" + materialeCordaTennis + ", prezzo="
				+ getPrezzo() + ", disponibilitaProdotto=" + getDisponibilitaProdotto() + ", categoriaProdotto="
				+ getCategoriaProdotto() + ", pezziDisponibili=" + getPezziDisponibili() + "]";
	}
}
