package com.SpringBoot_SpringSecurity.models;

import com.SpringBoot_SpringSecurity.utils.CategoriaProdotto;
import com.SpringBoot_SpringSecurity.utils.Colore;
import com.SpringBoot_SpringSecurity.utils.DestinatarioAbbigliamento;
import com.SpringBoot_SpringSecurity.utils.DisponibilitaProdotto;
import com.SpringBoot_SpringSecurity.utils.LunghezzaPantaloncino;
import com.SpringBoot_SpringSecurity.utils.Marchio;
import com.SpringBoot_SpringSecurity.utils.TagliaAbbigliamento;
import com.SpringBoot_SpringSecurity.utils.TaschePantaloncino;

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
public class PantaloncinoTennis extends ProdottoAbbigliamento {

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private LunghezzaPantaloncino lunghezzaPantaloncino;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private TaschePantaloncino taschePantaloncino;

	public PantaloncinoTennis(Long id, String nome, Double prezzo, DisponibilitaProdotto disponibilitaProdotto,
			CategoriaProdotto categoriaProdotto, DestinatarioAbbigliamento destinatarioAbbigliamento, Marchio marchio,
			TagliaAbbigliamento tagliaAbbigliamento, Colore colore, LunghezzaPantaloncino lunghezzaPantaloncino,
			TaschePantaloncino taschePantaloncino, Integer pezziDisponibili) {
		super(id, nome, prezzo, disponibilitaProdotto, categoriaProdotto, destinatarioAbbigliamento, marchio,
				tagliaAbbigliamento, colore, pezziDisponibili);
		this.lunghezzaPantaloncino = lunghezzaPantaloncino;
		this.taschePantaloncino = taschePantaloncino;
		if (this.getPezziDisponibili() < 1) {
			this.setDisponibilitaProdotto(DisponibilitaProdotto.Esaurito);
		} else {
			this.setDisponibilitaProdotto(DisponibilitaProdotto.Disponibile);
		}
	}

	@Override
	public String toString() {
		return "PantaloncinoTennis [id=" + getId() + ", nome=" + getNome() + ", lunghezzaPantaloncino="
				+ lunghezzaPantaloncino + ", taschePantaloncino=" + taschePantaloncino + ", destinatarioAbbigliamento="
				+ getDestinatarioAbbigliamento() + ", marchio=" + getMarchio() + ", tagliaAbbigliamento="
				+ getTagliaAbbigliamento() + ", colore=" + getColore() + ", prezzo=" + getPrezzo()
				+ ", disponibilitaProdotto=" + getDisponibilitaProdotto() + ", categoriaProdotto="
				+ getCategoriaProdotto() + ", pezziDisponibili=" + getPezziDisponibili() + "]";
	}

}
