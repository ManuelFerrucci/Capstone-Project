package com.SpringBoot_SpringSecurity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SpringBoot_SpringSecurity.models.CordaTennis;

@Repository
public interface CordaTennisRepository extends JpaRepository<CordaTennis, Long> {
	public List<CordaTennis> findCordaTennisByNome(String nome);

	public Boolean existsByNome(String nome);
}
