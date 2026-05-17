package com.projectx.controller;

import com.projectx.model.Portfolio;
import com.projectx.service.PortfolioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    // ============================================================
    // HOME PAGE
    // ============================================================
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("totalPortfolios", portfolioService.count());
        return "index";
    }

    // ============================================================
    // CREATE PORTFOLIO — Show form
    // ============================================================
    @GetMapping("/create")
    public String showCreateForm(Model model) {
        model.addAttribute("portfolio", new Portfolio());
        return "create";
    }

    // ============================================================
    // CREATE PORTFOLIO — Submit form
    // ============================================================
    @PostMapping("/create")
    public String createPortfolio(
            @Valid @ModelAttribute("portfolio") Portfolio portfolio,
            BindingResult result,
            Model model) {

        // Check for validation errors
        if (result.hasErrors()) {
            return "create";
        }

        // Check username already taken
        if (portfolioService.usernameExists(portfolio.getUsername())) {
            result.rejectValue("username", "error.username", "This username is already taken. Try another one.");
            return "create";
        }

        // Check email already used
        if (portfolioService.emailExists(portfolio.getEmail())) {
            result.rejectValue("email", "error.email", "This email is already registered.");
            return "create";
        }

        // Clean username: lowercase, no spaces
        portfolio.setUsername(portfolio.getUsername().toLowerCase().trim().replaceAll("\\s+", ""));

        // Save to DB
        portfolioService.save(portfolio);

        // Redirect to the new portfolio
        return "redirect:/portfolio/" + portfolio.getUsername();
    }

    // ============================================================
    // VIEW PORTFOLIO
    // ============================================================
    @GetMapping("/portfolio/{username}")
    public String viewPortfolio(@PathVariable String username, Model model) {
        Optional<Portfolio> portfolioOpt = portfolioService.findByUsername(username);

        if (portfolioOpt.isEmpty()) {
            model.addAttribute("username", username);
            return "not-found";
        }

        Portfolio portfolio = portfolioOpt.get();
        List<String> skills = portfolioService.parseSkills(portfolio.getSkills());

        model.addAttribute("portfolio", portfolio);
        model.addAttribute("skills", skills);

        // Route to format-specific template
        String format = portfolio.getFormat() != null ? portfolio.getFormat() : "professional";
        return "portfolio/" + format;
    }

    // ============================================================
    // CHECK USERNAME AVAILABILITY (AJAX)
    // ============================================================
    @GetMapping("/api/check-username")
    @ResponseBody
    public boolean checkUsername(@RequestParam String username) {
        return !portfolioService.usernameExists(username.toLowerCase().trim());
    }

    // ============================================================
    // GALLERY — all portfolios
    // ============================================================
    @GetMapping("/gallery")
    public String gallery(Model model) {
        model.addAttribute("portfolios", portfolioService.findAll());
        return "gallery";
    }
}
