package com.SpringBoot_SpringSecurity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SpringBoot_SpringSecurity.models.PantaloncinoTennis;

@Repository
public interface PantaloncinoTennisRepository extends JpaRepository<PantaloncinoTennis, Long> {
	public List<PantaloncinoTennis> findPantaloncinoTennisByNome(String nome);

	public Boolean existsByNome(String nome);
}
