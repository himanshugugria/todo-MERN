class ApiError extends Error {
    constructor(
        statusCode,
        messsage = "something went wrong!",
        error = [],
        stack ="",
    ){
        super(message)
        this.statusCode =statusCode
        this.error = error
        this.message = messsage
        this.stack = stack
        this.success = false
        this.data = null
    }
}

export {ApiError}