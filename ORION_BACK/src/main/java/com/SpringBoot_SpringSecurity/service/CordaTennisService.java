package com.SpringBoot_SpringSecurity.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SpringBoot_SpringSecurity.models.CordaTennis;
import com.SpringBoot_SpringSecurity.repository.CordaTennisRepository;

@Service
public class CordaTennisService {

	@Autowired
	CordaTennisRepository cordaTennisRepository;

	public CordaTennis salvaCorda(CordaTennis corda) {
		if (esisteCordaTennisByNome(corda.getNome()) == false) {
			cordaTennisRepository.save(corda);
			System.out.println("Corda da tennis " + corda.getNome() + " salvata correttamente!");
			return corda;
		} else {
			System.out.println(
					"E' gia' presente una corda con nome " + corda.getNome() + ", dare un altro nome al prodotto.");
			return null;
		}
	}

	public CordaTennis trovaCordaTennisById(Long id) {
		if (cordaTennisRepository.existsById(id)) {
			CordaTennis corda = cordaTennisRepository.findById(id).get();
			System.out.println("Corda da tennis trovata in db: " + corda);
			return corda;
		} else {
			System.out.println("Non risulta possibile trovare la corda da tennis con id " + id
					+ " perche' non esiste in database, devi prima aggiungerla!");
			return null;
		}
	}

	public List<CordaTennis> trovaCordaTennisByNome(String nome) {
		List<CordaTennis> listaCorde = cordaTennisRepository.findCordaTennisByNome(nome);
		if (listaCorde.isEmpty()) {
			System.out.println("Non e' stata trovato nessun risultato per la ricerca '" + nome + "', riprova.");
			return null;
		} else {
			System.out.println("Lista delle corde da tennis trovate con il nome '" + nome + "': " + listaCorde);
			return listaCorde;
		}
	}

	public Boolean esisteCordaTennisByNome(String nome) {
		Boolean risposta = cordaTennisRepository.existsByNome(nome);
		if (risposta == true) {
			System.out.println("La corda da tennis '" + nome + "' ESISTE in database.");
		} else {
			System.out.println("La corda da tennis '" + nome + "' NON ESISTE in database.");
		}
		return risposta;

	}

	public CordaTennis modificaCordaTennis(CordaTennis corda) {
		if (esisteCordaTennisByNome(corda.getNome()) == true) {
			CordaTennis cordaTrovata = trovaCordaTennisById(corda.getId());
			cordaTennisRepository.save(cordaTrovata);
			System.out.println("Prodotto '" + corda.getNome() + "' modificato correttamente!");
			return cordaTrovata;
		} else {
			System.out.println("Non risulta possibile modificare il prodotto con nome '" + corda.getNome()
					+ "' perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public CordaTennis modificaCordaTennisById(CordaTennis corda) {
		if (cordaTennisRepository.existsById(corda.getId())) {
			CordaTennis cordaTrovata = trovaCordaTennisById(corda.getId());
			cordaTrovata = corda;
			cordaTennisRepository.save(cordaTrovata);
			System.out.println("Prodotto '" + corda.getNome() + "' modificato correttamente!");
			return cordaTrovata;
		} else {
			System.out.println("Non risulta possibile modificare il prodotto con nome '" + corda.getNome()
					+ "' perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public String eliminaCordaTennis(CordaTennis corda) {
		cordaTennisRepository.delete(corda);
		System.out.println("Corda eliminata correttamente!");
		return "Corda eliminata correttamente!";
	}

}
