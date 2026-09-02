const {
    getAllSalons,
    getSalonById,
    createSalon,
    updateSalon,
    deleteSalon,
    getTopSalons,
    getSalonsByCity
} = require("../models/salonModel");

const getSalons = async (req, res) => {
    try {
        const { data, error } = await getAllSalons();

        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const getSalon = async (req, res) => {
    try {
        const { data, error } = await getSalonById(req.params.id);

        if (error || !data) {
            return res.status(404).json({
                message: "Salon not found"
            });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const addSalon = async (req, res) => {
    try {
        const { name, city, address, rating } = req.body;

        if (!name || !city || !address || rating === undefined) {
            return res.status(400).json({
                message: "Name, city, address and rating are required"
            });
        }

        if (typeof rating !== "number" || rating < 0 || rating > 5) {
            return res.status(400).json({
                message: "Rating must be a number between 0 and 5"
            });
        }

        const { data, error } = await createSalon({
            name,
            city,
            address,
            rating
        });

        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        res.status(201).json({
            message: "Salon created successfully",
            salon: data
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const editSalon = async (req, res) => {
    try {
        const { name, city, address, rating } = req.body;

        if (!name && !city && !address && rating === undefined) {
            return res.status(400).json({
                message: "At least one field is required"
            });
        }

        if (rating !== undefined && (typeof rating !== "number" || rating < 0 || rating > 5)) {
            return res.status(400).json({
                message: "Rating must be a number between 0 and 5"
            });
        }

        const updateData = {};

        if (name !== undefined) updateData.name = name;
        if (city !== undefined) updateData.city = city;
        if (address !== undefined) updateData.address = address;
        if (rating !== undefined) updateData.rating = rating;

        const { data, error } = await updateSalon(req.params.id, updateData);

        if (error || !data) {
            return res.status(404).json({
                message: "Salon not found"
            });
        }

        res.status(200).json({
            message: "Salon updated successfully",
            salon: data
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const removeSalon = async (req, res) => {
    try {
        const { data, error } = await deleteSalon(req.params.id);

        if (error || !data) {
            return res.status(404).json({
                message: "Salon not found"
            });
        }

        res.status(200).json({
            message: "Salon deleted successfully",
            salon: data
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const topSalons = async (req, res) => {
    try {
        const { data, error } = await getTopSalons();

        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const salonsByCity = async (req, res) => {
    try {
        const { data, error } = await getSalonsByCity(req.params.city);

        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getSalons,
    getSalon,
    addSalon,
    editSalon,
    removeSalon,
    topSalons,
    salonsByCity
};