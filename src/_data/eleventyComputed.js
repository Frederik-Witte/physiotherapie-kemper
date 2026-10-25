// Derived values shared by all templates: which sections are visible and the matching navigation.
const sichtbar = (liste) => (Array.isArray(liste) ? liste : []).filter((eintrag) => eintrag && eintrag.sichtbar !== false);
const liste = (wert) => (Array.isArray(wert) ? wert : []);

function abschnitte(data) {
  const teamMitglieder = sichtbar(data.team?.mitglieder);
  return {
    willkommen: Boolean(data.startseite?.willkommen),
    team: Boolean(data.team?.anzeigen) && teamMitglieder.length > 0,
    karriere: Boolean(data.karriere?.anzeigen),
    leistungen: liste(data.leistungen?.gruppen).length > 0,
    praxis: liste(data.galerie?.bilder).filter((bild) => bild && bild.bild).length > 0,
    ablauf: liste(data.ablauf?.schritte).length > 0,
    fragen: liste(data.faq?.fragen).length > 0,
    kontakt: true,
  };
}

export default {
  teamMitglieder: (data) => sichtbar(data.team?.mitglieder),
  abschnitte: (data) => abschnitte(data),
  hauptmenue: (data) => {
    const sichtbareAbschnitte = abschnitte(data);
    return liste(data.navigation?.hauptmenue).filter((link) => sichtbareAbschnitte[link.ziel] !== false);
  },
  fusslinks: (data) => {
    const sichtbareAbschnitte = abschnitte(data);
    return liste(data.navigation?.fusszeile?.links).filter((link) => sichtbareAbschnitte[link.ziel] !== false);
  },
};
