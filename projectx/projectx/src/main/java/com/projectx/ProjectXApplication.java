package com.projectx;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProjectXApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectXApplication.class, args);
        System.out.println("====================================");
        System.out.println("  projectmvx is running!");
        System.out.println("  Visit: http://localhost:8080");
        System.out.println("====================================");
    }
}
