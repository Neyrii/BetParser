export class Actor {
    protected _name: string;
    protected _odd: number;

    get name(){
        return this._name;
    }
    
    get odd(){
        return this._odd;
    }

    constructor(_name: string, _odd:number){
        this._name = _name;
        this._odd = _odd;
    }

    public toString = () : string => {
        return this.name + ' : ' + this.odd
    }
}

