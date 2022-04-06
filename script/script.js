// liste des images séléctionner pour le jeux
// en fonction de la variable série et mis a jour par la fontion
// position_card
let list_img_deck = [];
// Liste des cartes déjà retourné
let List_card_returned = [];
// img1_selected et img2_selected contiennent les 2 images
// retourné a comparer
let img1_selected = "";
let img2_selected = "";
// nombre de cartes retournés a chaque paires identique
let card_OK = 0;
// temps avant retournement des cartes  a chaque paires
// non  identique
let timeout = 400;
//defini si le jeux est démarr"
let game_started = false;
//temps du compteur
let counter = 180;
//objet compteur
let timer;
// non de la serie d'image
// permet de pointer sur un sous-repertoire en fonction
// de la série choisi
// par defaut "starwars au demarrage de la page"
let serie = "starwars";

function removelisten() {
  for (let pas = 0; pas < 36; pas++) {
    let img = document.getElementById(pas);

    img.removeEventListener("click", onclickimage);
  }
}
//#########################################
// _summary_: start_game
// Démarre ou arrete le jeux
//#########################################
function start_game() {
  //Démarre ou arrete le jeux
  if (game_started) {
    end_game();
    return;
  }
  // set toutes les cartes avec l'image M.jpg
  var img;
  for (let pas = 0; pas < 36; pas++) {
    img = document.getElementById(pas);
    img.src = "images/M.jpg";
    document.getElementById(img.id).className = "mon_image";
  }
  // reinitialisation des variables au demarrage du jeux
  list_img_deck = [];
  img1_selected = "";
  img2_selected = "";
  List_card_returned = [];
  card_OK = 0;
  //definie la liste des images associé a chaque cartes
  position_card();
  //on modifier la couleur du "buttonstart" et son texte
  //pour dire que le a demarré
  document.getElementById("buttonstart").className = "button_selected";
  document.getElementById("buttonstart").value = "Jeux en cours";
  position_card();
  //demarre le compteur de temps
  let cpt = counter;
  timer = setInterval(function () {
    --cpt;
    var c = document.getElementById("timercounter");
    c.innerText = cpt + " secondes restantes";
    if (cpt == 0) {
      alert("Vous avez Perdu");
      end_game();
    }
  }, 1000);

  // $("#0")
  //   .animate({ left: "+=2000px" }, 1000)
  //   .animate({ top: "+=50px" }, 400)
  //   .animate({ left: "-=200px" }, 1000)
  //   .animate({ top: "-=50px" }, 400);
  //indique que le jeux est demarré
  game_started = true;

  //setTimeout(() => removelisten(), 5000);
}

//######################################################
// _summary_: set_serie
// appelé par le click pour html
// set la couleur du bouton clicker et la variable serie
//######################################################
function set_serie(ser) {
  if (game_started) {
    return;
  }
  serie = ser;
  document.getElementById("animaux").className = "button_grey";
  document.getElementById("starwars").className = "button_grey";
  document.getElementById("harrypotter").className = "button_grey";
  document.getElementById("poulpy").className = "button_grey";
  var btn = document.getElementById(serie);
  btn.className = "button_selected";
}

//######################################################
// _summary_: end_game
// réintilisation de l'IHM
// et des variables
//######################################################
function end_game() {
  document.getElementById("buttonstart").value = "Démarrer le jeux";
  document.getElementById("animaux").className = "button_grey";
  document.getElementById("starwars").className = "button_grey";
  document.getElementById("harrypotter").className = "button_grey";
  document.getElementById("poulpy").className = "button_grey";
  var btn = document.getElementById(serie);
  btn.className = "button_selected";

  list_img_deck = [];
  img1_selected = "";
  img2_selected = "";
  card_OK = 0;
  clearInterval(timer);
  var c = document.getElementById("timercounter");
  c.innerText = counter + " secondes";
  game_started = false;
}

//######################################################
// _summary_: insert
// création des cartes en fonction de la ligne "lineid"
// le pas (id de l'image) est defini en f imgstart
// et de la boucle
//######################################################
function insert(lineid, imgstart) {
  for (let pas = imgstart; pas < imgstart + 6; pas++) {
    var src = document.getElementById(lineid);
    var img = document.createElement("img");
    img.setAttribute("class", "mon_image");
    img.setAttribute("id", pas);
    img.src = "images/M.jpg";
    img.alt = "img" + pas;
    src.appendChild(img);
  }
}

//######################################################
// _summary_: Bind_On_Click
// association evenement click sur une image a
// la fonction "clickimage"
//######################################################
function Bind_On_Click() {
  console.log("bind");
  for (let pas = 0; pas < 36; pas++) {
    var imgcreated = document.getElementById(pas);
    imgcreated.addEventListener("click", onclickimage);
  }
}

function returnall() {
  for (let pas = 0; pas < 36; pas++) {
    img = document.getElementById(pas);
    img.src = "images/" + serie + "/" + list_img_deck[pas] + ".jpg";
  }
}

//######################################################
// _summary_: onclickimage
// recupere carte(image M) selectionnée et affiche
// l'image
// et l'envoie a la fonction check_card
//######################################################
function onclickimage(e) {
  console.log($("#test").attr("style"));
  console.log($("#test").prop("style"));
  console.log($("#test").prop("style")["font-size"]);
  console.log($("#test").prop("class"));
  console.log($("#test").attr("class"));

  if (game_started) {
    var img = e.target;
    if (List_card_returned.includes(img.id)) {
      return;
    }
    $("#" + img.id).fadeOut(200);
    img.src = "images/" + serie + "/" + list_img_deck[img.id] + ".jpg";
    $("#" + img.id).fadeIn(200);
    //$("#" + img.id).animate({ height: "80", width: "80px" });
    check_card(img);
  }
}

//######################################################
// _summary_: check_card
// compare les 2 cartes Sélectionnées
//######################################################
function check_card(img) {
  //check si la première carte a été sélectionnée
  if (img1_selected == "") {
    img1_selected = img;
    return;
  }
  //check si on a clicker sur la meme image que la premiere
  if (img1_selected.id != img.id) {
    img2_selected = img;
  } else {
    return;
  }
  //compraison des 2 carte sélectionnée
  if (img1_selected.src != img2_selected.src) {
    var i1 = img1_selected;
    var i2 = img2_selected;
    img1_selected = "";
    img2_selected = "";
    // lance le retournement de carte en cas de paire non identique
    //apres un temps déterminé par "timeout"
    setTimeout(function () {
      setimage_default(i1, i2);
    }, timeout);
    return;
  } else {
    //ajoute les paires bonnea ma liste de carte ok
    List_card_returned.push(img1_selected.id);
    card_OK += 2;
    console.log("yessss");
    $("#" + img1_selected.id).animate({ height: "60px", width: "60px" });
    $("#" + img2_selected.id).animate({ height: "60px", width: "60px" });
    img1_selected = "";
    img2_selected = "";
  }
  //check si les toutes cartes on été retournées
  if (card_OK == 36) {
    alert("Vous avez Gagné");
    end_game();
  }
}

// set les images retournées a l'image par defaut
// cas paire non identique
function setimage_default(img1, img2) {
  //document.getElementById(img1.id).style.transform = "rotateY(-180deg)";
  img1.src = "images/M.jpg";
  //$("#" + img1.id).animate({ height: "80px", width: "80px" });
  //document.getElementById(img2.id).style.transform = "rotateY(-180deg)";
  img2.src = "images/M.jpg";
  //$("#" + img2.id).animate({ height: "80px", width: "80px" });
}

// choix des carte en fonction de la serie
//cas paire non identique
function position_card() {
  var list_position = [];
  var list_img = [];
  var indexremove;
  var pos1;
  var pos2;
  var img;
  //liste des position images
  for (let pas = 0; pas < 36; pas++) {
    list_position.push(pas);
  }

  //list des images
  for (let pas = 0; pas < 18; pas++) {
    list_img.push(pas);
  }

  //a chaque choix d'un image
  //on affecte une image par son id
  //le choix des images et positions est fait des les liste par hazard
  for (let pas = 0; pas < 18; pas += 1) {
    img = list_img[Math.floor(Math.random() * list_img.length)];
    pos1 = list_position[Math.floor(Math.random() * list_position.length)];

    //dès qu'une image est choisi on la retire
    //de la liste des possibilités
    indexremove = list_img.indexOf(img);
    list_img.splice(indexremove, 1);

    //dès qu'une position est choisi on la retire
    // de la liste des possibilités
    indexremove = list_position.indexOf(pos1);
    list_position.splice(indexremove, 1);

    pos2 = list_position[Math.floor(Math.random() * list_position.length)];
    indexremove = list_position.indexOf(pos2);
    list_position.splice(indexremove, 1);

    //afectation de l'image dans la liste
    list_img_deck[pos1] = img;
    list_img_deck[pos2] = img;
  }

  // association evenement click sur une image a
  Bind_On_Click();
}
