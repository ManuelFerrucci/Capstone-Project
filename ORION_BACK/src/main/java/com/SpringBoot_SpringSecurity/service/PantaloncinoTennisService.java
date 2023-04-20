package com.SpringBoot_SpringSecurity.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SpringBoot_SpringSecurity.models.PantaloncinoTennis;
import com.SpringBoot_SpringSecurity.repository.PantaloncinoTennisRepository;

@Service
public class PantaloncinoTennisService {

	@Autowired
	PantaloncinoTennisRepository pantaloncinoTennisRepository;

	public PantaloncinoTennis salvaPantaloncinoTennis(PantaloncinoTennis pantaloncino) {
		if (esistePantaloncinoTennisByNome(pantaloncino.getNome()) == false) {
			pantaloncinoTennisRepository.save(pantaloncino);
			System.out.println("Pantaloncino da tennis " + pantaloncino.getNome() + " salvato correttamente!");
			return pantaloncino;
		} else {
			System.out.println("E' gia' presente un pantaloncino da tennis con nome " + pantaloncino.getNome()
					+ ", dare un altro nome al prodotto.");
			return null;
		}

	}

	public PantaloncinoTennis trovaPantaloncinoTennisById(Long id) {
		if (pantaloncinoTennisRepository.existsById(id)) {
			PantaloncinoTennis pantaloncinoTennis = pantaloncinoTennisRepository.findById(id).get();
			System.out.println("Pantaloncino da tennis trovato in db: " + pantaloncinoTennis);
			return pantaloncinoTennis;
		} else {
			System.out.println("Non risulta possibile trovare il pantaloncino da tennis con id " + id
					+ " perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public List<PantaloncinoTennis> trovaPantaloncinoTennisByNome(String nome) {
		List<PantaloncinoTennis> listaPantaloncini = pantaloncinoTennisRepository.findPantaloncinoTennisByNome(nome);
		if (listaPantaloncini.isEmpty()) {
			System.out.println("Non e' stata trovato nessun risultato per la ricerca '" + nome + "', riprova.");
			return null;
		} else {
			System.out.println(
					"Lista dei pantaloncini da tennis trovati con il nome '" + nome + "': " + listaPantaloncini);
			return listaPantaloncini;
		}
	}

	public Boolean esistePantaloncinoTennisByNome(String nome) {
		Boolean risposta = pantaloncinoTennisRepository.existsByNome(nome);
		if (risposta == true) {
			System.out.println("Il pantaloncino da tennis '" + nome + "' ESISTE in database.");
		} else {
			System.out.println("Il pantaloncino da tennis '" + nome + "' NON ESISTE in database.");
		}
		return risposta;
	}

	public PantaloncinoTennis modificaPantaloncinoTennis(PantaloncinoTennis pantaloncino) {
		if (esistePantaloncinoTennisByNome(pantaloncino.getNome()) == true) {
			PantaloncinoTennis pantaloncinoTrovato = trovaPantaloncinoTennisById(pantaloncino.getId());
			pantaloncinoTennisRepository.save(pantaloncinoTrovato);
			System.out.println("Prodotto '" + pantaloncino.getNome() + "' modificato correttamente!");
			return pantaloncinoTrovato;
		} else {
			System.out.println("Non risulta possibile modificare il prodotto con nome '" + pantaloncino.getNome()
					+ "' perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public PantaloncinoTennis modificaPantaloncinoTennisById(PantaloncinoTennis pantaloncino) {
		if (pantaloncinoTennisRepository.existsById(pantaloncino.getId())) {
			PantaloncinoTennis pantaloncinoTrovato = trovaPantaloncinoTennisById(pantaloncino.getId());
			pantaloncinoTrovato = pantaloncino;
			pantaloncinoTennisRepository.save(pantaloncinoTrovato);
			System.out.println("Prodotto '" + pantaloncino.getNome() + "' modificato correttamente!");
			return pantaloncinoTrovato;
		} else {
			System.out.println("Non risulta possibile modificare il prodotto con nome '" + pantaloncino.getNome()
					+ "' perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public String eliminaPantaloncinoTennis(PantaloncinoTennis pantaloncino) {
		pantaloncinoTennisRepository.delete(pantaloncino);
		System.out.println("Pantaloncino da tennis eliminato correttamente!");
		return "Pantaloncino da tennis eliminato correttamente!";
	}

}
