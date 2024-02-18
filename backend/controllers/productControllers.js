import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/handleError.js";


// Get products => /api/v1/products.
//getProducts qui gère une requête HTTP GET pour récupérer tous les produits à partir d'une base de données.
//Le rôle de ce code est de fournir une API pour accéder aux données des produits
export const getProducts = catchAsyncErrors(async(req, res) => {
    const apiFilters = new APIFilters(Product, req.query).search();
    let products = await apiFilters.query;
    let filteredProductsCount = products.length

    res.status(200).json({
        filteredProductsCount,
        products,
    });

    /*Cette méthode recherche tous les produits dans la base de données
    const products = await Product.find();
    res.status(200).json({products}); */
}); 


// Create new product => /api/v1/admin/products.
export const newProduct = catchAsyncErrors(async (req,res) => {
    //utilise la méthode create() fournie par Mongoose pour créer un nouveau document 
    //dans la collection associée au modèle "Product"en fonction des données fournies dans req.body. 
    const product = await Product.create(req.body);
    res.status(200).json({ product});
});

// Get single product details => /api/v1/admin/products/:id
//ce code expose une route pour récupérer les détails d'un produit en fonction de son ID.
export const getProductDetails = catchAsyncErrors(async(req,res,next) => {
    const product = await Product.findById(req?.params?.id);
    if (!product){
        return next(new ErrorHandler("Product not found",404));
    }

    res.status(200).json({
        product,
    });

});
   
 
/** --------------------------------------------------------------------------------------------------
 * Update product details => /api/v1/admin/products/:id Met à jour un produit dans la base de données.
 * export const updateProduct = async (req,res) => {
    // Recherche le produit dans la base de données par son ID
    let product = await Product.findById(req?.params?.id);

     // Vérifie si le produit existe
    if(!product){
        return res.status(404).json({
            error: "Product not found",
        });
    }
    //// Met à jour le produit avec les données fournies dans la requête
    product = await Product.findByIdAndUpdate(req?.params?.id, req.body,{new: true});

        res.status(200).json({
            product,
      })
};
-------------------------------------------------------------------------------------------------------*/

/**
 * Met à jour un produit dans la base de données.
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Object} - Une réponse JSON contenant le produit mis à jour ou un message d'erreur si le produit n'est pas trouvé.
 */
export const updateProduct = catchAsyncErrors(async (req, res) => {
    try {
        // Recherche le produit dans la base de données par son ID
        let product = await Product.findById(req?.params?.id);

        // Vérifie si le produit existe
        if (!product) {
            return res.status(404).json({
                error: "Product not found",
            });
        }

        // Met à jour le produit avec les données fournies dans la requête
        product = await Product.findByIdAndUpdate(req?.params?.id, req.body, { new: true });

        // Envoie une réponse JSON avec le produit mis à jour
        res.status(200).json({
            product,
        });
    } catch (error) {
        // En cas d'erreur, renvoie une réponse avec un code d'erreur
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

//Delete product => /api/v1/products/:id
export const deleteProduct = catchAsyncErrors(async (req,res) =>{
    const product = await Product.findById(req?.params?.id);

    if(!product){
        return res.status(404).json({
            error: "Product not found",
        })
    }

    await product.deleteOne();

    res.status(200).json({
        message: "Product Deleted",
    });
});

