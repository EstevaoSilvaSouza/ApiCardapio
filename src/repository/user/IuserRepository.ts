import { IUser } from "../../data/user";
import { UsuarioStore } from '../../data/userStore';

export interface IGetUser{
    skipe?:string;
    take?:string;
}

export interface IUserRepository<T> {
    create:(p:T) => Promise<T | null>;
    createAddStore:(p:T,idStore:number) => Promise<T | null>;
    getAll: (id:number) => Promise<T[] | null>;
    findById:(id:number) => Promise<T | null>;
    findByUserName: (u:string) => Promise<T | null>;
    findAllUserByStore:(idStore:number) => Promise<T[] | null>;
    delete:(id:number) => Promise<boolean | null>;
    update:(p:T) => Promise<T | null>;
    createUserStore :(Id:number,idStore:number) => Promise<UsuarioStore>; 
}


export default abstract class UserAbs implements IUserRepository<IUser>{
    abstract createUserStore: (Id: number, idStore: number) => Promise<UsuarioStore>;
    abstract createAddStore:(p:IUser,idStore:number) => Promise<IUser | null>;
    abstract findAllUserByStore: (idStore:number) => Promise<IUser[] | null>;
    abstract create: (p: IUser) => Promise<IUser | null>;
    abstract  getAll: (id: number) => Promise<IUser[] | null>;
    abstract findById: (id: number) => Promise<IUser | null>;
    abstract findByUserName: (u: string) => Promise<IUser | null>;
    abstract  delete: (id: number) => Promise<boolean | null>;
    abstract update: (p: IUser) => Promise<IUser | null>;
} 
