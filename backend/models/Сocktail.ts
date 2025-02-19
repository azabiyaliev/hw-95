import mongoose, {HydratedDocument} from "mongoose";
import {UserFields} from "../types";

const Schema = mongoose.Schema;

const CocktailSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    title: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: async function (this: HydratedDocument<UserFields>, value: string): Promise<boolean> {
                if (!this.isModified("title")) return true;
                const title: UserFields | null = await Cocktail.findOne({title: value});
                return !title;
            },
            message: "This title is already taken",
        },
    },
    image: {
        type: String,
        required: true,
    },
    recipe: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    ingredients: [
        {
            titleOfIngredient: {
                type: String,
                required: true,
            },
            quantity: {
                type: String,
                required: true,
            }
        }
    ]
})

const Cocktail = mongoose.model('Cocktail', CocktailSchema)
export default Cocktail;