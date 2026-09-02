const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const {
    getSalons,
    getSalon,
    addSalon,
    editSalon,
    removeSalon,
    topSalons,
    salonsByCity
} = require("../controllers/salonController");

const {
    getSalonServices,
    addService
} = require("../controllers/serviceController");

const router = express.Router();

router.get("/top", topSalons);
router.get("/city/:city", salonsByCity);
router.get("/:id/services", getSalonServices);
router.post("/:id/services", authenticateToken, addService);
router.get("/", getSalons);
router.get("/:id", getSalon);

router.post("/", authenticateToken, addSalon);
router.put("/:id", authenticateToken, editSalon);
router.delete("/:id", authenticateToken, removeSalon);

module.exports = router;