"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../data/user");
class UserRepository {
    constructor() {
        this.create = async (p) => {
            try {
                return await user_1.User.create(p);
            }
            catch (error) {
                return error;
            }
        };
        this.getAll = () => {
            throw ('ok');
        };
        this.findById = (id) => {
            throw ('ok');
        };
        this.findByUserName = async (u) => {
            return await user_1.User.findOne({ where: { Username: u } });
        };
        this.delete = (id) => {
            throw ('ok');
        };
        this.update = (p) => {
            throw ('ok');
        };
    }
}
exports.default = UserRepository;
