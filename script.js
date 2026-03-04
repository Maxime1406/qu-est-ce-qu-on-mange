const platsRapides = [
    "Steak haché et Pâtes au beurre", "Poulet rôti et Pommes de terre sautées",
    "Filet de lieu noir et Riz blanc", "Omelette aux champignons",
    "Côtes de porc et Lentilles", "Spaghetti Bolognaise",
    "Jambon blanc et Purée maison", "Saucisses et Purée de pois cassés",
    "Escalope de dinde à la crème", "Croque-monsieur et Salade",
    "Pâtes à la Carbonara", "Salade composée (Thon, Maïs, Œufs)",
    "Poisson pané et Épinards", "Steak frites et Salade",
    "Quiche Lorraine", "Hachis Parmentier express",
    "Saucisse de Morteau et Pommes vapeur", "Omelette au fromage",
    "Pavé de saumon et Haricots verts", "Œufs au plat et Ratatouille",
    "Boulettes de bœuf et Coquillettes", "Galettes complète (Jambon, Œuf)",
    "Pâtes au pesto", "Salade Niçoise", "Cordon bleu et Coquillettes"
];

const platsLongs = [
    "Blanquette de veau et Riz pilaf", "Bœuf Bourguignon",
    "Gratin Dauphinois et Rôti de porc", "Lasagnes maison",
    "Pot-au-feu traditionnel", "Petit salé aux lentilles",
    "Tomates farcies et Riz", "Ratatouille maison",
    "Choucroute garnie", "Navarin d'agneau",
    "Endives au jambon et Béchamel", "Gratin de chou-fleur au jambon",
    "Poulet basquaise", "Moussaka", "Carbonnade Flamande",
    "Osso Buco et Tagliatelles", "Magret de canard et Gratin",
    "Parmentier de canard", "Coq au vin", "Veau Marengo",
    "Lapin à la moutarde", "Brandade de morue", "Cassoulet",
    "Tartiflette", "Confit de canard", "Bouchées à la reine",
    "Soupe à l'oignon gratinée", "Paëlla maison", "Couscous royal"
];

function genererMenu() {
    const zone = document.getElementById('resultat');
    const tousLesPlats = [
        ...platsRapides.map(p => ({ nom: p, type: 'Rapide', couleur: '#27ae60', icone: '⚡' })),
        ...platsLongs.map(p => ({ nom: p, type: 'Mijoté', couleur: '#2980b9', icone: '🥘' }))
    ];
    
    const melange = tousLesPlats.sort(() => Math.random() - 0.5);
    const selection = melange.slice(0, 12);

    let htmlFinal = '<div class="grid-container">';

    selection.forEach(plat => {
        const lienGoogle = `https://www.google.com/search?q=recette+facile+${encodeURIComponent(plat.nom)}`;
        
        htmlFinal += `
            <div class="card-idee">
                <span class="badge" style="background: ${plat.couleur};">
                    ${plat.icone} ${plat.type}
                </span>
                <h3>${plat.nom}</h3>
                <a href="${lienGoogle}" target="_blank" class="btn-google" style="color: ${plat.couleur}; border-color: ${plat.couleur};">
                    Recette Google
                </a>
            </div>
        `;
    });
    
    zone.innerHTML = htmlFinal + '</div>';
}

document.getElementById('btn-generer').addEventListener('click', genererMenu);