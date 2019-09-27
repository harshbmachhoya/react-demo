const Blog = require('../model/blog.model');

// Create and Save a new blog
exports.create = (req, res) => {
    //Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Note blog title can not be empty"
        });
    }
    console.log(req, req.body);
    //Create a blog
    const blog = new Blog({
        title: req.body.title || "Untitled Note",
        body: req.body.body,
        file: req.body.files.file
    });
    const file = req.body.files.file;


    blog.save()
        .then(data => {
            fiile.mv(`${__dirname}/redux-ant-example/public/uploads/${file.name}`, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }
                res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
            });

            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

// Retrieve and return all blogs from the database.
exports.findAll = (req, res) => {
    Blog.find()
        .then(blogs => {
            res.send(blogs);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving blogs."
            });
        });
};

// Find a single blog with a blogId
exports.findOne = (req, res) => {
    Blog.findById(req.params.blogId)
        .then(blog => {
            if (!blog) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.blogId
                })
            }
            res.send(blog);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        })
};

// Update a blog identified by the blogId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Note blog title can not be empty"
        });
    }
    // Find note and update it with the request body
    Blog.findByIdAndUpdate(req.params.blogId, {
        title: req.body.title || "Untitled Note",
        body: req.body.body,
        file: req.body.file
    }, { new: true })
        .then(blog => {
            if (!blog) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.blogId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.blogId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.blogId
            });
        });
};

// Delete a blog with the specified blogId in the request
exports.delete = (req, res) => {
    Blog.findByIdAndRemove(req.params.blogId)
        .then(blog => {
            if (!blog) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.blogId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.blogId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.blogId
            });
        });
};