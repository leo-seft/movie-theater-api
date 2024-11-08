const express = require("express");
const router = express.Router(); 
const {User} = require("../models/index")
router.use(express.json())

const {check, validationResult} = require("express-validator")
router.use(express.urlencoded({extended: true}))

router.get("/", async (req, res) => {
    const users = await User.findAll();
    res.json(users)
})

router.get("/:id", async (req, res) => {
    const userId = req.params.id
    const user = await User.findByPk(userId)
    res.json(user)
})

router.get("/:id/shows", async (req, res) => {
    const userId = req.params.id
    const user = await User.findByPk(userId)
    const shows = await user.getShows()
    res.json(shows)
})

router.put("/:id/shows/:showId", async (req, res) => {
    const userId = req.params.id
    const user = await User.findByPk(userId)
    if (!user){
        res.status(404).json({error: "user not found"})
        return
    }
    const showId = req.params.id
    const show = await User.findByPk(showId)
    if (!show){
        res.status(404).json({error: "show not found"})
        return
    }
    await user.addShow(show)
    res.status(200).json({watched : true})
})

module.exports = router;