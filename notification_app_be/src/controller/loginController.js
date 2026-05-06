let user_data = []
let user_id = 1

export const addUser = (req, res) => {
    const { email, name } = req.body;

    if (!name || !email) return res.status(400).json({message: "both email and name should be entered"});

    user_data.push({
        id: user_id++,
        email: email,
        name: name
    });

    res.status(201).json({message: "user added"});
}

export const deleteUser = (req, res) => {
    const id = req.params.id 
    const findUser = user_data.find(user => user.id === id)
    if (findUser === -1) return res.status(404).json({message: "user not found"})

    user_data.splice(findUser, 1)
    res.status(200).json({message: "fetched deleted"})
}