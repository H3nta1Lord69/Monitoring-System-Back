// Invoke folder models
const db = require("../models");
// Invoke Monitor model
const Monitor = db.monitor;
// Operator from Sequelize
const Op = db.Sequelize.Op;

// Create and Save a new Monitor
exports.create = (req, res) => {
    // Validate a request
    if(!req.body.pid) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Monitor
    const monitor = {
        name: req.body.name,
        lastname: req.body.lastname,
        career: req.body.career,
        semester: req.body.semester,
        pid: req.body.pid,
        phone: req.body.phone,
        email: req.body.email,
        active: req.body.active ? req.body.active : false
    };

    // Save Monitor in the database
    Monitor.create(monitor)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while creating the Monitor."
            });
        });
};

// Retrieve all Monitors from the database
exports.findAll = (req, res) => {
    const pid = req.query.pid;
    const condition = pid ? { pid: { [Op.like]: `%${pid}` } } : null;

    Monitor.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving tutorials."
            });
        });
};

// Find a single Monitor with an id or pid
exports.findOne = (req, res) => {
    const id = req.params.id;

    Monitor.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Monitor with id: ${id}.`
            });
        });
};

// Update a Monitor by the id or pid in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Monitor.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Monitor was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Monitor with id: ${id}. Maybe Monitor was not found or {req.body} is empty!`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: `Error updating Monitor with id: ${id}`
            });
        });
};

// Delete a Monitor with the specified id or pid in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Monitor.destroy({
        where: { id: id }
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Monitor was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Monitor with id: ${id}. Maybe Monitor was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete Monitor with id: ${id}`
            });
        });
};

// Delete all Monitors from the database
exports.deleteAll = (req, res) => {
    Monitor.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} Monitors were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error ocurrred while removing all monitors."
            });
        });
};

// Find all active monitors
exports.findAllActived = (req, res) => {
    Monitor.findAll({ where: {active: true} })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving the active Monitors."
            });
        });
};