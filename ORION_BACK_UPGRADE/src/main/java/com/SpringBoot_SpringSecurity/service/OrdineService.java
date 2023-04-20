package com.SpringBoot_SpringSecurity.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.SpringBoot_SpringSecurity.models.Ordine;
import com.SpringBoot_SpringSecurity.models.Prodotto;
import com.SpringBoot_SpringSecurity.models.ProdottoAcquistato;
import com.SpringBoot_SpringSecurity.repository.OrdineRepository;
import com.SpringBoot_SpringSecurity.repository.ProdottoRepository;
import com.SpringBoot_SpringSecurity.utils.DisponibilitaProdotto;

@Service
public class OrdineService {

	@Autowired
	OrdineRepository ordineRepository;

	@Autowired
	ProdottoService prodottoServiceOrd;

	@Autowired
	ProdottoRepository prodottoRepository;

	@Autowired
	ProdottoAcquistatoService prodottoAcquistatoService;

	public Ordine inserisciOrdine(Ordine ordine) {
		List<ProdottoAcquistato> listaProdottiAcq = ordine.getProdottiAcquistati();
		if (listaProdottiAcq.isEmpty()) {
			System.out.println("Non possibile concludere l'ordine, la lista dei prodotti acquistati risulta vuota.");
			return null;
		} else {
			for (ProdottoAcquistato prodottoAcquistato : listaProdottiAcq) {
				prodottoAcquistatoService.salvaProdottoAcquistato(prodottoAcquistato);
				prodottoAcquistato.getProdotto()
						.setPezziDisponibili(prodottoAcquistato.getProdotto().getPezziDisponibili()
								- prodottoAcquistato.getNumeroPezziAcquistati());
				if (prodottoAcquistato.getProdotto().getPezziDisponibili() < 1) {
					prodottoAcquistato.getProdotto().setDisponibilitaProdotto(DisponibilitaProdotto.Esaurito);
				}
				prodottoRepository.save(prodottoAcquistato.getProdotto());
				System.out.println();
			}
			ordineRepository.save(ordine);
			System.out.println("Ordine inserito correttamente!");
			System.out.println();
			return ordine;
		}
	}

	public Ordine inserisciOrdineFRONT(Ordine ordine) {
		List<ProdottoAcquistato> listaProdottiAcq = ordine.getProdottiAcquistati();
		if (listaProdottiAcq.isEmpty()) {
			System.out.println("Non possibile concludere l'ordine, la lista dei prodotti acquistati risulta vuota.");
			return null;
		} else {
			for (ProdottoAcquistato prodottoAcquistato : listaProdottiAcq) {
				prodottoAcquistatoService.salvaProdottoAcquistato(prodottoAcquistato);
				System.out.println();
			}
			ordineRepository.save(ordine);
			System.out.println("Ordine inserito correttamente!");
			System.out.println();
			return ordine;
		}
	}

	public List<ProdottoAcquistato> generaListaAcq(List<Prodotto> listaProdotti) {
		if (listaProdotti.isEmpty()) {
			System.out.println("Non possibile procedere, la lista dei prodotti inserita risulta vuota.");
			return null;
		} else {
			List<ProdottoAcquistato> listaAcq = new ArrayList<ProdottoAcquistato>();
			for (Prodotto prodotto : listaProdotti) {
				ProdottoAcquistato prod = new ProdottoAcquistato();
				prod.setProdotto(prodotto);
				listaAcq.add(prod);
			}
			return listaAcq;
		}
	}

	public Ordine inserisciOrdineUpdate(Ordine ordine, List<Prodotto> listaProdotti) {
		if (listaProdotti.isEmpty()) {
			System.out.println("Non possibile concludere l'ordine, la lista dei prodotti da acquistare risulta vuota.");
			return null;
		} else {
			List<ProdottoAcquistato> listaProdAcquistati = new ArrayList<ProdottoAcquistato>();
			for (Prodotto prodotto : listaProdotti) {
				ProdottoAcquistato nuovoProdAcq = new ProdottoAcquistato();
				nuovoProdAcq.setProdotto(prodotto);
				listaProdAcquistati.add(nuovoProdAcq);
				prodottoAcquistatoService.salvaProdottoAcquistato(nuovoProdAcq);
				nuovoProdAcq.getProdotto().setPezziDisponibili(
						nuovoProdAcq.getProdotto().getPezziDisponibili() - nuovoProdAcq.getNumeroPezziAcquistati());
				if (nuovoProdAcq.getProdotto().getPezziDisponibili() < 1) {
					nuovoProdAcq.getProdotto().setDisponibilitaProdotto(DisponibilitaProdotto.Esaurito);
				}
				prodottoRepository.save(nuovoProdAcq.getProdotto());
				System.out.println();
			}
			ordine.setProdottiAcquistati(listaProdAcquistati);
			ordineRepository.save(ordine);
			System.out.println("Ordine inserito correttamente!");
			System.out.println();
			return ordine;
		}

	}

	public Boolean esisteOrdineById(Long id) {
		Boolean risposta = ordineRepository.existsById(id);
		if (risposta == true) {
			System.out.println("L'ordine con id " + id + " ESISTE in database.");
		} else {
			System.out.println("L'ordine con id " + id + " NON ESISTE in database.");
		}
		return risposta;
	}

	public Ordine trovaOrdineById(Long id) {
		if (ordineRepository.existsById(id)) {
			Ordine ordine = ordineRepository.findById(id).get();
			System.out.println("Ordine trovato: " + ordine);
			return ordine;
		} else {
			System.out.println("Non risulta possibile trovare l'ordine con id " + id
					+ " perche' non esiste in database, devi prima inserirlo!");
			return null;
		}
	}

	public String modificaOrdine(Ordine ordine) {
		if (ordineRepository.existsById(ordine.getId()) == true) {
			Ordine ordineCercato = ordineRepository.findById(ordine.getId()).get();
			ordineRepository.save(ordineCercato);
			System.out.println("Ordine con id " + ordine.getId() + " modificato correttamente!");
			return "Ordine con id " + ordine.getId() + " modificato correttamente!";
		} else {
			System.out.println("Non risulta possibile modificare l'ordine con id " + ordine.getId()
					+ " perche' non esiste in database, devi prima aggiungerlo!");
			return "Non risulta possibile modificare l'ordine con id " + ordine.getId()
					+ " perche' non esiste in database, devi prima aggiungerlo!";
		}
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = false, noRollbackFor = Exception.class)
	public String eliminaOrdine(Ordine ordine) {
		if (ordineRepository.existsById(ordine.getId()) == true) {
			Ordine ordineCercato = ordineRepository.findById(ordine.getId()).get();
			List<ProdottoAcquistato> lista = ordineCercato.getProdottiAcquistati();
			for (ProdottoAcquistato prodottoAcquistato : lista) {
				Integer pezziAquistatiNumero = prodottoAcquistato.getNumeroPezziAcquistati();
				prodottoAcquistato.getProdotto().setPezziDisponibili(
						prodottoAcquistato.getProdotto().getPezziDisponibili() + pezziAquistatiNumero);
				prodottoRepository.save(prodottoAcquistato.getProdotto());
			}
			ordineRepository.delete(ordineCercato);
			System.out.println("Ordine eliminato correttamente!");
			return "Ordine eliminato correttamente!";
		} else {
			System.out.println(
					"Non risulta possibile eliminare l'ordine perche' non esiste in database, devi prima aggiungerlo!");
			return "Non risulta possibile eliminare l'ordine perche' non esiste in database, devi prima aggiungerlo!";
		}
	}

	public String eliminaOrdineFRONT(Long id) {
		if (ordineRepository.existsById(id) == true) {
			Ordine ordineCercato = ordineRepository.findById(id).get();
			ordineRepository.delete(ordineCercato);
			System.out.println("Ordine eliminato correttamente!");
			return "Ordine eliminato correttamente!";
		} else {
			System.out.println(
					"Non risulta possibile eliminare l'ordine perche' non esiste in database, devi prima aggiungerlo!");
			return "Non risulta possibile eliminare l'ordine perche' non esiste in database, devi prima aggiungerlo!";
		}
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = true, noRollbackFor = Exception.class)
	public List<Ordine> trovaOrdiniByNomeProdottoAcquistato(String nomeProdotto) {
		List<Ordine> listaOrdini = ordineRepository.findAll();
		if (listaOrdini.isEmpty()) {
			System.out.println("Non sono presenti ordini in database");
			return null;
		} else {
			List<Ordine> listaFiltrata = new ArrayList<Ordine>();
			System.out.println("Ordini contenenti il prodotto " + nomeProdotto + ":");
			for (Ordine ordine : listaOrdini) {
				List<ProdottoAcquistato> listaProdottiAquistati = ordine.getProdottiAcquistati();
				for (ProdottoAcquistato prodottoAcquistato : listaProdottiAquistati) {
					if (prodottoAcquistato.getNome().equals(nomeProdotto)) {
						listaFiltrata.add(ordine);
						System.out.println(ordine);
					}
				}
			}
			System.out.println();
			if (listaFiltrata.isEmpty()) {
				System.out.println("Non sono stati trovati ordini con all'interno il prodotto " + nomeProdotto);
				return null;
			} else {
				return listaFiltrata;
			}
		}
	}

	public List<ProdottoAcquistato> ricavaListaProdottiAcquistatiByIdOrdine(Long id) {
		if (esisteOrdineById(id) == false) {
			System.out.println("Non risulta possibile trovare l'ordine con id " + id
					+ " perche' non esiste in database, devi prima inserirlo!");

			return null;
		} else {
			Ordine ordineCercato = ordineRepository.findById(id).get();
			List<ProdottoAcquistato> listaProdotti = ordineCercato.getProdottiAcquistati();
			System.out.println("L'ordine con id " + id + " contiene la seguente lista di prodotti: " + listaProdotti);
			return listaProdotti;
		}
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = true, noRollbackFor = Exception.class)
	public Double calcolaPrezzoTotaleOrdineById(Long id) {
		if (esisteOrdineById(id) == false) {
			System.out.println("Non risulta possibile calcolare il totale dell'ordine con id " + id
					+ " perche' non esiste in database, devi prima aggiungerlo!");
			return null;
		} else {
			Ordine ordine = ordineRepository.findById(id).get();
			List<ProdottoAcquistato> listaProdottiAquistati = ordine.getProdottiAcquistati();
			Double totale = 0.0;
			for (ProdottoAcquistato prodottoAcquistato : listaProdottiAquistati) {
				totale += (prodottoAcquistato.getPrezzoSingolo() * prodottoAcquistato.getNumeroPezziAcquistati());
			}
			System.out.println(
					"Il totale da pagare per l'ordine con id " + ordine.getId() + " ammonta a: " + totale + " euro.");
			System.out.println();
			return totale;
		}
	}
}
