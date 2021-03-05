module.exports = app => {
    const monitors = require("../controllers/monitor.controller.js");

    const router = require("express").Router();

    // Create a new Monitor
    router.post("/", monitors.create);

    // Retrieve all Monitors
    router.get("/", monitors.findAll);

    // Retrieve all active Monitors
    router.get("/active", monitors.findAllActived);

    // Retrieve a single Monitor with id
    router.get("/:id", monitors.findOne);

    // Update a Monitor with id
    router.put("/:id", monitors.update);

    // Delete a Monitor with id
    router.delete("/:id", monitors.delete);

    // Delete all Monitors
    router.delete("/", monitors.deleteAll);

    app.use('/api/monitors', router);
};