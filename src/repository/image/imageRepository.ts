import { IImage, Image } from "../../data/image";
import ImageRepositoryAbs from "./IimageRepository";


export default class ImageRepository  extends ImageRepositoryAbs{
    create = async (payload: IImage) : Promise<IImage | null> => {
        return await Image.create(payload);
    };
    update = async (payload: IImage) : Promise<IImage | null> => {
        return await Image.create(payload);
    };
    delete = async (id: number) : Promise<boolean | null> => {
        return null;
    };

}