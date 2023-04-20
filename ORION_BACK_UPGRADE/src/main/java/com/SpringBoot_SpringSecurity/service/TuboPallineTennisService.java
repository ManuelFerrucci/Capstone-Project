package com.SpringBoot_SpringSecurity.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SpringBoot_SpringSecurity.models.TuboPallineTennis;
import com.SpringBoot_SpringSecurity.repository.TuboPallineTennisRepository;

@Service
public class TuboPallineTennisService {

	@Autowired
	TuboPallineTennisRepository tuboPallineTennisRepository;

	public TuboPallineTennis salvaTuboPallineTennis(TuboPallineTennis tubo) {
		if (esisteTuboPallineByNome(tubo.getNome()) == false) {
			tuboPallineTennisRepository.save(tubo);
			System.out.println("Tubo di palline tennis " + tubo.getNome() + " salvato correttamente!");
			return tubo;
		} else {
			System.out.println("E' gia' presente un tubo di palline con nome " + tubo.getNome()
					+ ", dare un altro nome al prodotto.");
			return null;
		}
	}

	public TuboPallineTennis trovaTuboPallineById(Long id) {
		if (tuboPallineTennisRepository.existsById(id)) {
			TuboPallineTennis tubo = tuboPallineTennisRepository.findById(id).get();
			System.out.println("Tubo di palline tennis trovato in db: " + tubo);
			return tubo;
		} else {
			System.out.println("Non risulta possibile trovare il tubo di palline con id " + id
					+ " perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public List<TuboPallineTennis> trovaTuboPallineByNome(String nome) {
		List<TuboPallineTennis> listaTubi = tuboPallineTennisRepository.findTuboPallineTennisByNome(nome);
		if (listaTubi.isEmpty()) {
			System.out.println("Non e' stata trovato nessun risultato per la ricerca '" + nome + "', riprova.");
			return null;
		} else {
			System.out.println("Lista dei tubi di palline trovati con il nome '" + nome + "': " + listaTubi);
			return listaTubi;
		}
	}

	public Boolean esisteTuboPallineByNome(String nome) {
		Boolean risposta = tuboPallineTennisRepository.existsByNome(nome);
		if (risposta == true) {
			System.out.println("Il tubo di palline '" + nome + "' ESISTE in database.");
		} else {
			System.out.println("Il tubo di palline '" + nome + "' NON ESISTE in database.");
		}
		return risposta;
	}

	public TuboPallineTennis modificaTuboPalline(TuboPallineTennis tubo) {
		if (esisteTuboPallineByNome(tubo.getNome()) == true) {
			TuboPallineTennis tuboTrovato = trovaTuboPallineById(tubo.getId());
			tuboPallineTennisRepository.save(tuboTrovato);
			System.out.println("Prodotto '" + tubo.getNome() + "' modificato correttamente!");
			return tuboTrovato;
		} else {
			System.out.println("Non risulta possibile modificare il prodotto con nome '" + tubo.getNome()
					+ "' perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public TuboPallineTennis modificaTuboPallineById(TuboPallineTennis tubo) {
		if (tuboPallineTennisRepository.existsById(tubo.getId())) {
			TuboPallineTennis tuboTrovato = trovaTuboPallineById(tubo.getId());
			tuboTrovato = tubo;
			tuboPallineTennisRepository.save(tuboTrovato);
			System.out.println("Prodotto '" + tubo.getNome() + "' modificato correttamente!");
			return tuboTrovato;
		} else {
			System.out.println("Non risulta possibile modificare il prodotto con nome '" + tubo.getNome()
					+ "' perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public String eliminaTuboPalline(TuboPallineTennis tubo) {
		tuboPallineTennisRepository.delete(tubo);
		System.out.println("Tubo di palline eliminato correttamente!");
		return "Tubo di palline eliminato correttamente!";
	}

}
