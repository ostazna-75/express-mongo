const express = require("express");
const app = express(); //route qui vont intéroger le serveur

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/counter", { useNewUrlParser: true });

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const port = 3000;

// déclarer une variable appelé counter
//notre mini base de donnée
let counter = 0;

const Counter = mongoose.model("Counter", {
  name: "",
  quantity: 0
});

//commencer a ecrire les route
app.get("/", (req, res) => {
  // a chaque fois q'un utlisateur va sur le site il va lire res.json
  res.json("Valeur du compteur est " + counter + " !!!");
});

//ce qui se passe quand quelquun créer un counter
//req.body c'est ce qu'on récupérer de la requete
app.post("/create", async (req, res) => {
  try {
    const newCounter = new Counter({
      name: req.body.toto,
      quantity: req.body.tata
    });
    await newCounter.save();
    res.json(newCounter);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// création d'1 autre route
// pour incrémenter le counter
// app.get("/increment", (req, res) => {
//   counter++;
//   res.send("la on incrémente !");
// });

app.post("/increment", async (req, res) => {
  const counterFound = await Counter.findById(req.body.id); // déclare une variable counter qui a étéait trouvé est le résultat de la recherche de fiunbyid dans la collection Counter et on lui dit trouve moi le counter qui à l'id que l'utilisateur a donné dans le formulaire
  counterFound.quantity = counterFound.quantity + req.body.quantity;
  counterFound.save();
  res.json(counterFound);
});

app.post("/decrement", async (req, res) => {
  const counterFound = await Counter.findById(req.body.id); // déclare une variable counter qui a étéait trouvé est le résultat de la recherche de fiunbyid dans la collection Counter et on lui dit trouve moi le counter qui à l'id que l'utilisateur a donné dans le formulaire
  counterFound.quantity = counterFound.quantity - req.body.quantity;
  counterFound.save();
  res.json(counterFound);
});

// app.get("/decrement", (req, res) => {
//     counter--;
//     res.send("la on décrémente !");
// });

// elle sert a lire la route en get elle cherche des info pour nous les envoyer
// post pour envoyer une action ou des donnée quand par ex un utilisateur s'inscrit.

//écouter un port
app.listen(port, () => {
  console.log("Serer has started");
});
