package com.projectx.repository;

import com.projectx.model.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {

    Optional<Portfolio> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
