package com.SpringBoot_SpringSecurity.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SpringBoot_SpringSecurity.models.ProdottoAcquistato;
import com.SpringBoot_SpringSecurity.repository.ProdottoAcquistatoRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ProdottoAcquistatoController {

	@Autowired
	ProdottoAcquistatoRepository prodottoAcquistatoRepository;

	@GetMapping("/lista-prodotti-acquistati")
	@PreAuthorize("isAuthenticated()")
	public List<ProdottoAcquistato> trovaTuttiIProdottiAcquistati() {
		List<ProdottoAcquistato> listaProdotti = prodottoAcquistatoRepository.findAll();
		Collections.sort(listaProdotti, (prodotto1, prodotto2) -> {
			return prodotto1.getId().compareTo(prodotto2.getId());
		});
		return listaProdotti;
	}

}
