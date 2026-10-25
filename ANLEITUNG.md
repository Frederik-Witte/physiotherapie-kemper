# Ihre Website selbst bearbeiten

Liebes Team der Physiotherapie Kemper,

mit dieser Anleitung können Sie Texte, Leistungen, Öffnungszeiten, Fotos und vieles mehr auf Ihrer Website selbst ändern. Programmierkenntnisse brauchen Sie dafür nicht. Die Einrichtung dauert einmalig etwa 20 Minuten. Danach ist eine Änderung meist in wenigen Minuten erledigt.

> **Keine Sorge:** Jede Änderung wird automatisch gesichert und kann jederzeit rückgängig gemacht werden. Sie können also nichts dauerhaft kaputt machen.

## Auf einen Blick

| | |
|---|---|
| Ihre Website | <https://frederik-witte.github.io/physiotherapie-kemper/> |
| Website bearbeiten | <https://frederik-witte.github.io/physiotherapie-kemper/admin/> |
| Wann ist eine Änderung online? | etwa 1–2 Minuten nach dem Speichern |

Legen Sie sich am besten gleich ein Lesezeichen für die Seite „Website bearbeiten“ an.

## Inhalt

- [So funktioniert es](#so-funktioniert-es)
- [Teil 1: Einmalig einrichten](#teil-1-einmalig-einrichten)
  - [Schritt 1: GitHub-Konto anlegen](#schritt-1-github-konto-anlegen)
  - [Schritt 2: Einladung annehmen](#schritt-2-einladung-annehmen)
  - [Schritt 3: Zugriffstoken erstellen](#schritt-3-zugriffstoken-erstellen)
  - [Schritt 4: Anmelden](#schritt-4-anmelden)
- [Teil 2: Inhalte ändern](#teil-2-inhalte-ändern)
  - [Wo finde ich was?](#wo-finde-ich-was)
  - [Einen Text ändern](#einen-text-ändern)
  - [Speichern und online stellen](#speichern-und-online-stellen)
  - [Leistungen ergänzen](#leistungen-ergänzen)
  - [Team-Mitglied hinzufügen](#team-mitglied-hinzufügen)
  - [Foto austauschen](#foto-austauschen)
  - [Öffnungszeiten ändern](#öffnungszeiten-ändern)
  - [Urlaubs-Hinweis ein- und ausschalten](#urlaubs-hinweis-ein--und-ausschalten)
  - [Google-Bewertung aktualisieren](#google-bewertung-aktualisieren)
- [Wenn etwas schiefgeht](#wenn-etwas-schiefgeht)
- [Vor dem Livegang: Checkliste](#vor-dem-livegang-checkliste)

---

## So funktioniert es

Alle Texte und Fotos Ihrer Website liegen in einem sicheren Online-Speicher namens **GitHub**. Auf der Seite „Website bearbeiten“ sehen Sie diese Inhalte als einfache Formulare.

1. Sie ändern einen Text oder ein Foto und klicken auf **„Speichern“**.
2. GitHub merkt sich die Änderung als neue Version.
3. Die Website wird automatisch neu erstellt. Nach etwa 1–2 Minuten ist die neue Fassung online.

Jede gespeicherte Version bleibt erhalten. Deshalb lässt sich jede Änderung später nachvollziehen und bei Bedarf zurücknehmen.

> **Gut zu wissen:** GitHub selbst ist auf Englisch, die Seite „Website bearbeiten“ ist auf Deutsch. Englische Begriffe, die Sie anklicken müssen, stehen in dieser Anleitung in Anführungszeichen, zum Beispiel „Accept invitation“.

---

## Teil 1: Einmalig einrichten

Diese vier Schritte machen Sie nur ein einziges Mal (pro Person und Computer).

### Schritt 1: GitHub-Konto anlegen

Ein GitHub-Konto ist kostenlos.

1. Öffnen Sie <https://github.com/signup>.
2. Geben Sie Ihre E-Mail-Adresse ein, wählen Sie ein sicheres Passwort und einen Benutzernamen (zum Beispiel `praxis-kemper` oder Ihren Namen).
3. GitHub schickt Ihnen einen Bestätigungscode per E-Mail. Geben Sie ihn ein.
4. GitHub bittet Sie, die **Zwei-Faktor-Anmeldung** einzurichten: Bei der Anmeldung geben Sie dann zusätzlich einen Code von Ihrem Smartphone ein. Das schützt Ihre Website. Folgen Sie einfach den Anweisungen und bewahren Sie die angezeigten Wiederherstellungscodes („recovery codes“) gut auf.
5. Teilen Sie Ihrem technischen Ansprechpartner Ihren **Benutzernamen** mit. Er lädt Sie dann zur Website ein.

**Tipp:** Wenn mehrere Personen die Website pflegen, legt am besten jede ein eigenes Konto an. Dann ist später sichtbar, wer was geändert hat.

### Schritt 2: Einladung annehmen

1. Sie bekommen von GitHub eine E-Mail mit dem Betreff „… invited you to collaborate on Frederik-Witte/physiotherapie-kemper“.
2. Klicken Sie in der E-Mail auf „View invitation“ und dann auf **„Accept invitation“**.

Die Einladung gilt 7 Tage. Ist keine E-Mail angekommen? Dann melden Sie sich bei GitHub an und öffnen Sie <https://github.com/Frederik-Witte/physiotherapie-kemper/invitations>.

### Schritt 3: Zugriffstoken erstellen

Ein **Zugriffstoken** ist eine Art Schlüssel, der nur für Ihre Website gilt. Sie erstellen ihn einmal bei GitHub und geben ihn dann auf der Seite „Website bearbeiten“ ein. Ihr GitHub-Passwort bleibt dabei geheim.

1. Melden Sie sich bei GitHub an und öffnen Sie <https://github.com/settings/personal-access-tokens/new>.
   (Der Weg über das Menü: Profilbild oben rechts → „Settings“ → ganz unten links „Developer settings“ → „Personal access tokens“ → „Fine-grained tokens“ → „Generate new token“.)
2. **„Token name“:** zum Beispiel `Website Physiotherapie Kemper`.
3. **„Expiration“** (Ablaufdatum): Wählen Sie zum Beispiel ein Jahr. Tragen Sie sich das Datum in den Kalender ein. Wenn das Token abgelaufen ist, erstellen Sie einfach auf dem gleichen Weg ein neues.
4. **„Repository access“:** Wählen Sie **„Only select repositories“** und dann in der Liste **`physiotherapie-kemper`**.
5. **„Permissions“:** Fügen Sie die Berechtigung **„Contents“** hinzu und stellen Sie sie auf **„Read and write“**. („Metadata: Read-only“ wird automatisch ergänzt. Das ist richtig so.)
6. Klicken Sie unten auf **„Generate token“**.
7. Das Token wird **nur ein einziges Mal** angezeigt (es beginnt mit `github_pat_`). Kopieren Sie es sofort und bewahren Sie es so sicher auf wie ein Passwort, zum Beispiel in einem Passwort-Manager. Schicken Sie es nicht per E-Mail. Ist es verloren gegangen, erstellen Sie einfach ein neues.

> **Taucht `physiotherapie-kemper` bei Punkt 4 („Repository access“) nicht in der Liste auf?**
> Das passiert, wenn die Website einem anderen GitHub-Konto gehört als Ihrem. Für diesen Fall bietet GitHub diese Art von Token (noch) nicht an. Erstellen Sie dann ein **klassisches Token**:
>
> 1. Öffnen Sie <https://github.com/settings/tokens/new>.
> 2. „Note“: `Website Physiotherapie Kemper`. „Expiration“: zum Beispiel ein Jahr.
> 3. Setzen Sie den Haken bei **„repo“** (sonst nichts).
> 4. Klicken Sie auf **„Generate token“** und kopieren Sie das Token (es beginnt mit `ghp_`).
>
> Alles Weitere funktioniert genauso.

### Schritt 4: Anmelden

1. Öffnen Sie <https://frederik-witte.github.io/physiotherapie-kemper/admin/>.
2. Klicken Sie auf **„Mit Zugriffstoken anmelden“**.
3. Fügen Sie Ihr Token in das Feld „Persönliches Zugriffstoken“ ein und klicken Sie auf **„Anmelden“**.

Erscheint die Seite auf Englisch („Sign In Using Access Token“), ist Ihr Browser auf Englisch eingestellt. Nach der Anmeldung können Sie die Sprache im Konto-Menü oben rechts unter „Settings“ („Einstellungen“) auf Deutsch umstellen.

Ihr Browser merkt sich die Anmeldung. Beim nächsten Mal sind Sie direkt angemeldet. An einem Computer, den auch andere benutzen, melden Sie sich nach der Arbeit bitte ab (Konto-Menü oben rechts → „Abmelden“).

> **Später auch bequemer möglich:** Auf Wunsch kann ein Knopf **„Mit GitHub anmelden“** ergänzt werden. Dann brauchen Sie kein Token mehr und melden sich einfach mit Ihrem GitHub-Konto an. Sprechen Sie dafür Ihren technischen Ansprechpartner an.

---

## Teil 2: Inhalte ändern

### Wo finde ich was?

Nach der Anmeldung sehen Sie links den Bereich **„Inhalte“**. Darin ist die Website in Themen aufgeteilt:

| Bereich | Was Sie dort ändern |
|---|---|
| **Praxisdaten & Öffnungszeiten** | Telefon, Fax, E-Mail, Adresse, Öffnungszeiten, Urlaubs-Hinweis, Google-Bewertung, Facebook |
| **Startseite (Startbild, Über uns, Kontakt)** | Startbild mit Überschrift, Kurzfakten, „Über uns“, Kontakt & Anfahrt, Angaben für Google |
| **Leistungen** | Leistungsbereiche und alle einzelnen Leistungen mit Erklärung |
| **Team** | Die Inhaber und weitere Team-Mitglieder |
| **Stellenanzeige** | Der kleine Kasten „Wir suchen Verstärkung“ |
| **Praxis-Galerie („Die Praxis“)** | Die Fotos Ihrer Räume |
| **Ablauf der Behandlung** | „So läuft Ihre Behandlung ab“ und „Bitte mitbringen“ |
| **Häufige Fragen** | Fragen und Antworten |
| **Menü & Fußzeile** | Die Menüpunkte und die Links ganz unten |
| **Impressum & Datenschutz** | Die beiden rechtlichen Seiten |

Unter vielen Feldern steht ein kleiner grauer Hinweis, was dort hineingehört. Lange Listen sind zugeklappt: Ein Klick auf einen Eintrag klappt ihn auf.

**Platzhalter in geschweiften Klammern:** In manchen Texten stehen Angaben wie `{telefon}`, `{email}` oder `{strasse}`. Diese Platzhalter werden auf der Website automatisch durch die Angaben aus „Praxisdaten & Öffnungszeiten“ ersetzt. Telefonnummer und E-Mail-Adresse werden dabei sogar anklickbar. Bitte lassen Sie die Platzhalter so stehen. Ändert sich zum Beispiel Ihre Telefonnummer, ändern Sie sie nur einmal in „Praxisdaten & Öffnungszeiten“, und sie stimmt überall auf der Website.

Diese Platzhalter gibt es: `{telefon}` `{fax}` `{email}` `{strasse}` `{strasse_lang}` (Straße ausgeschrieben, also „Moosbergstraße 4“) `{plz}` `{ort}` `{stadtteil}` `{lage}` `{name}` `{rechtsname}` `{route}` (Link zu Google Maps; er trägt denselben Text wie der Knopf „Route planen“ bei „Kontakt & Anfahrt“ und ändert sich mit ihm).

### Einen Text ändern

Beispiel: der Text im Bereich „Über uns“.

1. Klicken Sie links auf **„Inhalte“** und dann auf **„Startseite (Startbild, Über uns, Kontakt)“**.
2. Öffnen Sie den Abschnitt **„Über uns“** und ändern Sie im Feld **„Text“** den Text wie in einem normalen Textprogramm.
3. Klicken Sie oben rechts auf **„Speichern“**.

Längere Texte können einfache Formatierungen enthalten. Nutzen Sie dafür die Knöpfe über dem Textfeld, zum Beispiel für **fett** oder eine Aufzählung. Einen neuen Absatz erhalten Sie mit einer Leerzeile.

### Speichern und online stellen

- Nach dem Klick auf **„Speichern“** ist Ihre Änderung sofort sicher bei GitHub gespeichert.
- Die Website wird nun automatisch neu erstellt. **Nach etwa 1–2 Minuten** ist die Änderung online.
- Sehen Sie noch die alte Fassung? Browser merken sich Seiten oft einige Minuten lang. Laden Sie die Seite neu: unter Windows mit **Strg + F5**, am Mac mit **Cmd + Umschalt + R**, am Smartphone durch Neuladen der Seite. Oder warten Sie ein paar Minuten.
- Sie können mehrere Änderungen nacheinander speichern. Sie werden der Reihe nach online gestellt.

Schauen Sie sich die Änderung danach am besten auch kurz auf dem Smartphone an. Viele Ihrer Patientinnen und Patienten besuchen die Website von dort.

### Leistungen ergänzen

1. Öffnen Sie **„Inhalte“ → „Leistungen“**.
2. Klappen Sie unter **„Leistungsbereiche“** den passenden Bereich auf, zum Beispiel „Manuelle Verfahren & Tapes“.
3. Klicken Sie unter **„Leistungen in diesem Bereich“** auf **„Leistung hinzufügen“**.
4. Füllen Sie aus:
   - **Name der Leistung**, zum Beispiel „Schlingentisch-Therapie“
   - **Abkürzung** (freiwillig), zum Beispiel „KG“
   - **Erklärung**: zwei bis drei kurze, allgemein verständliche Sätze, was die Behandlung ist. Sie erscheint, wenn man die Leistung antippt.
5. Mit „Nach oben“ und „Nach unten“ am Eintrag ändern Sie die Reihenfolge.
6. **Wichtig:** Jeder Bereich hat zwei kurze Zusammenfassungen: **„Stichworte für die Übersicht (Computer)“** und **„Aufzählung der Leistungen (Handy)“**. Ergänzen Sie dort die neue Leistung ebenfalls. Lassen Sie die beiden Felder leer, stellt die Website die Zusammenfassung automatisch aus den Namen der Leistungen zusammen.
7. **„Speichern“** klicken.

Eine Leistung entfernen Sie über den Knopf „Dieses Element entfernen“ am jeweiligen Eintrag.

**Der senkrechte Strich in „Massage & Lymph|drainage“** ist Absicht: Er markiert, wo das lange Wort in der großen Überschrift getrennt werden darf, wenn der Platz nicht reicht (vor allem auf schmalen Bildschirmen). Auf der Website ist der Strich unsichtbar. Sie können ihn auch in anderen langen Bereichsnamen setzen oder einfach weglassen.

**Tipp zur Wortwahl:** Beschreiben Sie, was eine Behandlung *ist* und wobei sie helfen *kann* oder *soll*, so wie in den vorhandenen Texten. Versprechen Sie keine Heilung („beseitigt Rückenschmerzen“). Solche Aussagen sind für Gesundheitsberufe rechtlich heikel.

### Team-Mitglied hinzufügen

> **Bitte zuerst die Einwilligung einholen.** Namen und vor allem Fotos von Mitarbeitenden dürfen nur mit deren Einverständnis im Internet erscheinen. Lassen Sie sich die Einwilligung schriftlich geben und heben Sie sie auf. Sie kann jederzeit widerrufen werden; dann nehmen Sie den Eintrag wieder heraus.

1. Öffnen Sie **„Inhalte“ → „Team“**.
2. Klicken Sie unter **„Personen“** auf **„Person hinzufügen“**.
3. Füllen Sie aus:
   - **Name**
   - **Funktion**, zum Beispiel „Physiotherapeutin“. Mehrere Angaben trennen Sie mit einem Mittelpunkt: „Physiotherapeutin · Lymphdrainage“
   - **Foto** (freiwillig). Ohne Foto zeigt die Website automatisch die Initialen in einem Kreis.
   - **Kurzvorstellung** (freiwillig): ein bis zwei Sätze
   - **Qualifikationen** (freiwillig): eine Fortbildung pro Zeile, zum Beispiel „Manuelle Therapie“. Bitte nur abgeschlossene Fortbildungen nennen.
   - **Auf der Website zeigen**: eingeschaltet lassen
4. **„Speichern“** klicken.

**Fotos fürs Team:** möglichst quadratisch, Gesicht in der Mitte, mindestens 400 × 400 Pixel, ruhiger Hintergrund. Das Foto erscheint klein und rund.

**Ausblenden:** Mit „Auf der Website zeigen“ blenden Sie eine Person vorübergehend aus. Mit dem Schalter **„Team-Bereich anzeigen“** ganz oben blenden Sie den ganzen Team-Bereich aus. Die Stellenanzeige bleibt dabei sichtbar, solange sie unter „Stellenanzeige“ eingeschaltet ist.

**Wenn jemand die Praxis verlässt:** Eintrag entfernen und speichern. Ältere Versionen bleiben bei GitHub in der Versionsgeschichte gespeichert, und diese ist öffentlich einsehbar. Muss ein Foto oder Name vollständig verschwinden, sagen Sie bitte Ihrem technischen Ansprechpartner Bescheid.

### Foto austauschen

Fotos gibt es im Startbild, bei „Über uns“, bei jedem Leistungsbereich, in der Praxis-Galerie und bei „Kontakt & Anfahrt“.

**So wird das Foto gut:**

- **Querformat**, am besten im Seitenverhältnis 3 : 2 wie die bisherigen Fotos
- **mindestens 1600 Pixel breit**. Fotos direkt vom Smartphone sind gut geeignet.
- hell, scharf, aufgeräumt
- Personen nur mit deren Einwilligung, Patientinnen und Patienten am besten gar nicht

Um alles Technische müssen Sie sich nicht kümmern: Beim Hochladen wird das Foto automatisch auf eine passende Größe gebracht, der Dateiname wird bereinigt, und Kameradaten wie der Aufnahmeort werden entfernt. Beim Erstellen der Website entstehen daraus außerdem kleinere, schnelle Versionen für Smartphones.

**So tauschen Sie ein Foto aus:**

1. Öffnen Sie den passenden Bereich, zum Beispiel **„Startseite (Startbild, Über uns, Kontakt)“ → „Startbild & Begrüßung (ganz oben)“**.
2. Klicken Sie beim Foto-Feld (hier **„Startbild“**) auf „Ersetzen“. Ziehen Sie das neue Foto in das Fenster oder klicken Sie auf „Durchsuchen“. Sie können auch ein Foto auswählen, das schon hochgeladen ist.
3. Passen Sie die **Bildbeschreibung (Alternativtext)** an (siehe unten).
4. Leeren Sie das Feld **„Bildausschnitt (für Fortgeschrittene)“**. Es gehört zum alten Foto und legt fest, welcher Teil des Bildes zu sehen ist. Ohne Angabe zeigt die Website die Bildmitte.
5. **„Speichern“** klicken.

**Fotos löschen:** Unter **„Medien“** können Sie nicht mehr benötigte Fotos löschen. Löschen Sie ein Foto aber nur, wenn in seinen Medien-Infos bei **„Verwendet in“** nichts mehr steht. Wird ein gelöschtes Foto noch irgendwo auf der Website verwendet, schlägt die nächste Aktualisierung fehl (rotes X, siehe [Wenn etwas schiefgeht](#wenn-etwas-schiefgeht)). Laden Sie das Foto dann erneut hoch oder wählen Sie im betroffenen Feld ein anderes Foto.

**Gute Bildbeschreibungen:** Die Bildbeschreibung (der „Alternativtext“) sagt in einem Satz, was auf dem Foto zu sehen ist. Sie wird zum Beispiel blinden Menschen vorgelesen, und auch Google nutzt sie. Gut ist etwa: „Heller Behandlungsraum mit roter Therapieliege im Sonnenlicht“. Bitte nicht „Bild“ oder „Foto von …“ schreiben und keine Stichwortlisten.

### Öffnungszeiten ändern

1. Öffnen Sie **„Inhalte“ → „Praxisdaten & Öffnungszeiten“** und dort die **„Öffnungszeiten“**.
2. Jede Zeile hat **„Tage“** (zum Beispiel „Mo–Do“) und **„Uhrzeit“** (zum Beispiel „07:20–18:00“). Für Tage ohne Sprechzeiten schreiben Sie bei „Uhrzeit“ „geschlossen“ und schalten **„An diesen Tagen geschlossen“** ein. (Bleibt „Uhrzeit“ leer, gilt die Zeile ebenfalls als geschlossen.)
3. **„Speichern“** klicken.

Die Öffnungszeiten erscheinen automatisch an allen passenden Stellen: im Menü, bei „Kontakt & Anfahrt“, bei den häufigen Fragen und in der Fußzeile.

- **Tipp:** Kopieren Sie den Strich „–“ aus einer vorhandenen Zeile, dann sieht alles einheitlich aus.
- Entfernen Sie alle Zeilen, zeigt die Website stattdessen den **„Ersatztext ohne Öffnungszeiten“**, zurzeit „Termine nach telefonischer Vereinbarung“.
- Der Satz „Termine nach Vereinbarung“ steht an **vier Stellen**. Ändert sich, wie man bei Ihnen Termine bekommt, passen Sie bitte alle vier an:
  1. **„Praxisdaten & Öffnungszeiten“** → **„Hinweis unter den Öffnungszeiten“** (Menü und Fußzeile)
  2. **„Startseite (Startbild, Über uns, Kontakt)“** → **„Kontakt & Anfahrt“** → **„Einleitungstext“**
  3. ebenda → das Feld **Text „Termine“** (zurzeit „Nach Vereinbarung“)
  4. **„Häufige Fragen“** → die Frage **„Wann ist die Praxis geöffnet?“** → **„Antwort“**

### Urlaubs-Hinweis ein- und ausschalten

Für Betriebsferien, Feiertage oder kurzfristige Änderungen gibt es einen schmalen, dunkelblauen Hinweis-Streifen ganz oben auf jeder Seite.

**Einschalten:**

1. Öffnen Sie **„Inhalte“ → „Praxisdaten & Öffnungszeiten“** und dort **„Hinweis-Banner (z. B. Urlaub)“**.
2. Schreiben Sie bei **„Text des Hinweises“** zum Beispiel: „Vom 23.12. bis 02.01. ist unsere Praxis geschlossen. Ab dem 03.01. sind wir wieder für Sie da.“
3. Schalten Sie **„Banner anzeigen“** ein und klicken Sie auf **„Speichern“**.

**Ausschalten:** „Banner anzeigen“ ausschalten und **„Speichern“** klicken. Der Text bleibt gespeichert, für das nächste Mal.

**Tipp:** Tragen Sie sich gleich beim Einschalten eine Erinnerung zum Ausschalten in den Kalender ein.

### Google-Bewertung aktualisieren

Unter dem Startbild und bei „Kontakt & Anfahrt“ steht ein kleines Bewertungs-Abzeichen, zum Beispiel „4,9 bei über 120 Google-Bewertungen“.

1. Suchen Sie Ihre Praxis in Google Maps und lesen Sie den Sterne-Durchschnitt und die Anzahl der Bewertungen ab.
2. Öffnen Sie **„Inhalte“ → „Praxisdaten & Öffnungszeiten“** und dort **„Google-Bewertung“**.
3. Tragen Sie ein:
   - **„Sterne-Durchschnitt“** mit Komma, zum Beispiel „4,9“
   - **„Text neben den Sternen“**, zum Beispiel „bei über 150 Google-Bewertungen“. **Runden Sie die Anzahl immer ab** („über 150“ statt „157“). Dann stimmt die Angabe auch noch, wenn einmal eine Bewertung wegfällt. Das letzte Wort wird auf der Website automatisch als Link unterstrichen.
   - **„Stand“**, zum Beispiel „Januar 2027“
4. **„Speichern“** klicken.

Mit dem Schalter **„Bewertung anzeigen“** blenden Sie das Abzeichen aus. Bitte tragen Sie nur echte, aktuelle Werte ein. Geschönte Angaben sind wettbewerbsrechtlich unzulässig.

---

## Wenn etwas schiefgeht

**Ganz ruhig: Es geht nichts verloren.** Jedes Speichern legt bei GitHub eine neue Version an, mit Datum und dem Namen der Person, die gespeichert hat.

- **Ein Tippfehler oder ein falscher Text ist online?** Korrigieren Sie ihn einfach und speichern Sie erneut. Das ist meist der schnellste Weg.
- **Sie möchten sehen, was vorher dort stand?** Öffnen Sie <https://github.com/Frederik-Witte/physiotherapie-kemper/commits/main>. Jede Zeile ist ein Speichervorgang. Klicken Sie darauf, sehen Sie die Änderung: Rot ist der alte Stand, Grün der neue. Den alten Text können Sie dort kopieren und wieder eintragen.
- **Eine Änderung soll komplett zurückgenommen werden?** Ihr technischer Ansprechpartner kann jeden früheren Stand mit wenigen Klicks wiederherstellen. Nennen Sie ihm einfach ungefähr Datum und Uhrzeit.
- **Die Änderung ist nach 5 Minuten noch nicht online?** Öffnen Sie <https://github.com/Frederik-Witte/physiotherapie-kemper/actions>. Ein **grüner Haken** heißt: Die Website ist aktuell. Ein **gelber Kreis** heißt: Die Website wird gerade erstellt. Ein **rotes X** heißt: Die Aktualisierung hat nicht geklappt. Für Ihre Besucherinnen und Besucher bleibt dann einfach die vorherige Fassung der Website online. Meist hilft es, die letzte Änderung zu überprüfen. Haben Sie kurz vorher unter „Medien“ ein Foto gelöscht, wird es wahrscheinlich noch verwendet: Laden Sie es erneut hoch oder wählen Sie im betroffenen Feld ein anderes Foto und speichern Sie. Sonst melden Sie sich bei Ihrem technischen Ansprechpartner.
- **Die Anmeldung klappt nicht mehr?** Wahrscheinlich ist Ihr Zugriffstoken abgelaufen. Erstellen Sie ein neues (siehe [Schritt 3](#schritt-3-zugriffstoken-erstellen)) und melden Sie sich damit an.

---

## Vor dem Livegang: Checkliste

Die Website ist im Moment eine **Vorschau**. Sie ist für Google unsichtbar und ersetzt noch nicht Ihre bisherige Website physiotherapie-kemper.de. Bevor sie das tut, gehen Sie bitte diese Punkte durch:

- [ ] **Öffnungszeiten bestätigen.** Die eingetragenen Zeiten (Mo–Do 07:20–18:00, Fr 07:20–16:00) stammen aus öffentlichen Verzeichnissen. Bitte prüfen und bei Bedarf korrigieren.
- [ ] **Team und Einwilligungen.** Stimmen Namen und Funktionen der drei Inhaber? Liegen für alle gezeigten Personen die Einwilligungen für Namen und Fotos vor?
- [ ] **Osteopathie-Formulierung prüfen.** Osteopathie gilt in Deutschland rechtlich als Heilkunde. Bitte klären Sie, zum Beispiel mit Ihrem Berufsverband, ob die Erklärung der Leistung und die Funktion „Osteopath“ in dieser Form verwendet werden dürfen. Zusätze wie „D.O.“ oder „Heilpraktiker“ bitte nur, wenn sie tatsächlich zutreffen.
- [ ] **Impressum vervollständigen.** Prüfen Sie das Feld **„Herausgeber“** (eine Angabe pro Zeile). Außerdem fehlen noch Pflichtangaben: alle vertretungsberechtigten Gesellschafter der GbR, die Berufsbezeichnung und der Staat, in dem sie verliehen wurde, die berufsrechtlichen Regelungen, die zuständige Aufsichtsbehörde und gegebenenfalls die Umsatzsteuer-Identifikationsnummer. Danach schalten Sie unter „Impressum & Datenschutz“ → „Impressum“ → „Hinweiskasten“ den Schalter **„Hinweiskasten anzeigen“** aus.
- [ ] **Datenschutzerklärung vervollständigen.** Die jetzige Fassung ist eine Kurzform. Ergänzt werden müssen unter anderem der Hosting-Anbieter (GitHub), die Rechtsgrundlagen, die Speicherdauer, die Rechte der Betroffenen und das Beschwerderecht. Lassen Sie den Text am besten fachkundig prüfen. Danach auch hier unter „Datenschutz“ → „Hinweiskasten“ den Schalter **„Hinweiskasten anzeigen“** ausschalten.
- [ ] **Vorschau-Hinweis in der Fußzeile entfernen.** Ganz unten auf jeder Seite steht noch „Designentwurf · Vorschau der neuen Website“. Öffnen Sie **„Menü & Fußzeile“** → **„Fußzeile“**, leeren Sie das Feld **„Kleine Zeile ganz unten“** und klicken Sie auf **„Speichern“**. Ist das Feld leer, verschwindet die Zeile.
- [ ] **Eigene Domain mit HTTPS.** Ihre Adresse physiotherapie-kemper.de wird auf die neue Website umgestellt, mit sicherer Verbindung (HTTPS). Das übernimmt Ihr technischer Ansprechpartner.
- [ ] **„noindex“ entfernen.** Damit die Vorschau nicht bei Google erscheint, ist sie im Moment für Suchmaschinen gesperrt. Zum Livegang wird diese Sperre aufgehoben, damit Ihre neue Website gefunden wird. Auch das übernimmt Ihr technischer Ansprechpartner.

---

Viel Freude mit Ihrer neuen Website! Wenn Sie bei einem Schritt unsicher sind, fragen Sie lieber einmal mehr nach. Und denken Sie daran: Jede Änderung ist gesichert und lässt sich rückgängig machen.
