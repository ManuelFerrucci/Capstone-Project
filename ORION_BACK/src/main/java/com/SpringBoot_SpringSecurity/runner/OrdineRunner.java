package com.SpringBoot_SpringSecurity.runner;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.SpringBoot_SpringSecurity.service.OrdineService;
import com.SpringBoot_SpringSecurity.service.ProdottoAcquistatoService;
import com.SpringBoot_SpringSecurity.service.ProdottoService;

@Component
public class OrdineRunner implements ApplicationRunner {

	@Autowired
	OrdineService ordineService;

	@Autowired
	ProdottoService prodottoServiceOrd;

	@Autowired
	ProdottoAcquistatoService prodottoAcquistatoService;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println();
		System.out.println("OrdineRunner run...");
		System.out.println();
	}

}
