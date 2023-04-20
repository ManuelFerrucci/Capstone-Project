package com.SpringBoot_SpringSecurity.models;

import com.SpringBoot_SpringSecurity.utils.CategoriaProdotto;
import com.SpringBoot_SpringSecurity.utils.DisponibilitaProdotto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "prodotti")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Prodotto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String nome;

	@Column(nullable = false)
	private Double prezzo;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private DisponibilitaProdotto disponibilitaProdotto;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private CategoriaProdotto categoriaProdotto;
	
	@Column(nullable = false)
	private Integer pezziDisponibili;
}
