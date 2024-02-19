"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("../../data/store"));
const user_1 = require("../../data/user");
class UserRepository {
    constructor() {
        this.create = async (p) => {
            try {
                return await user_1.User.create(p);
            }
            catch (error) {
                console.log(error);
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
            return user_1.User.findOne({
                where: { Username: u },
                include: [
                    { model: store_1.default, attributes: { exclude: ["Type", "Description", "createdAt", "updatedAt", "IdUser",] }, through: { attributes: [] } },
                ]
            });
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
