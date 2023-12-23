"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._FindStoreByUserService = void 0;
const findService_1 = require("../store/findService");
class FindStoreByUser {
    constructor() {
        //constructor(private a:IUserRepository<IUser>){}
        this.handleExecute = async (idUser, name) => {
            const findStoreByUserId = await findService_1._FindService.Execute('UserAuth', name, idUser, 1010);
            if (!findStoreByUserId) {
                return { id: 20 };
            }
            else {
                return { id: 30, obj: findStoreByUserId };
            }
        };
    }
}
exports._FindStoreByUserService = new FindStoreByUser();
