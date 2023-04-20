package com.SpringBoot_SpringSecurity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SpringBoot_SpringSecurity.models.TuboPallineTennis;

@Repository
public interface TuboPallineTennisRepository extends JpaRepository<TuboPallineTennis, Long> {
	public List<TuboPallineTennis> findTuboPallineTennisByNome(String nome);

	public Boolean existsByNome(String nome);
}
