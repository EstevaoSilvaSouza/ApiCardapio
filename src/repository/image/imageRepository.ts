import { Image } from "../../data/image";
import ImageRepositoryAbs from "./IimageRepository";


class ImageRepository  extends ImageRepositoryAbs{
    create = async (payload: Image) : Promise<Image | null> => {
        return await Image.create(payload);
    };
    update = async (payload: Image) : Promise<Image | null> => {
        return await Image.create(payload);
    };
    delete = async (id: number) : Promise<boolean | null> => {
        return null;
    };

}