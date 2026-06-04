# System rezerwacji biletów na wydarzenia

Projekt zaliczeniowy z przedmiotu Wzorzec MVC w tworzeniu aplikacji internetowych, Zadanie 5.

Aplikacja internetowa zbudowana w Angular 21 umożliwiająca przeglądanie wydarzeń kulturalnych, rezerwację biletów oraz zarządzanie kontem użytkownika.

---

## Spis treści

1. [Funkcjonalności](#funkcjonalności)
2. [Struktura MVC](#struktura-mvc)
3. [Technologie](#technologie)
4. [Instalacja i uruchomienie](#instalacja-i-uruchomienie)
5. [Uruchomienie przez Docker](#uruchomienie-przez-docker)
6. [Testy](#testy)

---

## Funkcjonalności

### Wydarzenia

Lista wydarzeń jest posortowana od najbliższej daty. Można wyszukiwać wydarzenia po nazwie. Każde wydarzenie ma stronę ze szczegółami pokazującą nazwę, datę i liczbę wolnych miejsc. Zalogowany użytkownik może dodawać, edytować i usuwać wydarzenia. Formularz sprawdza czy wszystkie pola są wypełnione i nie pozwala dodać wydarzenia z datą z przeszłości. Wydarzenia których data minęła są automatycznie usuwane z listy.

### Rezerwacja biletów

Zalogowany użytkownik może rezerwować bilety na wydarzenia. Nie można zarezerwować biletu jeśli nie ma wolnych miejsc lub data wydarzenia minęła. W zakładce Moje rezerwacje widać ile biletów zostało zarezerwowanych na każde wydarzenie. Można anulować rezerwację i wtedy miejsca wracają do puli. Jeśli po rezerwacji wydarzenie zostało edytowane to pojawia się informacja o zmianie nazwy lub daty. Użytkownik może potwierdzić że wie o zmianach.

### Konto użytkownika

Można zarejestrować nowe konto podając nazwę użytkownika i hasło. Formularze rejestracji i logowania mają walidację. Niezalogowany użytkownik który spróbuje wejść na chronioną stronę zostaje przekierowany na stronę logowania.

### Dane

Wszystkie dane takie jak wydarzenia, użytkownicy i rezerwacje są zapisywane w localStorage przeglądarki i zostają po odświeżeniu strony.

---

## Struktura MVC

| Warstwa | Technologia | Przykład |
|---|---|---|
| Model | Interfejsy TypeScript | event.model.ts, user.model.ts |
| Kontroler | Serwisy Angular | event.service.ts, auth.service.ts, reservation.service.ts |
| Widok | Komponenty Angular | event-list, event-form, event-detail |

### Komponenty

- home: strona główna
- event-list: lista wydarzeń z wyszukiwarką
- event-form: formularz dodawania i edycji wydarzenia
- event-detail: szczegóły wydarzenia i rezerwacja biletu
- my-reservations: lista rezerwacji zalogowanego użytkownika
- login: formularz logowania
- register: formularz rejestracji

### Serwisy

- event.service.ts: zarządzanie wydarzeniami (dodawanie, edycja, usuwanie, rezerwacja)
- auth.service.ts: logowanie, rejestracja i sesja użytkownika
- reservation.service.ts: zarządzanie rezerwacjami użytkowników

### Guard

- auth.guard.ts: blokuje dostęp do chronionych stron dla niezalogowanych użytkowników

---

## Technologie

- Angular 21
- TypeScript
- Bootstrap 5
- localStorage
- Docker

---

## Instalacja i uruchomienie

Do uruchomienia potrzebny jest Node.js w wersji 18 lub nowszej oraz Angular CLI.

Instalacja Angular CLI:
```bash
npm install -g @angular/cli
```

Kroki:

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

Aby korzystać z aplikacji należy zarejestrować konto przez formularz dostępny pod adresem /register.

---

## Uruchomienie przez Docker

Do uruchomienia przez Docker potrzebny jest Docker Desktop dostępny na stronie https://www.docker.com/products/docker-desktop.

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

---

## Testy

Projekt zawiera testy jednostkowe dla serwisów i komponentów. Aby je uruchomić:
```bash
ng test
```
