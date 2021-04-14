const express = require("express")
const posts = require("./posts-model")

const router = express.Router()

router.get("/posts", (req, res) => {
    posts.find(req.query)
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error retrieving the users",
            })
        })
})

router.get("/posts/:id", (req, res) => {
    posts.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "Post not found",
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error retrieving the post",
            })
        })
})

router.post("/posts", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            message: "Missing title or contents",
        })
    }

    posts.insert(req.body)
        .then((post) => {
            res.status(201).json(post)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error adding the post",
            })
        })
})

router.put("/posts/:id", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            message: "Missing title or contents",
        })
    }

    users.update(req.params.id, req.body)
        .then((post) => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post could not be found",
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error updating the post",
            })
        })
})

module.exports = router