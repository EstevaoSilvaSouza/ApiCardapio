import { IImage, Image } from "../../data/image";

export enum StatusRequest {
    Image = 'Image',
    Product = 'Product'
}

interface ImageData {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    width: number;
    height: number;
    size: number;
    time: number;
    expiration: number;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    delete_url: string;
  }
  
 export interface ImageResponse {
    data: ImageData;
    success: boolean;
    status: number;
  }


interface IImageRepositoryABS {
    create : (payload:IImage) => Promise<IImage | null>;
    update : (payload:IImage) => Promise<IImage | null>;
    delete : (id:number) => Promise<boolean | null>;
}

export default abstract class ImageRepositoryAbs implements IImageRepositoryABS {
    abstract create: (payload:IImage) => Promise<IImage | null>;
    abstract update : (payload:IImage) => Promise<IImage  | null>;
    abstract delete : (id:number) => Promise<boolean | null>; 
}