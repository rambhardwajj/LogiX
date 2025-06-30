export class CustomError extends Error {
    data:any;
    success: boolean;

    constructor(  public code: number, message: string,){
        super(message);
        this.success = false
        this.data = null;
        this.name = "Custom Error"
        Error.captureStackTrace(this, this.constructor)
    }
}