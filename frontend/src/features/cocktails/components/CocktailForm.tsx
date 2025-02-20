import {ChangeEvent, FormEvent, useState} from 'react';
import Grid from '@mui/material/Grid2';
import {Button, Card, TextField, Typography} from '@mui/material';
import {Cocktail} from "../../../types";
import FileInput from "../../../components/FileInput/FileInput.tsx";
import Container from "@mui/material/Container";
import * as React from "react";

// import {useAppDispatch} from "../../../app/hooks.ts";

interface Props {
    onSubmit: (cocktail: Cocktail) => void;
}

const initialState = {
    title: "",
    image: null,
    recipe: "",
    ingredients: "",
};

const CocktailForm: React.FC<Props> = ({onSubmit}) => {
    const [form, setForm] = useState<Cocktail>(initialState);
    const [ingredients, setIngredients] = useState<{ titleOfIngredient: string, quantity: string }[]>([]);
    // const dispatch = useAppDispatch();

    const submitFormHandler = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({...form, ingredients: JSON.stringify(ingredients)});
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm((prevState) => ({...prevState, [name]: value}));
    };

    const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if (files) {
            setForm((prevState) => ({
                ...prevState,
                [name]: files[0] || null,
            }));
        }
    };

    const addIngredient = () => {
        setIngredients(prev => [...prev, {titleOfIngredient: '', quantity: ''}]);
    };

    const deleteIngredient = (index: number) => {
        setIngredients(ingredients.filter((_ing, i) => i !== index));
    };

    const onChangeIngredient = (i: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target;
        setIngredients(ingredients.map((ing, index) => {
            const ingCopy = {
                ...ingredients[i],
                [name]: value
            }
            if (index === i) return ingCopy;

            return ing;
        }));
    }

    return (
        <form onSubmit={submitFormHandler}>
            <Container maxWidth="xl">
                <Card
                    sx={{
                        width: "50%",
                        borderRadius: "10px",
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
                        marginTop: 5,
                        mx: "auto",
                        p: 2,
                    }}
                >
                    <Grid container direction="column" spacing={2}>
                        <Grid size={{xs: 12}}>
                            <TextField
                                id="title"
                                name="title"
                                label="Title"
                                sx={{width: "100%"}}
                                required
                                value={form.title}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                        <Grid size={{xs: 12}}>
                            <Typography>Ingredients</Typography>
                            {ingredients.map((_ing, i) => (
                                <Grid container key={i}>
                                    <Grid>
                                        <TextField
                                            name="titleOfIngredient"
                                            label="Title of ingredient"
                                            sx={{width: "100%"}}
                                            required
                                            value={ingredients[i].titleOfIngredient}
                                            onChange={e => onChangeIngredient(i, e)}
                                        />
                                    </Grid>
                                    <Grid>
                                        <TextField
                                            name="quantity"
                                            label="Quantity"
                                            sx={{width: "100%"}}
                                            required
                                            value={ingredients[i].quantity}
                                            onChange={e => onChangeIngredient(i, e)}
                                        />
                                    </Grid>
                                    <Grid>
                                        {ingredients.length <= 1 ? null :
                                            <Grid>
                                                <Button type="button" onClick={() => deleteIngredient(i)}>X</Button>
                                            </Grid>
                                        }
                                    </Grid>
                                </Grid>
                            ))}

                            <Grid>
                                <Button type="button" onClick={addIngredient}>Add new ingredient</Button>
                            </Grid>

                        </Grid>

                        <Grid size={{xs: 12}}>
                            <TextField
                                multiline
                                id="recipe"
                                name="recipe"
                                label="Recipe"
                                sx={{width: "100%"}}
                                value={form.recipe}
                                onChange={inputChangeHandler}
                            />
                        </Grid>

                        <Grid size={{xs: 12}}>
                            <FileInput
                                name="image"
                                label="Image"
                                onGetFile={fileEventChangeHandler}
                            />
                        </Grid>

                        <Grid>
                            <Button type="submit" color="primary">
                                Create cocktail
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </form>
    );
};

export default CocktailForm;
