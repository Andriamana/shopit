/**
 * Ce middleware est conçu pour intercepter les erreurs survenues dans les routes 
 * de l'application Express et renvoyer une réponse appropriée au client,
 * avec un statut de code et un message d'erreur précis.
 */

import ErrorHandler from '../utils/handleError.js';
export default (err, req, res, next) => {
    let error = {
        statusCode: err?.statusCode || 500,
        message: err?.message || "Internal Server Error"
    };

    //Handle Invalid Mongoose ID Error
    if(err.name === 'CastError'){
        const message = `Resource not found. Invalid: ${err?.path}`
        error = new ErrorHandler(message, 404); 
    }

    //Handle Validatoin Error
    if 
    (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((value) => value.message)
        error = new ErrorHandler(message, 404);
    }

   if(process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(error.statusCode).json({
        message: error.message,
        error: err,
        stack: err?.stack,
    });
   }

   if(process.env.NODE_ENV ==="PRODUCTION") {
    res.status(error.statusCode).json({
        message: error.message,
    });
   }
};
