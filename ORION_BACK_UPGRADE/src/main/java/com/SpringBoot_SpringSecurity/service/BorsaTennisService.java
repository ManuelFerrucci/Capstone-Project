package com.SpringBoot_SpringSecurity.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SpringBoot_SpringSecurity.models.BorsaTennis;
import com.SpringBoot_SpringSecurity.repository.BorsaTennisRepository;

@Service
public class BorsaTennisService {

	@Autowired
	BorsaTennisRepository borsaTennisRepository;

	public BorsaTennis salvaBorsa(BorsaTennis borsa) {
		if (esisteBorsaTennisByNome(borsa.getNome()) == false) {
			borsaTennisRepository.save(borsa);
			System.out.println("Borsa da tennis " + borsa.getNome() + " salvata correttamente!");
			return borsa;
		} else {
			System.out.println(
					"E' gia' presente una borsa con nome " + borsa.getNome() + ", dare un altro nome al prodotto.");
			return null;
		}
	}

	public BorsaTennis trovaBorsaTennisById(Long id) {
		if (borsaTennisRepository.existsById(id)) {
			BorsaTennis borsa = borsaTennisRepository.findById(id).get();
			System.out.println("Borsa da tennis trovata in db: " + borsa);
			return borsa;
		} else {
			System.out.println("Non risulta possibile trovare la borsa da tennis con id " + id
					+ " perche' non esiste in database, devi prima aggiungerla!");
			return null;
		}
	}

	public List<BorsaTennis> trovaBorsaTennisByNome(String nome) {
		List<BorsaTennis> listaBorse = borsaTennisRepository.findBorsaTennisByNome(nome);
		if (listaBorse.isEmpty()) {
			System.out.println("Non e' stata trovato nessun risultato per la ricerca '" + nome + "', riprova.");
			return null;
		} else {
			System.out.println("Lista delle borse da tennis trovate con il nome '" + nome + "': " + listaBorse);
			return listaBorse;
		}
	}

	public Boolean esisteBorsaTennisByNome(String nome) {
		Boolean risposta = borsaTennisRepository.existsByNome(nome);
		if (risposta == true) {
			System.out.println("La borsa da tennis '" + nome + "' ESISTE in database.");
		} else {
			System.out.println("La borsa da tennis '" + nome + "' NON ESISTE in database.");
		}
		return risposta;
	}

	public BorsaTennis modificaBorsaTennis(BorsaTennis borsa) {
		if (esisteBorsaTennisByNome(borsa.getNome()) == true) {
			BorsaTennis borsaTrovata = trovaBorsaTennisById(borsa.getId());
			borsaTennisRepository.save(borsaTrovata);
			System.out.println("Prodotto '" + borsa.getNome() + "' modificato correttamente!");
			return borsaTrovata;
		} else {
			System.out.println("Non risulta possibile modificare il prodotto con nome '" + borsa.getNome()
					+ "' perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public BorsaTennis modificaBorsaTennisById(BorsaTennis borsa) {
		if (borsaTennisRepository.existsById(borsa.getId())) {
			BorsaTennis borsaTrovata = trovaBorsaTennisById(borsa.getId());
			borsaTrovata = borsa;
			borsaTennisRepository.save(borsaTrovata);
			System.out.println("Prodotto '" + borsa.getNome() + "' modificato correttamente!");
			return borsaTrovata;
		} else {
			System.out.println("Non risulta possibile modificare il prodotto con nome '" + borsa.getNome()
					+ "' perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public String eliminaBorsaTennis(BorsaTennis borsa) {
		borsaTennisRepository.delete(borsa);
		System.out.println("Borsa eliminata correttamente!");
		return "Borsa eliminata correttamente!";
	}
}
