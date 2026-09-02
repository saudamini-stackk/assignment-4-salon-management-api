const supabase = require("./supabase");

const createUser = async (userData) => {
    const { data, error } = await supabase
        .from("users")
        .insert([userData])
        .select()
        .single();

    return { data, error };
};

const findUserByEmail = async (email) => {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    return { data, error };
};

module.exports = {
    createUser,
    findUserByEmail
};