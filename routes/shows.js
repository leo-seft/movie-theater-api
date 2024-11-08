const express = require("express");
const router = express.Router(); 
const {Show} = require("../models/index")
router.use(express.json())

const {check, validationResult} = require("express-validator");
router.use(express.urlencoded({extended: true}))

router.get("/", async (req, res) => {
    if (req.query.genre){
        const shows = await Show.findAll({ where: {genre: req.query.genre}});
        res.json(shows)
    } else
    {const shows = await Show.findAll();
    res.json(shows)}
})

router.get("/:id", async (req, res) => {
    const showId = req.params.id
    const show = await Show.findByPk(showId);
    res.json(show)
})

router.put("/:id", async(req, res) => {
    const showId = req.params.id;
    let show = await Show.findByPk(showId);
    show = await show.update(req.body)
    res.json(show)
})

router.delete("/:id", async(req, res) => {
    const showId = req.params.id;
    let show = await Show.findByPk(showId);
    show = await show.destroy()
    res.status(204).send()
})

router.get("/genre/:genre", async (req, res) => {
    const genre = req.query.genre
    const shows = await Show.findAll({ where: {genre: genre}});
    res.json(shows)
})

module.exports = router;