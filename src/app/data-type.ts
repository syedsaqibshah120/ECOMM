export interface userSignUp{
    name:string,
    password:string,
    email:string
}


export interface userLogin{
    email:string,
    password:string,
}

export interface product{
    id: string,
    name: string,
    price: number,
    color: string,
    category: string,
    description: string,
    image: string,
    quantity:undefined|number
   
}