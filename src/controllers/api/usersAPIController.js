const path = require('path');
const usersDatabase = require(path.resolve(__dirname, "../../legacyDatabase/jsonUsersDatabase"));

const usersAPIController = {
    usersList: async (req, res) => {
        const allUsers = await usersDatabase.getAllUsers();

        let response = {
            count: 0,
            users: []
        };

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

        return res.json(response);
    },

    userDetail: async (req, res) => {
        const id = req.params.id
        const user = await usersDatabase.userFindById(id);

        const host = req.protocol + "://" + req.get('host');
        const avatarPath = "/images/users/";

        let response = {
            id: id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthday: user.birthday,
            contactInfo: {
                address: user.userContactInformation.address,
                location: user.userContactInformation.location,
                province: user.userContactInformation.province,
                zipCode: user.userContactInformation.zipCode,
                phone: user.userContactInformation.phone,
            },
            avatarUrl: host + avatarPath + ( user.image ?? "defaultUser.png")
        };

        return res.json(response);
    }
};

module.exports = usersAPIController;