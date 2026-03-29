// --- LES PROTEINES (35 options) ---
const proteines = [
    "Steak haché", "Pavé de saumon", "Filet de poulet", "Saucisses", "Filet de lieu", 
    "Côte de porc", "Jambon blanc", "Omelette", "Boulettes de bœuf", "Cordon bleu", 
    "Magret de canard", "Escalope de veau", "Crevettes", "Œufs au plat", "Thon en boîte", 
    "Aiguillettes de canard", "Poisson pané", "Nuggets maison", "Tranche de gigot", 
    "Pavé de cabillaud", "Sardines à l'huile", "Bacon grillé", "Dés de jambon cru",
    "Boudin noir", "Aile de raie", "Brochettes de dinde", "Filet mignon", "Pavé de thon",
    "Foie de veau", "Saucisse de Morteau", "Quenelles de brochet", "Escalope de dinde",
    "Colin d'Alaska", "Cuisses de poulet", "Rôti de porc froid"
];

// --- LES FECULENTS (30 options) ---
const feculents = [
    "Pâtes", "Riz blanc", "Pommes de terre sautées", "Purée maison", "Lentilles", 
    "Coquillettes", "Semoule", "Frites", "Quinoa", "Petits pois", "Blé (Ebly)", 
    "Gratin dauphinois", "Riz pilaf", "Gnocchis", "Polenta", "Boulgour", "Pommes de terre à l'eau",
    "Penne au beurre", "Tagliatelles", "Purée de patate douce", "Haricots blancs", "Riz cantonais",
    "Croquettes de P.D.T", "Tagliatelles fraîches", "Risotto nature", "Millet", "Pâtes complètes",
    "Tortellini", "Pomme au four", "Riz sauvage"
];

// --- LES LEGUMES (35 options) ---
const legumes = [
    "Haricots verts", "Épinards", "Ratatouille", "Salade verte", "Carottes", 
    "Chou-fleur", "Brocolis", "Poivrons sautés", "Courgettes", "Fondue de poireaux", 
    "Petits légumes vapeur", "Tomates provençales", "Champignons de Paris", 
    "Purée de potiron", "Aubergines grillées", "Salade de tomates", "Poêlée paysanne",
    "Asperges", "Céleri branche", "Choux de Bruxelles", "Endives braisées", "Chou rouge",
    "Betteraves", "Purée de panais", "Fenouil sauté", "Pois gourmands", "Haricots plats",
    "Chou kale", "Poêlée de champignons", "Artichaut", "Radis", "Salade de concombre",
    "Épinards frais", "Mélange de légumes oubliés", "Velouté de légumes"
];

const platsMijotes = [
    "Blanquette de veau", "Bœuf Bourguignon", "Lasagnes maison", "Hachis Parmentier",
    "Couscous", "Paëlla", "Tartiflette", "Pot-au-feu", "Cassoulet", "Moussaka", 
    "Chili con carne", "Cannellonis", "Gratin de pâtes", "Poulet Basquaise", 
    "Osso Buco", "Carbonnade flamande", "Risotto aux champignons", "Petit salé aux lentilles",
    "Veau Marengo", "Quiche aux poireaux", "Endives au jambon", "Rougail saucisse", 
    "Navarin d'agneau", "Tajine de poulet", "Choucroute", "Pieds de porc", 
    "Lapin à la moutarde", "Axoa de veau", "Gratin de chou-fleur", "Potée auvergnate"
];

// Fonction pour vérifier si deux aliments sont compatibles
function estCompatible(item1, item2) {
    const motsInterdits = ["purée", "pomme de terre", "p.d.t", "riz", "chou", "pâtes"];
    
    for (let mot of motsInterdits) {
        if (item1.toLowerCase().includes(mot) && item2.toLowerCase().includes(mot)) {
            return false; // Trop similaire (ex: deux purées)
        }
    }
    return true;
}

function genererMenu() {
    const zone = document.getElementById('resultat');
    let selectionActuelle = [];
    let htmlFinal = '<div class="grid-container">';

    for (let i = 0; i < 12; i++) {
        let nomPlat = "";
        let type = "";
        let couleur = "";
        let tentative = 0;

        do {
            if (i % 3 === 0) {
                nomPlat = platsMijotes[Math.floor(Math.random() * platsMijotes.length)];
                type = "Mijoté";
                couleur = "#2980b9";
            } else {
                const p = proteines[Math.floor(Math.random() * proteines.length)];
                const f = feculents[Math.floor(Math.random() * feculents.length)];
                const l = legumes[Math.floor(Math.random() * legumes.length)];

                // On vérifie que le féculent et le légume ne sont pas trop proches
                if (estCompatible(f, l)) {
                    nomPlat = `${p} + ${f} + ${l}`;
                    type = "Rapide";
                    couleur = "#27ae60";
                } else {
                    nomPlat = "";
                }
            }
            tentative++;
        } while ((nomPlat === "" || selectionActuelle.includes(nomPlat)) && tentative < 100);

        if (nomPlat !== "") {
            selectionActuelle.push(nomPlat);
            const lienGoogle = `https://www.google.com/search?q=recette+facile+${encodeURIComponent(nomPlat)}`;
            htmlFinal += `
                <div class="card-idee">
                    <span class="badge" style="background: ${couleur};"> ${type} </span>
                    <h3 style="margin-top: 25px;">${nomPlat}</h3>
                    <a href="${lienGoogle}" target="_blank" class="btn-google" style="color: ${couleur}; border-color: ${couleur};">Idée recette</a>
                </div>`;
        }
    }
    
    zone.innerHTML = htmlFinal + '</div>';
}

document.getElementById('btn-generer').addEventListener('click', genererMenu);
