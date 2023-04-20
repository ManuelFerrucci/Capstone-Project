package com.SpringBoot_SpringSecurity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SpringBoot_SpringSecurity.models.ScarpeTennis;

@Repository
public interface ScarpeTennisRepository extends JpaRepository<ScarpeTennis, Long> {
	public List<ScarpeTennis> findScarpeTennisByNome(String nome);

	public Boolean existsByNome(String nome);
}
