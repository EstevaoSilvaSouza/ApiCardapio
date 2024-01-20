import { ICartRepository, IGetAllCount } from "../../repository/cart/ICartRepository";
import { CartItemRepository } from "../../repository/cart/cartItemRepository";


class FindAllCountService {
    constructor(private s:ICartRepository<any>){}

    handleExecute = async (id:number,name:string) : Promise<IGetAllCount | null>=> {
        const findALl = await this.s.GetAllCount(id,name);

        if(!findALl) throw({message:'Falha ao processar contagem inicial'});

        return findALl ?? findALl;
    }
}

export const _FindAllCountService = new FindAllCountService(new CartItemRepository());