/**
 * ErrorHandler est un outil puissant pour la gestion des erreurs 
 * dans une application backend, offrant une manière structurée 
 * et efficace de gérer, personnaliser et signaler les erreurs 
 * tout en facilitant le débogage et la maintenance du code.
 */
class ErrorHandler extends Error {
    constructor (message, statusCode) {
        super (message)
        this.statusCode = statusCode;

        //Create stack property
        Error.captureStackTrace(this, this.constructor);
    }
}
export default ErrorHandler