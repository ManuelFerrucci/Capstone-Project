package com.SpringBoot_SpringSecurity.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SpringBoot_SpringSecurity.models.ProdottoAcquistato;
import com.SpringBoot_SpringSecurity.repository.ProdottoAcquistatoRepository;

@Service
public class ProdottoAcquistatoService {

	@Autowired
	ProdottoAcquistatoRepository prodottoAcquistatoRepository;

	public String salvaProdottoAcquistato(ProdottoAcquistato proAcq) {
		prodottoAcquistatoRepository.save(proAcq);
		System.out.println("Prodotto acquistato salvato correttamente!");
		return "Prodotto acquistato salvato correttamente!";
	}

	public Boolean esisteProdottoAcquistatoById(Long id) {
		Boolean risposta = prodottoAcquistatoRepository.existsById(id);
		if (risposta == true) {
			System.out.println("Il prodotto acquistato con id " + id + " ESISTE in database.");
		} else {
			System.out.println("Il prodotto acquistato con id " + id + " NON ESISTE in database.");
		}
		return risposta;
	}

	public ProdottoAcquistato trovaProdottoAcquistatoById(Long id) {
		if (prodottoAcquistatoRepository.existsById(id)) {
			ProdottoAcquistato proAcq = prodottoAcquistatoRepository.findById(id).get();
			System.out.println("Prodotto acquistato trovato: " + proAcq);
			return proAcq;
		} else {
			System.out.println("Non risulta possibile trovare il prodotto acquistato con id " + id
					+ " perche' non esiste in database, devi prima inserirlo!");
			return null;
		}
	}

}
