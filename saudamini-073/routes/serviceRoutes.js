const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const {
    getSalonServices,
    addService,
    editService,
    removeService,
    availableServices
} = require("../controllers/serviceController");

const router = express.Router();

router.get("/available", availableServices);
router.put("/:id", authenticateToken, editService);
router.delete("/:id", authenticateToken, removeService);

module.exports = router;