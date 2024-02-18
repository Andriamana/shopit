//Importe la bibliothèque mongoose qui est un ODM (Object Data Modeling) pour MongoDB,
// facilitant l'interaction avec la base de données MongoDB en utilisant des schémas et des modèles.
import mongoose from "mongoose";

//Définit un schéma pour les produits en utilisant la classe Schema fournie par mongoose.
// Cela spécifie la structure des données pour les objets produits dans la base de données.
const productSchema = new mongoose.Schema(
  {
    //name, price, description, ratings, images, category, seller, stock, numOfReviews, reviews, et user : 
    //Ce sont les différents champs du schéma qui définissent les propriétés des produits.

    //Required veut dire: Indique si le champ est obligatoire.
    name: {
      type: String,
      required: [true, "Please enter product name"],
      maxLength: [200, "Product name cannot exceed 200 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxLength: [5, "Product price cannot exceed 5 digits"],
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please enter product category"],
      enum: {
        values: [
          "Electronics",
          "Cameras",
          "Laptops",
          "Accessories",
          "Headphones",
          "Food",
          "Books",
          "Sports",
          "Outdoor",
          "Home",
        ],
        message: "Please select correct category",
      },
    },
    seller: {
      type: String,
      required: [true, "Please enter product seller"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },

  //Ajoute automatiquement deux champs supplémentaires à chaque document du modèle : createdAt et updatedAt. 
  //Ces champs stockent la date et l'heure de la création et de la dernière mise à jour du document.
  { timestamps: true }
);

//Crée un modèle MongoDB appelé "Product" en utilisant le schéma productSchema.
// Ce modèle peut être utilisé pour effectuer des opérations CRUD (Create, Read, Update, Delete) sur les documents associés aux produits dans la base de données.
export default mongoose.model("Product", productSchema);