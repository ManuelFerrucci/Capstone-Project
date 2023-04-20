package com.SpringBoot_SpringSecurity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SpringBoot_SpringSecurity.models.Ordine;

@Repository
public interface OrdineRepository extends JpaRepository<Ordine, Long> {

}
