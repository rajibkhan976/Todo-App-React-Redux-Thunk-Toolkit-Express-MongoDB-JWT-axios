const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// get config vars
dotenv.config();

authenticateToken = (req, res, next) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401); // if there isn't any token
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err);
      if (err) {
        return res.sendStatus(403);
      } 
      req.user = user;
      next(); // pass the execution off to whatever request the client intended
    })
}

generateAccessToken = (title) => {
    // expires after one hour (3600 seconds = 1 hour)
    return jwt.sign(title, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
}

getTodos = (req, res, next) => {
    var query = req.models.Todos.find();
    query.exec().then((todos) => {
        return res.status(200).send({
            "todos": todos,
            "message": `Loading successful`
        })
    })
    .catch((error) => {
        next(error);
        return res.status(404).send({
            "error": error,
            "message": `Loading failed`
        });
    })
}

getTodoById = (req, res, next) => {
    req.models.Todos.findById(req.params.id).then((todo) => {
        return res.status(200).send({
            "todo": todo,
            "message": `${todo.title} fetched successfully:)`
        });
    })
    .catch((error) => {
        next(error);
        return res.status(404).send({
            "error": error,
            "message": `Failed`
        });
    })
}

addTodo = (req, res, next) => {
    const token = generateAccessToken({ title: req.body.title });
    req.models.Todos.create({
        title: req.body.title
    })
    .then((todo) => {
        return res.status(201).send({
            "token": token,
            "todo": todo,
            "message": `Creation successful`
        });
    })
    .catch((error) => {
        next(error);
        return res.status(400).send({
            "error": error,
            "message": `Creation failed`
        });
    })
}

updateTodoById = (req, res, next) => {
    req.models.Todos.updateOne({_id: req.params.id }, {
        title: req.body.title
    }, {
        new: true,
        upsert: true,
        runvalidators: true
    })
    .then((status) => {
        if (status.upserted) {
            res.status(201).send({
                "message": `Creation successful`
            });
        } else if (status.nModified) {
            res.status(200).send({
                "message": `Update successful`
            });
        } else {
            res.sendStatus(204);
        }
    })
    .catch((error) => {
        next(error);
        return res.status(404).send({
            "error": error,
            "message": `Update failed`
        });
    })
}

deleteTodoById = (req, res, next) => {
    req.models.Todos.findByIdAndDelete({ 
        _id: req.params.id
    })
    .then((todo) => {
        if (todo) {
            return res.status(200).send({
                "message": `Deletion successful`
            });
        }
        res.sendStatus(204);
    })
    .catch((error) => {
        next(error);
        return res.status(404).send({
            "error": error,
            "message": `Deletion failed`
        });
    })
}

module.exports = {
    authenticateToken,
    getTodos,
    getTodoById,
    addTodo,
    updateTodoById,
    deleteTodoById
};