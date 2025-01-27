package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/login")
    public String getLogin() {
        return "login/login";
    }

    @GetMapping("/admin")
    public String getAdmin() {
        return "admin/admin";
    }

    @GetMapping("/user")
    public String getUser() {
        return "user/user";
    }
}
