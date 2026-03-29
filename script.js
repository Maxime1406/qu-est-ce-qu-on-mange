// --- LES STOCKS XXL ---
const proteines = [
    "Steak haché", "Pavé de saumon", "Filet de poulet", "Saucisses", "Filet de lieu", 
    "Côte de porc", "Jambon blanc", "Omelette", "Boulettes de bœuf", "Cordon bleu", 
    "Magret de canard", "Escalope de veau", "Crevettes", "Œufs au plat", "Thon en boîte", 
    "Aiguillettes de canard", "Poisson pané", "Nuggets maison", "Tranche de gigot", 
    "Pavé de cabillaud", "Bacon grillé", "Dés de jambon cru",
    "Boudin noir", "Aile de raie", "Brochettes de dinde", "Filet mignon"
];

const feculents = [
    "Pâtes", "Riz blanc", "Pommes de terre sautées", "Purée maison", "Lentilles", 
    "Coquillettes", "Semoule", "Frites", "Quinoa", "Petits pois", "Blé (Ebly)", 
    "Gratin dauphinois", "Riz pilaf", "Gnocchis", "Polenta", "Boulgour", "Pommes de terre à l'eau",
    "Penne au beurre", "Tagliatelles", "Purée de patate douce", "Haricots blancs", "Riz cantonais"
];

const legumes = [
    "Haricots verts", "Épinards", "Ratatouille", "Salade verte", "Carottes", 
    "Chou-fleur", "Brocolis", "Poivrons sautés", "Courgettes", "Fondue de poireaux", 
    "Petits légumes vapeur", "Tomates provençales", "Champignons de Paris", 
    "Purée de potiron", "Aubergines grillées", "Salade de tomates", "Poêlée paysanne",
    "Asperges", "Céleri branche", "Choux de Bruxelles", "Endives braisées"
];

const platsMijotes = [
    "Blanquette de veau", "Bœuf Bourguignon", "Lasagnes maison", "Hachis Parmentier",
    "Couscous", "Paëlla", "Tartiflette", "Pot-au-feu", "Cassoulet", "Moussaka", 
    "Chili con carne", "Cannellonis", "Gratin de pâtes", "Poulet Basquaise", 
    "Osso Buco", "Carbonnade flamande", "Risotto aux champignons", "Petit salé aux lentilles",
    "Veau Marengo", "Quiche aux poireaux", "Endives au jambon", "Petit salé aux lentilles",
    "Rougail saucisse", "Navarin d'agneau", "Tajine de poulet"
];

function genererMenu() {
    const zone = document.getElementById('resultat');
    let selectionActuelle = [];
    
    // On prépare la grille
    let htmlFinal = '<div class="grid-container">';

    for (let i = 0; i < 12; i++) {
        let nomPlat = "";
        let type = "";
        let couleur = "";
        let tentative = 0;

        do {
            // Environ 30% de plats "complets" (Mijotés)
            if (i % 3 === 0) {
                nomPlat = platsMijotes[Math.floor(Math.random() * platsMijotes.length)];
                type = "Mijoté";
                couleur = "#2980b9";
            } else {
                // Assemblage de 3 éléments indépendants
                const p = proteines[Math.floor(Math.random() * proteines.length)];
                const f = feculents[Math.floor(Math.random() * feculents.length)];
                const l = legumes[Math.floor(Math.random() * legumes.length)];
                nomPlat = `${p} + ${f} + ${l}`;
                type = "Rapide";
                couleur = "#27ae60";
            }
            tentative++;
        // Évite les doublons sur la même page
        } while (selectionActuelle.includes(nomPlat) && tentative < 100);

        selectionActuelle.push(nomPlat);

        const lienGoogle = `https://www.google.com/search?q=recette+facile+${encodeURIComponent(nomPlat)}`;
        
        htmlFinal += `
            <div class="card-idee">
                <span class="badge" style="background: ${couleur};"> ${type} </span>
                <h3 style="margin-top: 25px;">${nomPlat}</h3>
                <a href="${lienGoogle}" target="_blank" class="btn-google" style="color: ${couleur}; border-color: ${couleur};">Idée recette</a>
            </div>`;
    }
    
    htmlFinal += '</div>';
    zone.innerHTML = htmlFinal;
}

document.getElementById('btn-generer').addEventListener('click', genererMenu);
