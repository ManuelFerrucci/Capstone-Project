package com.SpringBoot_SpringSecurity.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SpringBoot_SpringSecurity.entity.User;
import com.SpringBoot_SpringSecurity.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	UserRepository userRepository;

	@GetMapping("/lista-users")
	@PreAuthorize("isAuthenticated()")
	public List<User> trovaTuttiGliUsers() {
		List<User> listaUsers = userRepository.findAll();
		return listaUsers;
	}

}
