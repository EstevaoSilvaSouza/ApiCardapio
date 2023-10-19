
export default class GenericData<T> {
    private data:T;

    constructor(payload:T){
        this.data = payload;
    }

    returnData = () :T=> {
        return this.data;
    }
}