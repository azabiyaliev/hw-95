import express from "express";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import {Error} from "mongoose";
import Cocktail from "../models/Сocktail";

const cocktailsRouter = express.Router();

cocktailsRouter.post('/', imagesUpload.single('image'), auth, permit("admin", "user"), async (
    req,
    res,
    next) => {
    let reqWithUser = req as RequestWithUser;
    const userFromAuth = reqWithUser.user._id;

    const cocktailData = {
        user: userFromAuth,
        title: req.body.title,
        image: req.file ? 'images' + req.file.filename : null,
        recipe: req.body.recipe,
        isPublished: false,
        ingredients: [{
            titleOfIngredient: req.body.ingredients.titleOfIngredient,
            quantity: req.body.ingredients.quantity,
        }],
    }

    try {
        const cocktail = new Cocktail(cocktailData);
        await cocktail.save();
        res.send({cocktail, message: "Cocktail saved."});

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})

cocktailsRouter.get('/', async (
    _req,
    res,
    next) => {
    try {
        const cocktails = await Cocktail.find();
        res.send(cocktails);
    } catch (e) {
        next(e);
    }
})

cocktailsRouter.get('/:id', async (
    req,
    res,
    next) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send({error: "Missing ID"});
        return;
    }
    try {
        const cocktail = await Cocktail.findById(id);
        res.send(cocktail);
    } catch (e) {
        next(e);
    }
})

cocktailsRouter.delete('/:id', auth, permit('admin'), async (
    req,
    res,
    next) => {
    const id = req.params.id;
    let reqWithUser = req as RequestWithUser;
    if (!id) {
        res.status(400).send({error: "Missing ID"});
        return;
    }
    try {
        if (reqWithUser.user.role === "admin") {
            const cocktailDeleteByAdmin = await Cocktail.findByIdAndDelete(id)
            if (!cocktailDeleteByAdmin) {
                res.status(403).send({message: "Cocktail not found or access denied"});
                return;
            }
            res.send({cocktail: cocktailDeleteByAdmin, message: "Successfully deleted."});
        }
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})

cocktailsRouter.patch('/:id/togglePublished', auth, permit("admin"), async (
    req,
    res,
    next) => {
    const id = req.params.id;

    try {
        const cocktail = await Cocktail.findOne(
            {_id: id});
        if (!cocktail) {
            res.status(403).send({error: "Cocktail not found or access denied"});
        }

        if(req.body.user) delete req.body.user;

        const updateCocktail = await Cocktail.findOneAndUpdate(
            {_id: id},
            [{$set: {isPublished: {$not: "$isPublished"}}}],
            {new: true, runValidators: true}
        )
        if (updateCocktail) {
            res.send({message: "Successfully updated", isPublished: updateCocktail.isPublished});
        }

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})



export default cocktailsRouter;