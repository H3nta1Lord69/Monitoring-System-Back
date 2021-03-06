// Invoke folder models
const db = require("../models");
// Invoke Monitoring model
const Monitoring = db.monitoring;
// Operator from Sequelize
const Op = db.Sequelize.Op;

// Create and Save a new Monitor
exports.create = (req, res) => {
    // Validate a request
    if(!req.body.classroom) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Monitoring
    const monitoring = {
        class: req.body.class,
        monitor_assign: req.body.monitor_assign,
        date_assign: req.body.date_assign,
        classroom: req.body.classroom
    };

    // Save a Monitoring in the database
    Monitoring.create(monitoring)
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

// Retrieve all Monitorings from the database
exports.findAll = (req, res) => {
    const classroom = req.query.classroom;
    const condition = classroom ? { classroom: { [Op.like]: `%${classroom}` } } : null;

    Monitoring.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving monitors."
            });
        });
};

// Find a single Monitoring with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Monitoring.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Monitoring with id: ${id}.`
            });
        });
};

// Update a Monitor by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Monitoring.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Monitor was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Monitoring with id: ${id}. Maybe Monitoring was not found or {req.body} is empty!`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: `Error updating Monitoring with id: ${id}`
            });
        });
};

// Delete a Monitor with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Monitoring.destroy({
        where: { id: id }
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Monitoring was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Monitoring with id: ${id}. Maybe Monitoring was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete Monitoring with id: ${id}`
            });
        });
};

// Delete all Monitors from the database
exports.deleteAll = (req, res) => {
    Monitoring.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} Monitoring were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error ocurrred while removing all monitorings."
            });
        });
};