/**cette fonction connectDatabase permet de se connecter à une base de données MongoDB en utilisant Mongoose,
 *  en fonction de l'environnement dans lequel l'application est exécutée (développement ou production),
 *  en utilisant des URI de base de données différents.
 * 
 */
import mongoose from "mongoose";

//définit une fonction nommée connectDatabase et l'exporte pour qu'elle puisse être utilisée dans d'autres fichiers.
export const connectDatabase = () => {

    //Cette variable sera utilisée pour stocker l'URI de la base de données à laquelle se connecter.
    let DB_URI = "";

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        DB_URI = process.env.DB_LOCAL_URI;  
    } else if (process.env.NODE_ENV === 'PRODUCTION') {
        DB_URI = process.env.DB_URI
    }

    mongoose.connect(DB_URI).then((con) => {
        console.log(`MongoDB Database connected with HOST: ${con.connection?.host}`);
    });
}