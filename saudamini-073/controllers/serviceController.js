const {
    getServicesBySalon,
    createService,
    getServiceById,
    updateService,
    deleteService,
    getAvailableServices
} = require("../models/serviceModel");

const getSalonServices = async (req, res) => {
    try {
        const { data, error } = await getServicesBySalon(req.params.id);

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

const addService = async (req, res) => {
    try {
        const { serviceName, price, duration, isAvailable } = req.body;

        if (!serviceName || price === undefined || !duration) {
            return res.status(400).json({
                message: "Service name, price and duration are required"
            });
        }

        if (typeof price !== "number" || price < 0) {
            return res.status(400).json({
                message: "Price must be a valid positive number"
            });
        }

        const { data: salon, error: salonError } = await require("../models/salonModel").getSalonById(req.params.id);

        if (salonError || !salon) {
            return res.status(404).json({
                message: "Salon not found"
            });
        }

        const serviceData = {
            salonId: req.params.id,
            serviceName,
            price,
            duration,
            isAvailable: isAvailable !== undefined ? isAvailable : true
        };

        const { data, error } = await createService(serviceData);

        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        res.status(201).json({
            message: "Service created successfully",
            service: data
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const editService = async (req, res) => {
    try {
        const { serviceName, price, duration, isAvailable } = req.body;

        if (
            serviceName === undefined &&
            price === undefined &&
            duration === undefined &&
            isAvailable === undefined
        ) {
            return res.status(400).json({
                message: "At least one field is required"
            });
        }

        if (price !== undefined && (typeof price !== "number" || price < 0)) {
            return res.status(400).json({
                message: "Price must be a valid positive number"
            });
        }

        const { data: existingService, error: existingError } = await getServiceById(req.params.id);

        if (existingError || !existingService) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        const updateData = {};

        if (serviceName !== undefined) updateData.serviceName = serviceName;
        if (price !== undefined) updateData.price = price;
        if (duration !== undefined) updateData.duration = duration;
        if (isAvailable !== undefined) updateData.isAvailable = isAvailable;

        const { data, error } = await updateService(req.params.id, updateData);

        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        res.status(200).json({
            message: "Service updated successfully",
            service: data
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const removeService = async (req, res) => {
    try {
        const { data: existingService, error: existingError } = await getServiceById(req.params.id);

        if (existingError || !existingService) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        const { data, error } = await deleteService(req.params.id);

        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        res.status(200).json({
            message: "Service deleted successfully",
            service: data
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const availableServices = async (req, res) => {
    try {
        const { data, error } = await getAvailableServices();

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
    getSalonServices,
    addService,
    editService,
    removeService,
    availableServices
};