package com.SpringBoot_SpringSecurity.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SpringBoot_SpringSecurity.models.Prodotto;
import com.SpringBoot_SpringSecurity.repository.ProdottoRepository;
import com.SpringBoot_SpringSecurity.utils.CategoriaProdotto;
import com.SpringBoot_SpringSecurity.utils.DisponibilitaProdotto;

//import jakarta.persistence.EntityExistsException;

@Service
public class ProdottoService {

	@Autowired
	ProdottoRepository prodottoRepository;

	public Prodotto salvaProdotto(Prodotto prodotto) {
		if (esisteProdottoByNome(prodotto.getNome()) == false) {
			prodottoRepository.save(prodotto);
			System.out.println("Prodotto '" + prodotto.getNome() + "' salvato correttamente! Categoria prodotto: '"
					+ prodotto.getCategoriaProdotto() + "'.");
			return prodotto;
		} else {
			System.out.println("E' gia' presente un prodotto con nome " + prodotto.getNome() + ", dare un altro nome.");
			return null;
		}
	}

	public Prodotto trovaProdottoById(Long id) {
		if (prodottoRepository.existsById(id)) {
			Prodotto prodotto = prodottoRepository.findById(id).get();
			System.out.println("Prodotto trovato in db: " + prodotto);
			return prodotto;
		} else {
			System.out.println("Non risulta possibile trovare il prodotto con id " + id
					+ " perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public String modificaProdotto(Prodotto prodotto) {
		if (esisteProdottoByNome(prodotto.getNome()) == true) {
			Prodotto prodottoTrovato = trovaProdottoById(prodotto.getId());
			prodottoRepository.save(prodottoTrovato);
			System.out.println("Prodotto '" + prodotto.getNome() + "' modificato correttamente!");
			return "Prodotto '" + prodotto.getNome() + "' modificato correttamente!";
		} else {
			System.out.println("Non risulta possibile modificare il prodotto con nome '" + prodotto.getNome()
					+ "' perche' non esiste in database, devi prima aggiungerlo!");
			return "Non risulta possibile modificare il prodotto con nome '" + prodotto.getNome()
					+ "' perche' non esiste in database, devi prima aggiungerlo!";
		}
	}

	public String eliminaProdotto(Prodotto prodotto) {
		if (esisteProdottoByNome(prodotto.getNome()) == true) {
			Prodotto prodottoTrovato = trovaProdottoById(prodotto.getId());
			prodottoRepository.delete(prodottoTrovato);
			System.out.println("Prodotto eliminato correttamente!");
			return "Prodotto eliminato correttamente!";
		} else {
			System.out.println("Non risulta possibile eliminare il prodotto con nome '" + prodotto.getNome()
					+ "' perche' non esiste in database, devi prima aggiungerlo!");
			return "Non risulta possibile eliminare il prodotto con nome '" + prodotto.getNome()
					+ "' perche' non esiste in database, devi prima aggiungerlo!";
		}
	}

	public Prodotto trovaProdottoByNome(String nome) {
		if (esisteProdottoByNome(nome) == false) {
			System.out.println("Risultato della ricerca prodotto con nome '" + nome + "':");
			System.out.println("Non sono stati trovati risultati con i parametri inseriti. Riprovare.");
			return null;
		} else {
			Prodotto prodotto = prodottoRepository.findByNome(nome);
			System.out.println("Risultato della ricerca prodotto con nome '" + nome + "': " + prodotto);
			System.out.println();
			return prodotto;
		}
	}

	public Boolean esisteProdottoByNome(String nome) {
		Boolean risposta = prodottoRepository.existsByNome(nome);
		if (risposta == true) {
			System.out.println("Il prodotto '" + nome + "' ESISTE in database.");
		} else {
			System.out.println("Il prodotto '" + nome + "' NON ESISTE in database.");
		}
		return risposta;
	}

	public List<Prodotto> trovaProdottoConPrezzoMassimo(Double prezzo) {
		List<Prodotto> listaProdotti = prodottoRepository.findAll();
		if (listaProdotti.isEmpty()) {
			System.out.println("Non sono presenti prodotti in catalogo.");
			return null;
		} else {
			List<Prodotto> listaFiltrata = new ArrayList<Prodotto>();
			System.out.println("Risultato della ricerca prodotti con prezzo massimo di " + prezzo + " euro:");
			for (Prodotto prodotto : listaProdotti) {
				if (prodotto.getPrezzo() <= prezzo) {
					listaFiltrata.add(prodotto);
					System.out.println(prodotto);
				}
			}
			if (listaFiltrata.isEmpty()) {
				System.out.println("Non sono stati trovati risultati con i parametri inseriti. Riprovare.");
				return null;
			} else {
				return listaFiltrata;
			}
		}
	}

	public List<Prodotto> trovaProdottoNumeroPezziDisponibiliMinimo(Integer pezziDisponibili) {
		List<Prodotto> listaProdotti = prodottoRepository.findAll();
		if (listaProdotti.isEmpty()) {
			System.out.println("Non sono presenti prodotti in catalogo.");
			return null;
		} else {
			List<Prodotto> listaFiltrata = new ArrayList<Prodotto>();
			System.out.println("Risultato della ricerca prodotti con numero minimo di " + pezziDisponibili
					+ " pezzi disponibili:");
			for (Prodotto prodotto : listaProdotti) {
				if (prodotto.getPezziDisponibili() >= pezziDisponibili) {
					listaFiltrata.add(prodotto);
					System.out.println(prodotto);
				}
			}
			if (listaFiltrata.isEmpty()) {
				System.out.println("Non sono stati trovati risultati con i parametri inseriti. Riprovare.");
				return null;
			} else {
				return listaFiltrata;
			}
		}
	}

	public List<Prodotto> trovaProdottoNumeroPezziDisponibiliMassimo(Integer pezziDisponibili) {
		List<Prodotto> listaProdotti = prodottoRepository.findAll();
		if (listaProdotti.isEmpty()) {
			System.out.println("Non sono presenti prodotti in catalogo.");
			return null;
		} else {
			List<Prodotto> listaFiltrata = new ArrayList<Prodotto>();
			System.out.println("Risultato della ricerca prodotti con numero massimo di " + pezziDisponibili
					+ " pezzi disponibili:");
			for (Prodotto prodotto : listaProdotti) {
				if (prodotto.getPezziDisponibili() <= pezziDisponibili) {
					listaFiltrata.add(prodotto);
					System.out.println(prodotto);
				}
			}
			if (listaFiltrata.isEmpty()) {
				System.out.println("Non sono stati trovati risultati con i parametri inseriti. Riprovare.");
				return null;
			} else {
				return listaFiltrata;
			}
		}
	}

	public List<Prodotto> trovaProdottoByCategoria(CategoriaProdotto categoria) {
		List<Prodotto> listaProdotti = prodottoRepository.findByCategoriaProdotto(categoria);
		if (listaProdotti.isEmpty()) {
			System.out.println();
			System.out.println("Risultato della ricerca prodotti con categoria " + categoria + ":");
			System.out.println("Non sono stati trovati risultati con i parametri inseriti. Riprovare.");
			System.out.println();
			return null;
		} else {
			System.out.println();
			System.out.println("Risultato della ricerca prodotti con categoria " + categoria + ":");
			for (Prodotto prodotto : listaProdotti) {
				System.out.println(prodotto);
			}
			System.out.println();
			return listaProdotti;
		}
	}

	public List<Prodotto> trovaProdottoByDisponibilita(DisponibilitaProdotto disponibilita) {
		List<Prodotto> listaProdotti = prodottoRepository.findByDisponibilitaProdotto(disponibilita);
		if (listaProdotti.isEmpty()) {
			System.out.println();
			System.out.println("Risultato della ricerca prodotti con disponibilita' '" + disponibilita + "':");
			System.out.println("Non sono stati trovati risultati con i parametri inseriti. Riprovare.");
			return null;
		} else {
			System.out.println();
			System.out.println("Risultato della ricerca prodotti con disponibilita' '" + disponibilita + "':");
			for (Prodotto prodotto : listaProdotti) {
				System.out.println(prodotto);
			}
			return listaProdotti;
		}
	}

	public List<Prodotto> trovaTuttiProdotti() {
		List<Prodotto> lista = prodottoRepository.findAll();
		if (lista.isEmpty()) {
			System.out.println("Non ci sono prodotti in catalogo.");
			return null;
		} else {
			System.out.println();
			System.out.println("Lista prodotti disponibili in catalogo:");
			for (Prodotto prodotto : lista) {
				System.out.println(prodotto);
			}
			return lista;
		}
	}

	public Prodotto rifornisciProdottoByIdFRONT(Long id) {
		if (prodottoRepository.existsById(id)) {
			Prodotto prodotto = trovaProdottoById(id);
			prodottoRepository.save(prodotto);
			System.out.println("Prodotto con id " + id + " rifornito!");
			return prodotto;
		} else {
			System.out.println("Non risulta possibile trovare il prodotto con id " + id
					+ " perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public String rifornisciProdottoById(Long id, Integer numeroPezzi) {
		if (prodottoRepository.existsById(id)) {
			Prodotto prodotto = prodottoRepository.findById(id).get();
			prodotto.setPezziDisponibili(prodotto.getPezziDisponibili() + numeroPezzi);
			prodottoRepository.save(prodotto);
			System.out
					.println("Numero di pezzi del prodotto con id " + id + " rifornito di " + numeroPezzi + " pezzi!");
			return "Numero di pezzi del prodotto con id " + id + " rifornito di " + numeroPezzi + " pezzi!";
		} else {
			System.out.println("Non risulta possibile trovare il prodotto con id " + id
					+ " perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		}
	}

	public String rifornisciProdottoByNome(String nome, Integer numeroPezzi) {
		if (esisteProdottoByNome(nome) == false) {
			System.out.println("Non risulta possibile trovare il prodotto con nome " + nome
					+ " perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		} else {
			Prodotto prodotto = prodottoRepository.findByNome(nome);
			prodotto.setPezziDisponibili(prodotto.getPezziDisponibili() + numeroPezzi);
			prodotto.setDisponibilitaProdotto(DisponibilitaProdotto.Disponibile);
			prodottoRepository.save(prodotto);
			System.out.println(
					"Numero di pezzi del prodotto con nome " + nome + " rifornito di " + numeroPezzi + " pezzi!");
			return "Numero di pezzi del prodotto con nome " + nome + " rifornito di " + numeroPezzi + " pezzi!";
		}
	}

}
