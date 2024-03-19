import { Image } from "../../data/image";




interface IImageRepositoryABS {
    create : (payload:Image) => Promise<Image | null>;
    update : (payload:Image) => Promise<Image | null>;
    delete : (id:number) => Promise<boolean | null>;
}

export default abstract class ImageRepositoryAbs implements IImageRepositoryABS {
    abstract create: (payload:Image) => Promise<Image | null>;
    abstract update : (payload:Image) => Promise<Image  | null>;
    abstract delete : (id:number) => Promise<boolean | null>; 
}