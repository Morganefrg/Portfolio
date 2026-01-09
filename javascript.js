/* =========================================================
   COMPÉTENCES DYNAMIQUES
   Objectif :
   1) Mettre les données (skills) en JavaScript
   2) Les afficher dans le HTML dans <ul id="skillsList">
   3) Filtrer par catégorie via <select id="skillFilter">
   4) Gérer un état simple : activeCategory
========================================================= */

/* 1) DONNÉES : liste de compétences (pas dans le HTML)
   Chaque compétence est un objet avec :
   - name : le nom (Python, JS...)
   - category : pour filtrer (Langage, Web, Outil, IA)
   - detail : description qui s’affiche à côté
*/
const skills = [
  { name: "Python", category: "Langage", detail: "Automatisation, logique algorithmique, projets orientés données et IA" },
  { name: "JavaScript", category: "Langage", detail: "Logique de programmation et manipulation de données simples" },
  { name: "HTML / CSS", category: "Web", detail: "Structure et mise en forme de pages web" },
  { name: "Git / GitHub", category: "Outil", detail: "Versioning, suivi de projet et travail collaboratif" },
  { name: "ChatGPT", category: "IA", detail: "Support de compréhension, recherche et aide au prototypage" }
];

/* 2) ÉTAT : on stocke le filtre actif
   - "all" = on affiche tout
   - sinon on affiche seulement la catégorie choisie
*/
let activeCategory = "all";

/* 3) RÉCUPÉRATION DES ÉLÉMENTS HTML (DOM)
   On “attrape” les éléments pour pouvoir les modifier en JS
*/
const skillsListEl = document.getElementById("skillsList");
const skillFilterEl = document.getElementById("skillFilter");
const skillStatusEl = document.getElementById("skillStatus");

/* 4) FONCTION D'AFFICHAGE : transforme les données -> HTML
   - list = la liste de compétences à afficher (toutes ou filtrées)
*/
function renderSkills(list) {
  // On vide l'affichage avant de réécrire (évite les doublons)
  skillsListEl.innerHTML = "";

  // Si la liste est vide, on affiche un message
  if (list.length === 0) {
    skillsListEl.innerHTML = "<li>Aucune compétence ne correspond à ce filtre.</li>";
    return;
  }

  // Pour chaque compétence, on crée un <li> et on l'ajoute à la liste
  list.forEach((skill) => {
    const li = document.createElement("li");

    // On crée le contenu HTML du <li> (avec <strong> pour le mot-clé)
    li.innerHTML = `<strong>${skill.name}</strong> – ${skill.detail}`;

    // On ajoute le <li> dans le <ul>
    skillsListEl.appendChild(li);
  });
}

/* 5) FONCTION FILTRE : applique l’état (activeCategory)
   et décide quelles compétences afficher
*/
function applySkillsFilter() {
  let filteredSkills = skills; // par défaut : tout

  // Si un filtre est actif (autre que "all"), on filtre
  if (activeCategory !== "all") {
    filteredSkills = skills.filter((skill) => skill.category === activeCategory);
  }

  // On met à jour le texte qui montre l'état
  skillStatusEl.textContent =
    activeCategory === "all"
      ? "Filtre actif : Toutes"
      : `Filtre actif : ${activeCategory}`;

  // On affiche les compétences filtrées
  renderSkills(filteredSkills);
}

/* 6) INITIALISATION : au chargement de la page
   - on met le select sur la valeur de l'état
   - on affiche la liste une première fois
*/
if (skillFilterEl && skillsListEl && skillStatusEl) {
  skillFilterEl.value = activeCategory;
  applySkillsFilter();

  /* 7) INTERACTION UTILISATEUR :
     quand l'utilisateur change le <select>,
     on met à jour l'état puis on ré-affiche
  */
  skillFilterEl.addEventListener("change", () => {
    activeCategory = skillFilterEl.value; // <-- mise à jour de l'état
    applySkillsFilter();                  // <-- recalcul + réaffichage
  });
}


// ===== FORMULAIRE DE CONTACT =====

// On récupère le formulaire
const contactForm = document.getElementById("contactForm");
const contactFeedback = document.getElementById("contactFeedback");

// Petite fonction pour vérifier l'email
function emailValide(email) {
  return email.includes("@") && email.includes(".");
}

// On écoute le clic sur "Envoyer"
contactForm.addEventListener("submit", function (event) {
  event.preventDefault(); // empêche le rechargement de la page

  // On lit ce que l'utilisateur a écrit
  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const message = document.getElementById("contactMessage").value;

  // On stocke temporairement les données
  const contactData = {
    name: name,
    email: email,
    message: message
  };

  // Vérifications simples
  if (name === "" || email === "" || message === "") {
    contactFeedback.textContent = "❌ Merci de remplir tous les champs.";
    return;
  }

  if (!emailValide(email)) {
    contactFeedback.textContent = "❌ Email invalide.";
    return;
  }

  // Si tout est OK
  contactFeedback.textContent = "✅ Message envoyé (simulation). Merci !";

  console.log(contactData); // pour montrer le stockage JS

  // On vide le formulaire
  contactForm.reset();
});
