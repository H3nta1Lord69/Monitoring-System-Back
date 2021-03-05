module.exports = app => {
    const monitorings = require("../controllers/monitoring.controller.js");

    const router = require("express").Router();

    // Create a new Monitoring
    router.post("/", monitorings.create);

    // Retrieve all Monitors
    router.get("/", monitorings.findAll);

    // Retrieve a single Monitor with id
    router.get("/:id", monitorings.findOne);

    // Update a Monitor with id
    router.put("/:id", monitorings.update);

    // Delete a Monitor with id
    router.delete("/:id", monitorings.delete);

    // Delete all Monitorings
    router.delete("/", monitorings.deleteAll);

    app.use('/api/monitorings', router);

};