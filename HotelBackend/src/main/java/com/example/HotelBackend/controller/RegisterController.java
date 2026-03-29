package com.example.HotelBackend.controller;

 

import org.springframework.web.bind.annotation.*;

import com.example.HotelBackend.model.Register;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*") // Angular URL
@RequestMapping("/api")
public class RegisterController {

    private List<Register> users = new ArrayList<>();

    // ✅ Register user (POST)
    @PostMapping("/register")
    public String registerUser(@RequestBody Register user) {
        users.add(user);
        return "User registered successfully";
    }

    // ✅ Get all users (GET)
    @GetMapping("/users")
    public List<Register> getUsers() {
        return users;
    }
}