export interface IRegister {
    email: string;
    password: string;
    displayName: string;
    avatar: File | null;
}

export interface ILogin {
    email: string;
    password: string;
    displayName: string;
    avatar: File | null;
}

export interface IUser {
    _id: string;
    email: string;
    token: string;
    role: string;
    displayName: string;
    googleId: string;
    avatar: string;
}

export interface IRegisterResponse {
    user: IUser;
    message: string;
}

export interface ValidationError {
    errors: {
        [key: string]:{
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}

export interface ICocktail {
    _id: string;
    user: string;
    title: string;
    image: string;
    recipe: string;
    isPublished: boolean;
    ingredients: [{
        _id: string;
        titleOfIngredient: string;
        quantity: string;
    }]
}

export interface Cocktail {
    title: string;
    image: File | null;
    recipe: string;
    ingredients: string;
}
