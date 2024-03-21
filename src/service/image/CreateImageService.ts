import GenericData from "../../data/genericData";
import { IImage, Image } from "../../data/image";
import ImageRepositoryAbs, { ImageResponse, StatusRequest } from "../../repository/image/IimageRepository";
import ImageRepository from "../../repository/image/imageRepository";

class CreateImageService {

    private KeyBase:string = 'a60cb78d2cefb917e4416a082c7113a6'
    private UrlBase:string = `https://api.imgbb.com/1/upload`
    
    constructor(private e:ImageRepositoryAbs){}

    fetchImage = async (b64:string): Promise<ImageResponse | null> => {

        const formData = new FormData();
        formData.append('key',this.KeyBase);
        formData.append('image',b64);

        const data = await fetch(this.UrlBase,{
            method:'post',
            body: formData,
            
        })

        const dataResult = await data.json();
        return dataResult;
    }

    handleCreateImageServer = async (img:string):Promise<ImageResponse | null> => {
        const sendImageServer = await this.fetchImage(img);
        console.log(sendImageServer);
        return sendImageServer;
    }

    handleExecute = async (base64:string,idItem:number,status:string) : Promise <IImage | null>=> {
        let createImageServerIIMGBb = null;
        console.log("dev")
        if(status === StatusRequest.Image){
            return null;
        } 
        else if (status === StatusRequest.Product){
            const imgUrl = await this.handleCreateImageServer(base64)
            const img = new GenericData<IImage>({Name:'Image Product', Url:imgUrl?.data.url!, Id_Product:idItem}).returnData();
            createImageServerIIMGBb = await this.e.create(img);
        } 
        else {return null}

        return createImageServerIIMGBb && createImageServerIIMGBb;
    }
}

export const _CreateImageService = new CreateImageService(new ImageRepository());


