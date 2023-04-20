package com.SpringBoot_SpringSecurity.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SpringBoot_SpringSecurity.models.MagliettaTennis;
import com.SpringBoot_SpringSecurity.repository.MagliettaTennisRepository;

@Service
public class MagliettaTennisService {

	@Autowired
	MagliettaTennisRepository magliettaTennisRepository;

	public MagliettaTennis salvaMagliettaTennis(MagliettaTennis magliettaTennis) {
		if (esisteMagliettaTennisByNome(magliettaTennis.getNome()) == false) {
			magliettaTennisRepository.save(magliettaTennis);
			System.out.println("Maglietta da tennis " + magliettaTennis.getNome() + " salvata correttamente!");
			return magliettaTennis;
		} else {
			System.out.println("E' gia' presente una maglietta da tennis con nome " + magliettaTennis.getNome()
					+ ", dare un altro nome al prodotto.");
			return null;
		}
	}

	public MagliettaTennis trovaMagliettaTennisById(Long id) {
		if (magliettaTennisRepository.existsById(id)) {
			MagliettaTennis magliettaTennis = magliettaTennisRepository.findById(id).get();
			System.out.println("Maglietta da tennis trovata in db: " + magliettaTennis);
			return magliettaTennis;
		} else {
			System.out.println("Non risulta possibile trovare la maglietta da tennis con id " + id
					+ " perche' non esiste in database, devi prima aggiungerla!");
			return null;
		}
	}

	public List<MagliettaTennis> trovaMagliettaTennisByNome(String nome) {
		List<MagliettaTennis> listaMagliette = magliettaTennisRepository.findMagliettaTennisByNome(nome);
		if (listaMagliette.isEmpty()) {
			System.out.println("Non e' stata trovato nessun risultato per la ricerca '" + nome + "', riprova.");
			return null;
		} else {
			System.out.println("Lista delle magliette da tennis trovate con il nome '" + nome + "': " + listaMagliette);
			return listaMagliette;
		}
	}

	public Boolean esisteMagliettaTennisByNome(String nome) {
		Boolean risposta = magliettaTennisRepository.existsByNome(nome);
		if (risposta == true) {
			System.out.println("La maglietta da tennis '" + nome + "' ESISTE in database.");
		} else {
			System.out.println("La maglietta da tennis '" + nome + "' NON ESISTE in database.");
		}
		return risposta;
	}

	public MagliettaTennis modificaMagliettaTennis(MagliettaTennis magliettaTennis) {
		if (esisteMagliettaTennisByNome(magliettaTennis.getNome()) == true) {
			MagliettaTennis magliettaTrovata = trovaMagliettaTennisById(magliettaTennis.getId());
			magliettaTennisRepository.save(magliettaTrovata);
			System.out.println("Prodotto '" + magliettaTennis.getNome() + "' modificato correttamente!");
			return magliettaTrovata;
		} else {
			System.out.println("Non risulta possibile modificare il prodotto con nome '" + magliettaTennis.getNome()
					+ "' perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public MagliettaTennis modificaMagliettaTennisById(MagliettaTennis magliettaTennis) {
		if (magliettaTennisRepository.existsById(magliettaTennis.getId())) {
			MagliettaTennis magliettaTrovata = trovaMagliettaTennisById(magliettaTennis.getId());
			magliettaTrovata = magliettaTennis;
			magliettaTennisRepository.save(magliettaTrovata);
			System.out.println("Prodotto '" + magliettaTennis.getNome() + "' modificato correttamente!");
			return magliettaTrovata;
		} else {
			System.out.println("Non risulta possibile modificare il prodotto con nome '" + magliettaTennis.getNome()
					+ "' perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public String eliminaMagliettaTennis(MagliettaTennis magliettaTennis) {
		magliettaTennisRepository.delete(magliettaTennis);
		System.out.println("Maglietta da tennis eliminata correttamente!");
		return "Maglietta da tennis eliminata correttamente!";
	}

}
