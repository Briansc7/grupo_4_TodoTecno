const path = require('path');
const usersDatabase = require(path.resolve(__dirname, "../../legacyDatabase/jsonUsersDatabase"));

const usersAPIController = {
    usersList: async (req, res) => {
        let allUsers = await usersDatabase.getAllUsers();

        let response = {
            count: 0,
            users: []
        }

        response.count = allUsers.length;

        allUsers.forEach(user => {
            const host = req.protocol + "://" + req.get('host');
            const detailPath = "/admin/users/detail/";
            response.users.push(
                {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    detail: host + detailPath + user.id
                }
            )
        });

        return res.json(response);;
    },

    userDetail: async (req, res) => {
        let response = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,//todos los campos

            avatarUrl: avatarUrl
        }
    }
};

module.exports = usersAPIController;