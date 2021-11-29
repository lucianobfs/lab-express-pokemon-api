const express = require("express")
const roteador = express.Router()
const db = require("./data")


roteador.post("/create-pokemon", (req, res) => {
    db.push({...req.body})
    console.log(db)
    return res.status(201).json({...db[db.length -1]})
})

roteador.get("/get-pokemon", (req, res) => {
    return res.status(200).json({...db})
})

roteador.patch("/edit-pokemon/:id", (req, res) => {
    const indexToSubstitute = db.findIndex((item) => {
        return item.id === req.params.id
    })

    console.log(indexToSubstitute)

    db[indexToSubstitute] = {...db[indexToSubstitute], ...req.body}

    res.status(200).json({...db[indexToSubstitute]})
})

roteador.delete("/delete-pokemon/:id", (req, res) => {
    db.map((item, i) => {
        if (item.id === req.params.id) {
            return db.splice(i, 1)
        }
    })

    res.status(200).json({})
})

roteador.get("/pokemon", (req, res) => {
    if (req.query.search) {
        const searchRes = db.filter((item) => {
            for (let key in item) {
                const includesRes = String(item[key]).toLocaleLowerCase().includes(req.query.search.toLocaleLowerCase())

                if (includesRes) {
                    return includesRes
                }
            }
        })

        if (searchRes.length) {
            return res.status(200).json(searchRes)
        }

        return res.status(404).json({msg: "erro, nao encontrado o pokemon"})
    }

    res.status(200).json(db)
}) 

module.exports = roteador