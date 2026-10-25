// Team page: only built while the team is switched on and at least one person is visible
// (team.yml → anzeigen, inhaber, mitglieder). `abschnitte` comes from _data/eleventyComputed.js.
export default {
  eleventyComputed: {
    permalink: (data) => (data.abschnitte?.teamseite ? "team.html" : false),
  },
};
