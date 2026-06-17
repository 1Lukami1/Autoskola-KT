# Autoškola KT — webové stránky

Moderní statický web autoškoly (HTML + CSS + JavaScript, bez nutnosti instalace čehokoliv).
Texty, ceny i fotky vycházejí z původního webu autoskolakt.cz, design je nový.

## Jak si web zobrazit

Stačí dvojklikem otevřít soubor **`index.html`** v prohlížeči. Funguje offline.

## Stránky

| Soubor | Stránka |
|--------|---------|
| `index.html` | Úvod |
| `sluzby.html` | Služby |
| `cenik.html` | Ceník |
| `vozidla.html` | Výcviková vozidla (galerie s filtrem a lightboxem) |
| `prihlaska.html` | Přihláška (online formulář) |
| `kontakt.html` | Kontakt (obě provozovny + mapa) |

Společné soubory: `assets/css/style.css` (vzhled), `assets/js/main.js` (interakce), `assets/img/` (fotky).
Procvičování testů odkazuje na oficiální `etesty2.mdcr.cz`.

## Přihláškový formulář — jak ho zapnout

Ve výchozím stavu formulář po odeslání **otevře e-mailový program** návštěvníka s předvyplněnou
přihláškou na adresu `autoskolakt@volny.cz`. Funguje hned, bez nastavení.

Pokud chcete, aby přihlášky **chodily přímo do e-mailu** (bez otevírání pošty u návštěvníka):

1. Zaregistrujte se zdarma na <https://formspree.io>.
2. Vytvořte nový formulář směřující na `autoskolakt@volny.cz`. Dostanete kód, např. `xayzbwqd`.
3. V souboru `prihlaska.html` najděte řádek s `data-formspree="https://formspree.io/f/VAS_KOD"`
   a nahraďte `VAS_KOD` svým kódem.

## Jak web vyvěsit na internet

Web je statický, takže ho lze nahrát na jakýkoliv hosting (Webnode, Wedos, Forpsi…),
nebo zdarma na **Netlify** / **GitHub Pages** — stačí nahrát celou tuto složku.

## Co je potřeba ještě upravit / ověřit

- **Ceny** odpovídají původnímu webu k červnu 2026 — před ostrým spuštěním prosím překontrolujte.
- **IČO** v patičce je uvedeno jen obecně („sdělíme na vyžádání"); doplňte dle potřeby.
- Fotky jsou převzaté z původního webu; pro ostrý web doporučuji časem nahradit kvalitnějšími.
