package com.SpringBoot_SpringSecurity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SpringBoot_SpringSecurity.models.MagliettaTennis;

@Repository
public interface MagliettaTennisRepository extends JpaRepository<MagliettaTennis, Long> {
	public List<MagliettaTennis> findMagliettaTennisByNome(String nome);

	public Boolean existsByNome(String nome);
}
