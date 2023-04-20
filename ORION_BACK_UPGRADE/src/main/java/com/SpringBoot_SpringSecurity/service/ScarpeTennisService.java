package com.SpringBoot_SpringSecurity.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SpringBoot_SpringSecurity.models.ScarpeTennis;
import com.SpringBoot_SpringSecurity.repository.ScarpeTennisRepository;

@Service
public class ScarpeTennisService {

	@Autowired
	ScarpeTennisRepository scarpeTennisRepository;

	public ScarpeTennis salvaScarpe(ScarpeTennis scarpe) {
		if (esisteScarpeTennisByNome(scarpe.getNome()) == false) {
			scarpeTennisRepository.save(scarpe);
			System.out.println("Scarpa da tennis " + scarpe.getNome() + " salvata correttamente!");
			return scarpe;
		} else {
			System.out.println(
					"E' gia' presente una scarpa con nome " + scarpe.getNome() + ", dare un altro nome al prodotto.");
			return null;
		}
	}

	public ScarpeTennis trovaScarpeTennisById(Long id) {
		if (scarpeTennisRepository.existsById(id)) {
			ScarpeTennis scarpa = scarpeTennisRepository.findById(id).get();
			System.out.println("Scarpa da tennis trovata in db: " + scarpa);
			return scarpa;
		} else {
			System.out.println("Non risulta possibile trovare la scarpa da tennis con id " + id
					+ " perche' non esiste in database, devi prima aggiungerla!");
			return null;
		}
	}

	public List<ScarpeTennis> trovaScarpeTennisByNome(String nome) {
		List<ScarpeTennis> listaScarpe = scarpeTennisRepository.findScarpeTennisByNome(nome);
		if (listaScarpe.isEmpty()) {
			System.out.println("Non e' stata trovato nessun risultato per la ricerca '" + nome + "', riprova.");
			return null;
		} else {
			System.out.println("Lista delle scarpe da tennis trovate con il nome '" + nome + "': " + listaScarpe);
			return listaScarpe;
		}
	}

	public Boolean esisteScarpeTennisByNome(String nome) {
		Boolean risposta = scarpeTennisRepository.existsByNome(nome);
		if (risposta == true) {
			System.out.println("La scarpa da tennis '" + nome + "' ESISTE in database.");
		} else {
			System.out.println("La scarpa da tennis '" + nome + "' NON ESISTE in database.");
		}
		return risposta;
	}

	public ScarpeTennis modificaScarpeTennis(ScarpeTennis scarpe) {
		if (esisteScarpeTennisByNome(scarpe.getNome()) == true) {
			ScarpeTennis scarpeTrovate = trovaScarpeTennisById(scarpe.getId());
			scarpeTennisRepository.save(scarpeTrovate);
			System.out.println("Prodotto '" + scarpe.getNome() + "' modificato correttamente!");
			return scarpeTrovate;
		} else {
			System.out.println("Non risulta possibile modificare il prodotto con nome '" + scarpe.getNome()
					+ "' perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public ScarpeTennis modificaScarpeTennisById(ScarpeTennis scarpe) {
		if (scarpeTennisRepository.existsById(scarpe.getId())) {
			ScarpeTennis scarpeTrovate = trovaScarpeTennisById(scarpe.getId());
			scarpeTrovate = scarpe;
			scarpeTennisRepository.save(scarpeTrovate);
			System.out.println("Prodotto '" + scarpe.getNome() + "' modificato correttamente!");
			return scarpeTrovate;
		} else {
			System.out.println("Non risulta possibile modificare il prodotto con nome '" + scarpe.getNome()
					+ "' perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public String eliminaScarpeTennis(ScarpeTennis scarpe) {
		scarpeTennisRepository.delete(scarpe);
		System.out.println("Scarpa eliminata correttamente!");
		return "Scarpa eliminata correttamente!";
	}

}
