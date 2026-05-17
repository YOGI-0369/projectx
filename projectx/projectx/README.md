# 🗂 AutoFolio — Portfolio Generator

A full-stack Spring Boot + MySQL + Thymeleaf portfolio builder.
Users fill a form, pick a theme & format, and get a shareable portfolio page instantly.

---

## 🏗 Architecture

```
Browser (HTML/CSS/JS)
    ↕  HTTP
Spring Boot (Java) — Controller → Service → Repository
    ↕  JPA/Hibernate
MySQL Database
```

---

## ⚙️ Prerequisites

- **Java 17+** — [Download](https://adoptium.net)
- **Maven 3.8+** — [Download](https://maven.apache.org)
- **MySQL 8+** — [Download](https://dev.mysql.com/downloads/)
- (Optional) **VS Code** with Extension Pack for Java

---

## 🚀 Setup Steps

### 1. Create MySQL Database

Open MySQL Workbench or terminal and run:

```sql
CREATE DATABASE autofolio_db;
```

> The tables are auto-created by Spring Boot (JPA ddl-auto=update)

### 2. Configure Database Password

Open `src/main/resources/application.properties` and update:

```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### 3. Run the App

**Option A: Terminal**
```bash
cd autofolio
mvn spring-boot:run
```

**Option B: VS Code**
- Install "Extension Pack for Java"
- Open the `autofolio` folder
- Open `AutofolioApplication.java`
- Click the ▶ Run button

### 4. Open in Browser

Visit: **http://localhost:8080**

---

## 📁 Project Structure

```
autofolio/
├── pom.xml                          ← Maven dependencies
└── src/main/
    ├── java/com/autofolio/
    │   ├── AutofolioApplication.java   ← Main entry point
    │   ├── controller/
    │   │   └── PortfolioController.java ← Routes & HTTP handling
    │   ├── model/
    │   │   └── Portfolio.java           ← Database entity
    │   ├── repository/
    │   │   └── PortfolioRepository.java ← DB queries (JPA)
    │   └── service/
    │       └── PortfolioService.java    ← Business logic
    └── resources/
        ├── application.properties       ← Config
        ├── templates/                   ← HTML pages (Thymeleaf)
        │   ├── index.html               ← Home page
        │   ├── create.html              ← Form page
        │   ├── gallery.html             ← Browse portfolios
        │   ├── not-found.html           ← 404 page
        │   └── portfolio/
        │       ├── professional.html    ← Professional format
        │       ├── developer.html       ← Developer (terminal) format
        │       ├── showcase.html        ← Project-focused format
        │       ├── minimal.html         ← Minimal format
        │       ├── creative.html        ← Creative format
        │       └── business.html        ← Business format
        └── static/
            ├── css/
            │   ├── style.css            ← Global styles
            │   ├── create.css           ← Form styles
            │   ├── portfolio.css        ← Portfolio view styles
            │   ├── dev-portfolio.css    ← Developer format styles
            │   └── showcase.css         ← Showcase format styles
            └── js/
                ├── main.js              ← Home page JS
                ├── create.js            ← Form multi-step JS
                └── portfolio.js         ← Portfolio view JS
```

---

## 🌐 Routes

| Route | Description |
|-------|-------------|
| `GET /` | Home / Landing page |
| `GET /create` | Show portfolio creation form |
| `POST /create` | Submit & save portfolio |
| `GET /portfolio/{username}` | View a portfolio |
| `GET /gallery` | Browse all portfolios |
| `GET /api/check-username?username=x` | AJAX username availability |

---

## 🎨 Themes & Formats

**Themes (color schemes):**
- Ocean (default) | Sunset | Forest | Midnight | Rose | Slate

**Formats (layout styles):**
- Professional | Developer | Showcase | Minimal | Creative | Business

---

## 🔮 Future Features to Add

- [ ] User authentication (Spring Security)
- [ ] Edit portfolio (update form)
- [ ] Profile photo upload
- [ ] Custom domain mapping
- [ ] PDF export of portfolio
- [ ] Analytics (views count)
- [ ] More portfolio formats

---

## 🛠 Common Errors & Fixes

**"Access denied for user 'root'"**
→ Wrong MySQL password in `application.properties`

**"Communications link failure"**
→ MySQL is not running. Start MySQL service.

**Port 8080 already in use**
→ Change `server.port=8081` in `application.properties`

**Maven not found**
→ Install Maven or use `./mvnw spring-boot:run` (Maven wrapper)
