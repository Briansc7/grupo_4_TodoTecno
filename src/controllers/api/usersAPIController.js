const path = require('path');
const usersDatabase = require(path.resolve(__dirname, "../../legacyDatabase/jsonUsersDatabase"));

const usersAPIController = {
    usersList: async (req, res) => {
        try{
            if(!(req.query.page) ||  isNaN(Number(req.query.page))){ //se muestra error en caso de no recibir pagina o sea invalida
                return res.status(500).json({
                    errorMsg: "Invalid Page"
                });
            }

            const limit = 10;
            const page = Number(req.query.page) ?? 1;
            const host = req.protocol + "://" + req.get('host');
            const apiPath = "/api/users/";
            const partialURL = host + apiPath + "?page="

            const allUsers = await usersDatabase.getAllUsers();
            const allUsersCount = allUsers.length;

            const pagedUsers = await usersDatabase.getAllUsers({limit, page});

            let usersPageCount = pagedUsers.length; //cantidad de usuarios recibidos en paginado 

            let nextUrl = usersPageCount>limit ? partialURL+(page+1) : null;
            let previousUrl = page==1?null: partialURL+(page-1);

            let response = {
                count: allUsersCount,
                users: [],
                next: nextUrl,
                previous: previousUrl
            };
    
            pagedUsers.every((user,i) => {
                if(i==limit){ //se recibe uno extra solo para facilitar el paginado, no se debe retornar
                    return false;
                }
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
                );
                return true;
            });
    
            return res.json(response);
        }catch(error){
            console.log(error);
            return res.status(500).json({
                errorMsg: "Error interno del servidor"
            });
        }
        
    },

    userDetail: async (req, res) => {
        try{
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
        }catch(error){
            console.log(error);
            return res.status(500).json({
                errorMsg: "Usuario no encontrado"
            });
        }
        
    }
};

module.exports = usersAPIController;