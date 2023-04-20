package com.SpringBoot_SpringSecurity.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SpringBoot_SpringSecurity.models.BorsaTennis;
import com.SpringBoot_SpringSecurity.models.CordaTennis;
import com.SpringBoot_SpringSecurity.models.MagliettaTennis;
import com.SpringBoot_SpringSecurity.models.PantaloncinoTennis;
import com.SpringBoot_SpringSecurity.models.Prodotto;
import com.SpringBoot_SpringSecurity.models.Racchetta;
import com.SpringBoot_SpringSecurity.models.ScarpeTennis;
import com.SpringBoot_SpringSecurity.models.TuboPallineTennis;
import com.SpringBoot_SpringSecurity.repository.ProdottoRepository;
import com.SpringBoot_SpringSecurity.service.BorsaTennisService;
import com.SpringBoot_SpringSecurity.service.CordaTennisService;
import com.SpringBoot_SpringSecurity.service.MagliettaTennisService;
import com.SpringBoot_SpringSecurity.service.PantaloncinoTennisService;
import com.SpringBoot_SpringSecurity.service.ProdottoService;
import com.SpringBoot_SpringSecurity.service.RacchettaService;
import com.SpringBoot_SpringSecurity.service.ScarpeTennisService;
import com.SpringBoot_SpringSecurity.service.TuboPallineTennisService;
import com.SpringBoot_SpringSecurity.utils.CategoriaProdotto;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ProdottoController {

	@Autowired
	ProdottoRepository prodottoRepo;

	@Autowired
	ProdottoService prodottoService;

	@Autowired
	RacchettaService racchettaService;

	@Autowired
	TuboPallineTennisService tuboPallineTennisService;

	@Autowired
	CordaTennisService cordaTennisService;

	@Autowired
	MagliettaTennisService magliettaTennisService;

	@Autowired
	PantaloncinoTennisService pantaloncinoTennisService;

	@Autowired
	BorsaTennisService borsaTennisService;

	@Autowired
	ScarpeTennisService scarpeTennisService;

	@GetMapping("/lista-prodotti")
	@PreAuthorize("isAuthenticated()")
	public List<Prodotto> trovaTuttiIProdotti() {
		List<Prodotto> listaProdotti = prodottoRepo.findAll();
		Collections.sort(listaProdotti, (prodotto1, prodotto2) -> {
			return prodotto1.getId().compareTo(prodotto2.getId());
		});
		return listaProdotti;
	}

	@GetMapping("/lista-prodotti/id:{id}")
	@PreAuthorize("isAuthenticated()")
	public Prodotto trovaProdottoTramiteId(@PathVariable Long id) {
		Prodotto prodottoTrovato = prodottoService.trovaProdottoById(id);
		return prodottoTrovato;
	}

	@GetMapping("/lista-prodotti/{nomeProdotto}")
	@PreAuthorize("isAuthenticated()")
	public Prodotto trovaProdottoTramiteNome(@PathVariable String nomeProdotto) {
		Prodotto prodottoTrovato = prodottoService.trovaProdottoByNome(nomeProdotto);
		return prodottoTrovato;
	}

	@GetMapping("/lista-prodotti/categoria:{categoriaProdotto}")
	@PreAuthorize("isAuthenticated()")
	public List<Prodotto> trovaProdottiTramiteCategoria(@PathVariable CategoriaProdotto categoriaProdotto) {
		List<Prodotto> listaProdotti = prodottoService.trovaProdottoByCategoria(categoriaProdotto);
		Collections.sort(listaProdotti, (prodotto1, prodotto2) -> {
			return prodotto1.getId().compareTo(prodotto2.getId());
		});
		return listaProdotti;
	}

	@GetMapping("/lista-prodotti/categoria:Racchette")
	@PreAuthorize("isAuthenticated()")
	public List<Prodotto> trovaProdottiCategoriaRacchette() {
		List<Prodotto> listaProdotti = prodottoService.trovaProdottoByCategoria(CategoriaProdotto.Racchette);
		Collections.sort(listaProdotti, (prodotto1, prodotto2) -> {
			return prodotto1.getId().compareTo(prodotto2.getId());
		});
		return listaProdotti;
	}

	@GetMapping("/lista-prodotti/categoria:Palline")
	@PreAuthorize("isAuthenticated()")
	public List<Prodotto> trovaProdottiCategoriaPalline() {
		List<Prodotto> listaProdotti = prodottoService.trovaProdottoByCategoria(CategoriaProdotto.Palline);
		Collections.sort(listaProdotti, (prodotto1, prodotto2) -> {
			return prodotto1.getId().compareTo(prodotto2.getId());
		});
		return listaProdotti;
	}

	@GetMapping("/lista-prodotti/categoria:Corde")
	@PreAuthorize("isAuthenticated()")
	public List<Prodotto> trovaProdottiCategoriaCorde() {
		List<Prodotto> listaProdotti = prodottoService.trovaProdottoByCategoria(CategoriaProdotto.Corde);
		Collections.sort(listaProdotti, (prodotto1, prodotto2) -> {
			return prodotto1.getId().compareTo(prodotto2.getId());
		});
		return listaProdotti;
	}

	@GetMapping("/lista-prodotti/categoria:Magliette")
	@PreAuthorize("isAuthenticated()")
	public List<Prodotto> trovaProdottiCategoriaMagliette() {
		List<Prodotto> listaProdotti = prodottoService.trovaProdottoByCategoria(CategoriaProdotto.Magliette);
		Collections.sort(listaProdotti, (prodotto1, prodotto2) -> {
			return prodotto1.getId().compareTo(prodotto2.getId());
		});
		return listaProdotti;
	}

	@GetMapping("/lista-prodotti/categoria:Pantaloncini")
	@PreAuthorize("isAuthenticated()")
	public List<Prodotto> trovaProdottiCategoriaPantaloncini() {
		List<Prodotto> listaProdotti = prodottoService.trovaProdottoByCategoria(CategoriaProdotto.Pantaloncini);
		Collections.sort(listaProdotti, (prodotto1, prodotto2) -> {
			return prodotto1.getId().compareTo(prodotto2.getId());
		});
		return listaProdotti;
	}

	@GetMapping("/lista-prodotti/categoria:Borsoni")
	@PreAuthorize("isAuthenticated()")
	public List<Prodotto> trovaProdottiCategoriaBorsoni() {
		List<Prodotto> listaProdotti = prodottoService.trovaProdottoByCategoria(CategoriaProdotto.Borsoni);
		Collections.sort(listaProdotti, (prodotto1, prodotto2) -> {
			return prodotto1.getId().compareTo(prodotto2.getId());
		});
		return listaProdotti;
	}

	@GetMapping("/lista-prodotti/categoria:Scarpe")
	@PreAuthorize("isAuthenticated()")
	public List<Prodotto> trovaProdottiCategoriaScarpe() {
		List<Prodotto> listaProdotti = prodottoService.trovaProdottoByCategoria(CategoriaProdotto.Scarpe);
		Collections.sort(listaProdotti, (prodotto1, prodotto2) -> {
			return prodotto1.getId().compareTo(prodotto2.getId());
		});
		return listaProdotti;
	}

	@GetMapping("/lista-prodotti/prezzo-massimo:10")
	@PreAuthorize("isAuthenticated()")
	public List<Prodotto> trovaProdottiPrezzoInferiore10Euro() {
		List<Prodotto> listaProdotti = prodottoService.trovaProdottoConPrezzoMassimo(10.0);
		Collections.sort(listaProdotti, (prodotto1, prodotto2) -> {
			return prodotto1.getId().compareTo(prodotto2.getId());
		});
		return listaProdotti;
	}

	@GetMapping("/lista-prodotti/prezzo-massimo:25")
	@PreAuthorize("isAuthenticated()")
	public List<Prodotto> trovaProdottiPrezzoInferiore25Euro() {
		List<Prodotto> listaProdotti = prodottoService.trovaProdottoConPrezzoMassimo(25.0);
		Collections.sort(listaProdotti, (prodotto1, prodotto2) -> {
			return prodotto1.getId().compareTo(prodotto2.getId());
		});
		return listaProdotti;
	}

	@GetMapping("/lista-prodotti/prezzo-massimo:50")
	@PreAuthorize("isAuthenticated()")
	public List<Prodotto> trovaProdottiPrezzoInferiore50Euro() {
		List<Prodotto> listaProdotti = prodottoService.trovaProdottoConPrezzoMassimo(50.0);
		Collections.sort(listaProdotti, (prodotto1, prodotto2) -> {
			return prodotto1.getId().compareTo(prodotto2.getId());
		});
		return listaProdotti;
	}

	@GetMapping("/lista-prodotti/prezzo-massimo:100")
	@PreAuthorize("isAuthenticated()")
	public List<Prodotto> trovaProdottiPrezzoInferiore100Euro() {
		List<Prodotto> listaProdotti = prodottoService.trovaProdottoConPrezzoMassimo(100.0);
		Collections.sort(listaProdotti, (prodotto1, prodotto2) -> {
			return prodotto1.getId().compareTo(prodotto2.getId());
		});
		return listaProdotti;
	}

	@GetMapping("/lista-prodotti/prezzo-massimo:200")
	@PreAuthorize("isAuthenticated()")
	public List<Prodotto> trovaProdottiPrezzoInferiore200Euro() {
		List<Prodotto> listaProdotti = prodottoService.trovaProdottoConPrezzoMassimo(200.0);
		Collections.sort(listaProdotti, (prodotto1, prodotto2) -> {
			return prodotto1.getId().compareTo(prodotto2.getId());
		});
		return listaProdotti;
	}

	@PostMapping("/inserisci-prodotto")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Prodotto> creaProdotto(@RequestBody Prodotto prodotto) {
		Prodotto prodottoDaCreare = prodottoService.salvaProdotto(prodotto);
		return new ResponseEntity<Prodotto>(prodottoDaCreare, HttpStatus.OK);
	}

	@PostMapping("/inserisci-prodotto/racchette")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Racchetta> creaRacchetta(@RequestBody Racchetta racchetta) {
		Racchetta racchettaDaCreare = racchettaService.salvaRacchetta(racchetta);
		return new ResponseEntity<Racchetta>(racchettaDaCreare, HttpStatus.OK);
	}

	@PostMapping("/inserisci-prodotto/tubo-palline")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<TuboPallineTennis> creaTuboPalline(@RequestBody TuboPallineTennis tuboPalline) {
		TuboPallineTennis tuboPallineDaCreare = tuboPallineTennisService.salvaTuboPallineTennis(tuboPalline);
		return new ResponseEntity<TuboPallineTennis>(tuboPallineDaCreare, HttpStatus.OK);
	}

	@PostMapping("/inserisci-prodotto/corde")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<CordaTennis> creaCorda(@RequestBody CordaTennis corda) {
		CordaTennis cordaDaCreare = cordaTennisService.salvaCorda(corda);
		return new ResponseEntity<CordaTennis>(cordaDaCreare, HttpStatus.OK);
	}

	@PostMapping("/inserisci-prodotto/magliette")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<MagliettaTennis> creaMaglietta(@RequestBody MagliettaTennis maglietta) {
		MagliettaTennis magliettaDaCreare = magliettaTennisService.salvaMagliettaTennis(maglietta);
		return new ResponseEntity<MagliettaTennis>(magliettaDaCreare, HttpStatus.OK);
	}

	@PostMapping("/inserisci-prodotto/pantaloncini")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<PantaloncinoTennis> creaPantaloncino(@RequestBody PantaloncinoTennis pantaloncino) {
		PantaloncinoTennis pantaloncinoDaCreare = pantaloncinoTennisService.salvaPantaloncinoTennis(pantaloncino);
		return new ResponseEntity<PantaloncinoTennis>(pantaloncinoDaCreare, HttpStatus.OK);
	}

	@PostMapping("/inserisci-prodotto/borse")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<BorsaTennis> creaBorsa(@RequestBody BorsaTennis borsa) {
		BorsaTennis borsaDaCreare = borsaTennisService.salvaBorsa(borsa);
		return new ResponseEntity<BorsaTennis>(borsaDaCreare, HttpStatus.OK);
	}

	@PostMapping("/inserisci-prodotto/scarpe")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ScarpeTennis> creaScarpe(@RequestBody ScarpeTennis scarpe) {
		ScarpeTennis scarpeDaCreare = scarpeTennisService.salvaScarpe(scarpe);
		return new ResponseEntity<ScarpeTennis>(scarpeDaCreare, HttpStatus.OK);
	}

	@PutMapping("/modifica-prodotto/racchette")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Racchetta> modificaRacchetta(@RequestBody Racchetta racchetta) {
		Racchetta racchettaDaModificare = racchettaService.modificaRacchettaById(racchetta);
		return new ResponseEntity<Racchetta>(racchettaDaModificare, HttpStatus.OK);
	}

	@PutMapping("/modifica-prodotto/tubo-palline")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<TuboPallineTennis> modificaTuboPalline(@RequestBody TuboPallineTennis tubo) {
		TuboPallineTennis tuboDaModificare = tuboPallineTennisService.modificaTuboPallineById(tubo);
		return new ResponseEntity<TuboPallineTennis>(tuboDaModificare, HttpStatus.OK);
	}

	@PutMapping("/modifica-prodotto/corde")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<CordaTennis> modificaCorda(@RequestBody CordaTennis corda) {
		CordaTennis cordaDaModificare = cordaTennisService.modificaCordaTennisById(corda);
		return new ResponseEntity<CordaTennis>(cordaDaModificare, HttpStatus.OK);
	}

	@PutMapping("/modifica-prodotto/magliette")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<MagliettaTennis> modificaMaglietta(@RequestBody MagliettaTennis maglietta) {
		MagliettaTennis magliettaDaModificare = magliettaTennisService.modificaMagliettaTennisById(maglietta);
		return new ResponseEntity<MagliettaTennis>(magliettaDaModificare, HttpStatus.OK);
	}

	@PutMapping("/modifica-prodotto/pantaloncini")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<PantaloncinoTennis> modificaPantaloncino(@RequestBody PantaloncinoTennis pantaloncino) {
		PantaloncinoTennis pantaloncinoDaModificare = pantaloncinoTennisService
				.modificaPantaloncinoTennisById(pantaloncino);
		return new ResponseEntity<PantaloncinoTennis>(pantaloncinoDaModificare, HttpStatus.OK);
	}

	@PutMapping("/modifica-prodotto/borse")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<BorsaTennis> modificaBorsa(@RequestBody BorsaTennis borsa) {
		BorsaTennis borsaDaModificare = borsaTennisService.modificaBorsaTennisById(borsa);
		return new ResponseEntity<BorsaTennis>(borsaDaModificare, HttpStatus.OK);
	}

	@PutMapping("/modifica-prodotto/scarpe")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ScarpeTennis> modificaScarpe(@RequestBody ScarpeTennis scarpe) {
		ScarpeTennis scarpeDaModificare = scarpeTennisService.modificaScarpeTennisById(scarpe);
		return new ResponseEntity<ScarpeTennis>(scarpeDaModificare, HttpStatus.OK);
	}
}
