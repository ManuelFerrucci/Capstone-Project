package com.SpringBoot_SpringSecurity.models;

import com.SpringBoot_SpringSecurity.utils.CategoriaProdotto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "prodotti_acquistati")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProdottoAcquistato {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String nome;

	@Column(nullable = false)
	private Double prezzoSingolo;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private CategoriaProdotto categoriaProdotto;

	@Column(nullable = false)
	private Integer numeroPezziAcquistati;

	@ManyToOne
	@JoinColumn(name = "id_prodotto", nullable = false)
	private Prodotto prodotto;

	public void setProdotto(Prodotto prodotto) {
		this.prodotto = prodotto;
		this.nome = prodotto.getNome();
		this.prezzoSingolo = prodotto.getPrezzo();
		this.categoriaProdotto = prodotto.getCategoriaProdotto();
	}

//	public void setNumeroPezziAcquistati(Integer numeroPezziAcquistati) {
//		if (numeroPezziAcquistati > getProdotto().getPezziDisponibili()) {
//			this.numeroPezziAcquistati = getProdotto().getPezziDisponibili();
//		} else {
//			this.numeroPezziAcquistati = numeroPezziAcquistati;
//		}
//	}

	@Override
	public String toString() {
		return "ProdottoAcquistato [id=" + id + ", nome=" + nome + ", prezzoSingolo=" + prezzoSingolo + ", categoriaProdotto="
				+ categoriaProdotto + ", prodotto=" + prodotto + ", dettaglioProdotto=" + getProdotto() + "]";
	}
}
