const supabase = require("./supabase");

const getServicesBySalon = async (salonId) => {
    const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("salonId", salonId);

    return { data, error };
};

const createService = async (serviceData) => {
    const { data, error } = await supabase
        .from("services")
        .insert([serviceData])
        .select()
        .single();

    return { data, error };
};

const getServiceById = async (id) => {
    const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("id", id)
        .single();

    return { data, error };
};

const updateService = async (id, serviceData) => {
    const { data, error } = await supabase
        .from("services")
        .update(serviceData)
        .eq("id", id)
        .select()
        .single();

    return { data, error };
};

const deleteService = async (id) => {
    const { data, error } = await supabase
        .from("services")
        .delete()
        .eq("id", id)
        .select()
        .single();

    return { data, error };
};

const getAvailableServices = async () => {
    const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("isAvailable", true);

    return { data, error };
};

module.exports = {
    getServicesBySalon,
    createService,
    getServiceById,
    updateService,
    deleteService,
    getAvailableServices
};