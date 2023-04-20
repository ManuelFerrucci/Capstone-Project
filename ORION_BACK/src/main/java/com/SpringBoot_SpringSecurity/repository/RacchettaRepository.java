package com.SpringBoot_SpringSecurity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SpringBoot_SpringSecurity.models.Racchetta;

@Repository
public interface RacchettaRepository extends JpaRepository<Racchetta, Long> {
	public List<Racchetta> findRacchettaByNome(String nome);

	public Boolean existsByNome(String nome);
}
