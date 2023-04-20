package com.SpringBoot_SpringSecurity.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SpringBoot_SpringSecurity.models.Racchetta;
import com.SpringBoot_SpringSecurity.repository.RacchettaRepository;

@Service
public class RacchettaService {

	@Autowired
	RacchettaRepository racchettaRepository;

	public Racchetta salvaRacchetta(Racchetta racchetta) {
		if (esisteRacchettaByNome(racchetta.getNome()) == false) {
			racchettaRepository.save(racchetta);
			System.out.println("Racchetta " + racchetta.getNome() + " salvata correttamente!");
			return racchetta;
		} else {
			System.out.println("E' gia' presente una racchetta con nome " + racchetta.getNome()
					+ ", dare un altro nome al prodotto.");
			return null;
		}
	}

	public Racchetta trovaRacchettaById(Long id) {
		if (racchettaRepository.existsById(id)) {
			Racchetta racchetta = racchettaRepository.findById(id).get();
			System.out.println("Racchetta trovata in db: " + racchetta);
			return racchetta;
		} else {
			System.out.println("Non risulta possibile trovare la racchetta con id " + id
					+ " perche' non esiste in database, devi prima aggiungerla!");
			return null;
		}
	}

	public List<Racchetta> trovaRacchettaByNome(String nome) {
		List<Racchetta> listaRacchette = racchettaRepository.findRacchettaByNome(nome);
		if (listaRacchette.isEmpty()) {
			System.out.println("Non e' stata trovato nessun risultato per la ricerca '" + nome + "', riprova.");
			return null;
		} else {
			System.out.println("Lista delle racchette trovate con il nome '" + nome + "': " + listaRacchette);
			return listaRacchette;
		}
	}

	public Boolean esisteRacchettaByNome(String nome) {
		Boolean risposta = racchettaRepository.existsByNome(nome);
		if (risposta == true) {
			System.out.println("La racchetta '" + nome + "' ESISTE in database.");
		} else {
			System.out.println("La racchetta '" + nome + "' NON ESISTE in database.");
		}
		return risposta;
	}

	public Racchetta modificaRacchetta(Racchetta racchetta) {
		if (esisteRacchettaByNome(racchetta.getNome()) == true) {
			Racchetta racchettaTrovata = trovaRacchettaById(racchetta.getId());
			racchettaRepository.save(racchettaTrovata);
			System.out.println("Prodotto '" + racchetta.getNome() + "' modificato correttamente!");
			return racchettaTrovata;
		} else {
			System.out.println("Non risulta possibile modificare il prodotto con nome '" + racchetta.getNome()
					+ "' perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public Racchetta modificaRacchettaById(Racchetta racchetta) {
		if (racchettaRepository.existsById(racchetta.getId())) {
			Racchetta racchettaTrovata = trovaRacchettaById(racchetta.getId());
			racchettaTrovata = racchetta;
			racchettaRepository.save(racchettaTrovata);
			System.out.println("Prodotto '" + racchetta.getNome() + "' modificata correttamente!");
			return racchettaTrovata;
		} else {
			System.out.println("Non risulta possibile modificare il prodotto con nome '" + racchetta.getNome()
					+ "' perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public Racchetta rifornisciRacchettaByIdFRONT(Long id) {
		if (racchettaRepository.existsById(id)) {
			Racchetta racchetta = trovaRacchettaById(id);
			racchettaRepository.save(racchetta);
			System.out.println("Racchetta con id " + id + " rifornita!");
			return racchetta;
		} else {
			System.out.println("Non risulta possibile trovare il prodotto con id " + id
					+ " perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public String eliminaRacchetta(Racchetta racchetta) {
		racchettaRepository.delete(racchetta);
		System.out.println("Racchetta eliminata correttamente!");
		return "Racchetta eliminata correttamente!";
	}

}
