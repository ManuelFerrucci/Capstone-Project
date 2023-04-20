package com.SpringBoot_SpringSecurity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SpringBoot_SpringSecurity.models.Prodotto;
import com.SpringBoot_SpringSecurity.utils.CategoriaProdotto;
import com.SpringBoot_SpringSecurity.utils.DisponibilitaProdotto;

@Repository
public interface ProdottoRepository extends JpaRepository<Prodotto, Long> {
	public List<Prodotto> findByDisponibilitaProdotto(DisponibilitaProdotto disponibilitaProdotto);

	public List<Prodotto> findByCategoriaProdotto(CategoriaProdotto categoriaProdotto);

	public Prodotto findByNome(String nome);

	public Boolean existsByNome(String nome);
}
