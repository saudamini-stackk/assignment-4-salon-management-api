const supabase = require("./supabase");

const getAllSalons = async () => {
    const { data, error } = await supabase
        .from("salons")
        .select("*");

    return { data, error };
};

const getSalonById = async (id) => {
    const { data, error } = await supabase
        .from("salons")
        .select("*")
        .eq("id", id)
        .single();

    return { data, error };
};

const createSalon = async (salonData) => {
    const { data, error } = await supabase
        .from("salons")
        .insert([salonData])
        .select()
        .single();

    return { data, error };
};

const updateSalon = async (id, salonData) => {
    const { data, error } = await supabase
        .from("salons")
        .update(salonData)
        .eq("id", id)
        .select()
        .single();

    return { data, error };
};

const deleteSalon = async (id) => {
    const { data, error } = await supabase
        .from("salons")
        .delete()
        .eq("id", id)
        .select()
        .single();

    return { data, error };
};

const getTopSalons = async () => {
    const { data, error } = await supabase
        .from("salons")
        .select("*")
        .order("rating", { ascending: false })
        .limit(5);

    return { data, error };
};

const getSalonsByCity = async (city) => {
    const { data, error } = await supabase
        .from("salons")
        .select("*")
        .ilike("city", city);

    return { data, error };
};

module.exports = {
    getAllSalons,
    getSalonById,
    createSalon,
    updateSalon,
    deleteSalon,
    getTopSalons,
    getSalonsByCity
};