// Importe le module Express.js pour la création d'une application web.
import express from "express";

//Importe la fonction getProducts depuis un fichier de contrôleurs (productControllers.js). 
//Les contrôleurs contiennent la logique métier associée aux routes.
import { deleteProduct, getProductDetails, getProducts, newProduct, updateProduct } from '../controllers/productControllers.js';

//Crée un routeur Express qui sera utilisé pour définir les routes de l'application.
const router = express.Router();

//Définit une route pour l'URL "/products" qui utilise la méthode HTTP GET.
// Lorsqu'un client accède à cette route, la fonction getProducts du contrôleur des produits sera appelée pour traiter la requête.

//méthodes HTTP (GET, POST, PUT, DELETE) 
router.route("/products").get(getProducts);
router.route("/admin/products").post(newProduct);
router.route("/products/:id").get(getProductDetails);
router.route("/products/:id").put(updateProduct);
router.route("/products/:id").delete(deleteProduct);


export default router;
