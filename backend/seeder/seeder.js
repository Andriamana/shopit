//SEEDER.JS SERT A PEUPLER UNE BASE DE DONNEES AVEC DES DONNEES DE PRODUITS

import mongoose from "mongoose";
import products from "./data.js";

//import de la modèle de données des produits
import Product from "../models/product.js";

//une fonction asynchrone seedProducts() pour gérer le processus de peuplement de la base de données.
const seedProducts = async () => {
    try {
        //Connexion à la base de données MongoDB 
        await mongoose.connect("mongodb://127.0.0.1:27017/shopit-v2");

        //Suppression de tous les produits existants de la collection Product
        await Product.deleteMany();
        console.log("Products are deleted");

        //Insertion de nouveaux produits à partir du tableau products dans la collection Product
        await Product.insertMany(products);
        console.log("Products are added");
        process.exit();
          
    } catch (error) {
        console.log("boooom");
        process.exit();

    }
}

seedProducts();
//a fonction seedProducts est un "seeder" qui insère des données de produits dans une base de données MongoDB. 
//Cela permet d'initialiser la base de données avec des données de test ou des données par défaut pour l'application.