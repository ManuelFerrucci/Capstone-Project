package com.SpringBoot_SpringSecurity.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SpringBoot_SpringSecurity.models.Ordine;
import com.SpringBoot_SpringSecurity.models.ProdottoAcquistato;
import com.SpringBoot_SpringSecurity.repository.OrdineRepository;
import com.SpringBoot_SpringSecurity.service.OrdineService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class OrdineController {

	@Autowired
	OrdineRepository ordineRepository;

	@Autowired
	OrdineService ordineService;

	@GetMapping("/lista-ordini")
	@PreAuthorize("isAuthenticated()")
	public List<Ordine> trovaTuttiGliOrdini() {
		List<Ordine> listaOrdini = ordineRepository.findAll();
		Collections.sort(listaOrdini, (prodotto1, prodotto2) -> {
			return prodotto1.getId().compareTo(prodotto2.getId());
		});
		return listaOrdini;
	}

	@GetMapping("/lista-ordini/id:{id}")
	@PreAuthorize("isAuthenticated()")
	public Ordine trovaOrdineTramiteId(@PathVariable Long id) {
		Ordine ordineTrovato = ordineService.trovaOrdineById(id);
		return ordineTrovato;
	}

	@GetMapping("/lista-ordini/ordine-id:{id}/prodotti-acquistati")
	@PreAuthorize("isAuthenticated()")
	public List<ProdottoAcquistato> trovaIProdottiAcquistatiInOrdineConId(@PathVariable Long id) {
		List<ProdottoAcquistato> listaProdottiAcq = ordineService.ricavaListaProdottiAcquistatiByIdOrdine(id);
		if (listaProdottiAcq == null) {
			System.out.println("La lista ovviamente e' vuota, l'ordine cercato in URL non esiste in database.");
			return null;
		} else {
			Collections.sort(listaProdottiAcq, (prodotto1, prodotto2) -> {
				return prodotto1.getId().compareTo(prodotto2.getId());
			});
			return listaProdottiAcq;
		}
	}

	@PostMapping("/inserisci-ordine")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Ordine> creaOrdine(@RequestBody Ordine ordine) {
		Ordine ordineDaCreare = ordineService.inserisciOrdineFRONT(ordine);
		return new ResponseEntity<Ordine>(ordineDaCreare, HttpStatus.OK);
	}

	@DeleteMapping("/elimina-ordine/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<Ordine>> eliminaOrdine(@PathVariable Long id) {
		ordineService.eliminaOrdineFRONT(id);
		List<Ordine> lista = ordineRepository.findAll();
		return new ResponseEntity<List<Ordine>>(lista, HttpStatus.OK);

	}
}
