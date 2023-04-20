package com.SpringBoot_SpringSecurity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SpringBoot_SpringSecurity.models.BorsaTennis;

@Repository
public interface BorsaTennisRepository extends JpaRepository<BorsaTennis, Long> {
	public List<BorsaTennis> findBorsaTennisByNome(String nome);

	public Boolean existsByNome(String nome);
}
