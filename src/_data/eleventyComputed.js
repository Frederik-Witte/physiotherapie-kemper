// Derived values shared by all templates: which sections are visible, the team grouped for the
// team page, and the navigation with ready-made links for the current page.
// Only a default export here: Eleventy would turn named exports into extra data keys.
const liste = (wert) => (Array.isArray(wert) ? wert : []);
const sichtbar = (eintraege) => liste(eintraege).filter((eintrag) => eintrag && eintrag.sichtbar !== false);
// People: visible and with a name (an empty list entry from the CMS is skipped)
const personen = (eintraege) => sichtbar(eintraege).filter((person) => String(person.name ?? "").trim());

// Team page groups in this order (the options of "bereich" in the CMS). Unknown values from a
// hand-edited YAML file follow as their own group; an empty value counts as the first group.
const BEREICHE = ["Therapie", "Empfang & Verwaltung"];

function teamGruppen(mitglieder) {
  const gruppen = new Map(BEREICHE.map((titel) => [titel, []]));
  for (const person of mitglieder) {
    const titel = String(person.bereich ?? "").trim() || BEREICHE[0];
    if (!gruppen.has(titel)) gruppen.set(titel, []);
    gruppen.get(titel).push(person);
  }
  return [...gruppen].filter(([, leute]) => leute.length).map(([titel, leute]) => ({ titel, personen: leute }));
}

// Is the team page built at all? (team switched on and at least one visible person)
function teamSeiteSichtbar(data) {
  return Boolean(data.team?.anzeigen) && personen(data.team?.inhaber).length + personen(data.team?.mitglieder).length > 0;
}

function abschnitte(data) {
  return {
    willkommen: Boolean(data.startseite?.willkommen),
    // Homepage section "Die Inhaber"
    team: Boolean(data.team?.anzeigen) && personen(data.team?.inhaber).length > 0,
    // Own page /team.html
    teamseite: teamSeiteSichtbar(data),
    karriere: Boolean(data.karriere?.anzeigen),
    leistungen: liste(data.leistungen?.gruppen).length > 0,
    praxis: liste(data.galerie?.bilder).filter((bild) => bild && bild.bild).length > 0,
    ablauf: liste(data.ablauf?.schritte).length > 0,
    fragen: liste(data.faq?.fragen).length > 0,
    kontakt: true,
  };
}

// Navigation entries with their link for the current page: on the homepage "#leistungen",
// elsewhere "/#leistungen"; "teamseite" always links to /team.html. `aktiv` marks the current
// page, `spy` names the homepage section that highlights the entry while it is on screen.
function links(eintraege, data) {
  const sichtbareAbschnitte = abschnitte(data);
  const start = data.seite === "start";
  return liste(eintraege)
    .filter((link) => link && link.ziel && sichtbareAbschnitte[link.ziel] !== false)
    .map((link) => {
      const teamseite = link.ziel === "teamseite";
      return {
        ...link,
        href: teamseite ? "/team.html" : `${start ? "" : "/"}#${link.ziel}`,
        aktiv: teamseite && data.seite === "team",
        spy: start ? (teamseite ? (sichtbareAbschnitte.team ? "team" : "") : link.ziel) : "",
      };
    });
}

export default {
  teamInhaber: (data) => personen(data.team?.inhaber),
  teamMitglieder: (data) => personen(data.team?.mitglieder),
  teamGruppen: (data) => teamGruppen(personen(data.team?.mitglieder)),
  abschnitte: (data) => abschnitte(data),
  hauptmenue: (data) => links(data.navigation?.hauptmenue, data),
  fusslinks: (data) => links(data.navigation?.fusszeile?.links, data),
};
