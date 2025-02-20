import mongoose from "mongoose";
import config from "./config";

import User from "./models/User";
import Cocktail from "./models/Сocktail";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection("users");
        await db.dropCollection("cocktails");
    } catch (e) {
        console.log("Collections were not presents")
    }

    const [Martin, Lazlo] = await User.create(
        {
            email: "martin@gmail.com",
            password: "123",
            role: "admin",
            token: crypto.randomUUID(),
            displayName: "Martin",
            avatar: "fixtures/martin.jpg",
        },
        {
            email: "lazlo@gmail.com",
            password: "123",
            role: "user",
            token: crypto.randomUUID(),
            displayName: "Lazlo",
            avatar: "fixtures/lazlo.jpg",
        }
    );


    await Cocktail.create(
        {
            user: Martin._id,
            title: "Маргарита",
            image: "fixtures/margarita.jpg",
            recipe: "Встряхните текилу, сок лайма и трипл сек со льдом. Процедите в бокал с солью по краю.",
            isPublished: true,
            ingredients: [
                { titleOfIngredient: "Текила", quantity: "50мл" },
                { titleOfIngredient: "Сок лайма", quantity: "25мл" },
                { titleOfIngredient: "Трипл сек", quantity: "20мл" },
                { titleOfIngredient: "Соль", quantity: "Для украшения" }
            ],
        },
        {
            user: Lazlo._id,
            title: "Мохито",
            image: "fixtures/mohito.jpg",
            recipe: "Разомните мяту, лайм и сахар. Добавьте ром и долейте содовой водой.",
            isPublished: true,
            ingredients: [
                { titleOfIngredient: "Белый ром", quantity: "50мл" },
                { titleOfIngredient: "Лайм", quantity: "Половина" },
                { titleOfIngredient: "Листья мяты", quantity: "10 листьев" },
                { titleOfIngredient: "Сахар", quantity: "2 ч.л." },
                { titleOfIngredient: "Содовая вода", quantity: "До верха" }
            ],
        },
        {
            user: Martin._id,
            title: "Олд Фэшн",
            image: "fixtures/oldfashioned.jpg",
            recipe: "Разомните сахар и биттер, добавьте виски и перемешайте. Украсьте апельсиновой цедрой.",
            isPublished: true,
            ingredients: [
                { titleOfIngredient: "Бурбон или ржаной виски", quantity: "50мл" },
                { titleOfIngredient: "Сахарный кубик", quantity: "1" },
                { titleOfIngredient: "Ангостура биттер", quantity: "2 капли" },
                { titleOfIngredient: "Апельсиновая цедра", quantity: "Для украшения" }
            ],
        },
        {
            user: Lazlo._id,
            title: "Космополитен",
            image: "fixtures/cosmopolitan.jpg",
            recipe: "Встряхните водку, трипл сек, клюквенный сок и сок лайма со льдом. Процедите в бокал.",
            isPublished: false,
            ingredients: [
                { titleOfIngredient: "Водка", quantity: "40мл" },
                { titleOfIngredient: "Трипл сек", quantity: "15мл" },
                { titleOfIngredient: "Клюквенный сок", quantity: "30мл" },
                { titleOfIngredient: "Сок лайма", quantity: "10мл" }
            ],
        },
        {
            user: Martin._id,
            title: "Пина Колада",
            image: "fixtures/pinacolada.jpg",
            recipe: "Смешайте ром, кокосовые сливки и ананасовый сок со льдом. Подайте в высоком бокале.",
            isPublished: false,
            ingredients: [
                { titleOfIngredient: "Белый ром", quantity: "50мл" },
                { titleOfIngredient: "Кокосовые сливки", quantity: "30мл" },
                { titleOfIngredient: "Ананасовый сок", quantity: "90мл" }
            ],
        },
        {
            user: Lazlo._id,
            title: "Лонг Айленд",
            image: "fixtures/longisland.jpg",
            recipe: "Смешайте водку, текилу, ром, джин, трипл сек и колу со льдом. Подавайте с лимоном.",
            isPublished: false,
            ingredients: [
                { titleOfIngredient: "Водка", quantity: "15мл" },
                { titleOfIngredient: "Текила", quantity: "15мл" },
                { titleOfIngredient: "Белый ром", quantity: "15мл" },
                { titleOfIngredient: "Джин", quantity: "15мл" },
                { titleOfIngredient: "Трипл сек", quantity: "15мл" },
                { titleOfIngredient: "Кола", quantity: "До верха" },
                { titleOfIngredient: "Лимон", quantity: "Долька" }
            ],
        },
        {
            user: Martin._id,
            title: "Дайкири",
            image: "fixtures/daiquirí.jpg",
            recipe: "Встряхните белый ром, сок лайма и сахарный сироп со льдом. Процедите в охлажденный бокал.",
            isPublished: false,
            ingredients: [
                { titleOfIngredient: "Белый ром", quantity: "50мл" },
                { titleOfIngredient: "Сок лайма", quantity: "25мл" },
                { titleOfIngredient: "Сахарный сироп", quantity: "15мл" }
            ],
        },
    )

    await db.close();

};

run().catch(console.error);