package com.SpringBoot_SpringSecurity.runner;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.SpringBoot_SpringSecurity.entity.ERole;
import com.SpringBoot_SpringSecurity.entity.Role;
import com.SpringBoot_SpringSecurity.payload.RegisterDto;
import com.SpringBoot_SpringSecurity.repository.RoleRepository;
import com.SpringBoot_SpringSecurity.repository.UserRepository;
import com.SpringBoot_SpringSecurity.service.AuthService;


@Component
public class AuthRunner implements ApplicationRunner {
	
	@Autowired RoleRepository roleRepository;
	@Autowired UserRepository userRepository;
	@Autowired PasswordEncoder passwordEncoder;
	@Autowired AuthService authService;
	
	private Set<Role> adminRole;
	private Set<Role> userRole;
	
	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("AuthRunner run...");
//		setRoleDefault();
//		setUserDefault();
		
	}
	
	private void setRoleDefault() {
		Role admin = new Role();
		admin.setRoleName(ERole.ROLE_ADMIN);
		roleRepository.save(admin);
		
		Role user = new Role();
		user.setRoleName(ERole.ROLE_USER);
		roleRepository.save(user);
		
		adminRole = new HashSet<Role>();
		adminRole.add(admin);
		adminRole.add(user);
		
		userRole = new HashSet<Role>();
		userRole.add(user);
	}
	
	private void setUserDefault() {
		

		Set<String> roleAdmin = new HashSet<>(
				adminRole.stream()
						.map(r -> r.getRoleName().toString())
						.collect(Collectors.toList())
				);

		Set<String> roleUser = new HashSet<>(
				userRole.stream()
						.map(r -> r.getRoleName().toString())
						.collect(Collectors.toList())
				);
		
		
		RegisterDto userAdmin = new RegisterDto();
		userAdmin.setName("AdminDefault");
		userAdmin.setUsername("adminDefault1");
		userAdmin.setEmail("adminDefault1@example.com");
		userAdmin.setPassword("adminDefault1");
		userAdmin.setRoles(roleAdmin);
		System.out.println(authService.register(userAdmin));
		
		RegisterDto simpleUser = new RegisterDto();
		simpleUser.setName("UserDefault");
		simpleUser.setUsername("userDefault1");
		simpleUser.setEmail("userDefault1@example.com");
		simpleUser.setPassword("userDefault1");
		simpleUser.setRoles(roleUser);
		System.out.println(authService.register(simpleUser));
	}

}
