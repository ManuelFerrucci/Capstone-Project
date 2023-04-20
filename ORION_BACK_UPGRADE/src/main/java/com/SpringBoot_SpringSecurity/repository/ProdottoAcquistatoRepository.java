package com.SpringBoot_SpringSecurity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SpringBoot_SpringSecurity.models.ProdottoAcquistato;

@Repository
public interface ProdottoAcquistatoRepository extends JpaRepository<ProdottoAcquistato, Long> {

}
