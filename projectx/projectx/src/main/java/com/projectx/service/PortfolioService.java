package com.projectx.service;

import com.projectx.model.Portfolio;
import com.projectx.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    public Portfolio save(Portfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }

    public Optional<Portfolio> findByUsername(String username) {
        return portfolioRepository.findByUsername(username);
    }

    public boolean usernameExists(String username) {
        return portfolioRepository.existsByUsername(username);
    }

    public boolean emailExists(String email) {
        return portfolioRepository.existsByEmail(email);
    }

    public List<Portfolio> findAll() {
        return portfolioRepository.findAll();
    }

    public long count() {
        return portfolioRepository.count();
    }

    /**
     * Parse comma-separated skills into a list for template rendering
     */
    public List<String> parseSkills(String skillsStr) {
        if (skillsStr == null || skillsStr.isBlank()) return List.of();
        return List.of(skillsStr.split(","))
                .stream()
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }
}
