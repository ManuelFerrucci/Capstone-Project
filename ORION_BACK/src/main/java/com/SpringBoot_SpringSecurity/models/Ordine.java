package com.SpringBoot_SpringSecurity.models;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ordini")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Ordine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private LocalDate dataOrdine = LocalDate.now();

	@Column(nullable = false)
	private String cliente;

	@OneToMany(cascade = CascadeType.ALL)
	@Column(nullable = false)
	private List<ProdottoAcquistato> prodottiAcquistati;

	public Ordine(Long id, String cliente, List<ProdottoAcquistato> prodottiAcquistati) {
		this.id = id;
		this.cliente = cliente;
		this.prodottiAcquistati = prodottiAcquistati;
	}

	public Ordine(String cliente, List<ProdottoAcquistato> prodottiAcquistati) {
		this.cliente = cliente;
		this.prodottiAcquistati = prodottiAcquistati;
	}

	public Ordine(Long id, String cliente) {
		this.id = id;
		this.cliente = cliente;
	}

	@Override
	public String toString() {
		return "Ordine [id=" + id + ", dataOrdine=" + dataOrdine + ", cliente=" + cliente + ", prodottiAcquistati="
				+ prodottiAcquistati + "]";
	}
}
