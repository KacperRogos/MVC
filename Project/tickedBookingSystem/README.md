# System rezerwacji biletów na wydarzenia

Projekt zaliczeniowy z przedmiotu **Wzorzec MVC w tworzeniu aplikacji internetowych** – Zadanie 5.

Aplikacja internetowa zbudowana w **Angular 21** umożliwiająca przeglądanie wydarzeń kulturalnych, rezerwację biletów oraz zarządzanie kontem użytkownika.

---

## Spis treści

1. [Funkcjonalności](#funkcjonalności)
2. [Struktura MVC](#struktura-mvc)
3. [Technologie](#technologie)
4. [Instalacja i uruchomienie](#instalacja-i-uruchomienie)
5. [Uruchomienie przez Docker](#uruchomienie-przez-docker)

---

## Funkcjonalności

### Wydarzenia
- Przeglądanie listy wydarzeń posortowanych od najbliższej daty
- Wyszukiwanie wydarzeń po nazwie
- Wyświetlanie szczegółów wydarzenia (nazwa, data, liczba wolnych miejsc)
- Dodawanie nowych wydarzeń (tylko zalogowany użytkownik)
- Edycja istniejących wydarzeń (tylko zalogowany użytkownik)
- Usuwanie wydarzeń (tylko zalogowany użytkownik)
- Walidacja formularza – wymagane pola, zakaz dodawania wydarzeń z datą z przeszłości
- Automatyczne usuwanie przeterminowanych wydarzeń z listy

### Rezerwacja biletów
- Rezerwacja biletu na wybrane wydarzenie (tylko zalogowany użytkownik)
- Blokada rezerwacji gdy brak wolnych miejsc
- Blokada rezerwacji na wydarzenia z datą z przeszłości
- Podgląd liczby zarezerwowanych biletów w zakładce "Moje rezerwacje"
- Anulowanie rezerwacji – miejsca wracają do puli

### Konto użytkownika
- Rejestracja nowego konta (nazwa użytkownika + hasło)
- Logowanie i wylogowanie
- Walidacja formularzy rejestracji i logowania
- Ochrona tras – niezalogowany użytkownik jest przekierowywany na stronę logowania

### Persystencja danych
- Wszystkie dane (wydarzenia, użytkownicy, rezerwacje) są przechowywane w **localStorage** – zostają po odświeżeniu strony

---

## Struktura MVC

| Warstwa | Technologia | Przykład |
|---|---|---|
| **Model** | Interfejsy TypeScript | `event.model.ts`, `user.model.ts` |
| **Kontroler** | Serwisy Angular | `event.service.ts`, `auth.service.ts`, `reservation.service.ts` |
| **Widok** | Komponenty Angular | `event-list`, `event-form`, `event-detail` |

### Komponenty
- `home` – strona główna
- `event-list` – lista wydarzeń z wyszukiwarką
- `event-form` – formularz dodawania i edycji wydarzenia
- `event-detail` – szczegóły wydarzenia i rezerwacja biletu
- `my-reservations` – lista rezerwacji zalogowanego użytkownika
- `login` – formularz logowania
- `register` – formularz rejestracji

### Serwisy
- `event.service.ts` – zarządzanie wydarzeniami (CRUD, rezerwacja)
- `auth.service.ts` – logowanie, rejestracja, sesja użytkownika
- `reservation.service.ts` – zarządzanie rezerwacjami użytkowników

### Guard
- `auth.guard.ts` – blokuje dostęp do chronionych tras dla niezalogowanych użytkowników

---

## Technologie

- **Angular 21**
- **TypeScript**
- **Bootstrap 5**
- **localStorage**
- **Docker** (opcjonalne uruchomienie w kontenerze)

---

## Instalacja i uruchomienie

### Wymagania
- Node.js (v18 lub nowszy)
- Angular CLI (`npm install -g @angular/cli`)

### Kroki

1. Sklonuj repozytorium:
```bash
git clone https://github.com/KacperRogos/tickedBookingSystem.git
cd tickedBookingSystem
```

2. Zainstaluj zależności:
```bash
npm install
```

3. Uruchom aplikację:
```bash
ng serve
```

4. Otwórz przeglądarkę i wejdź na:
```
http://localhost:4200
```

### Konto użytkownika
Zarejestruj nowe konto przez formularz rejestracji dostępny na stronie pod adresem `/register`.

---

## Uruchomienie przez Docker

### Wymagania
- Docker Desktop (https://www.docker.com/products/docker-desktop)

### Kroki

1. Zbuduj obraz:
```bash
docker build -t ticked-booking-system .
```

2. Uruchom kontener:
```bash
docker run -p 4000:4000 ticked-booking-system
```

3. Otwórz przeglądarkę i wejdź na:
```
http://localhost:4000
```
