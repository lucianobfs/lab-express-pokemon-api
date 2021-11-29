const express = require("express");

const roteador = require("./teste")

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

// -- Define your route listeners here! --
app.use(express.json())
app.use("/", roteador)

// app.get("/search", (req, res, next) => {
//     res.send(req.query)
    
// })


app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
