class ApiError extends Error {
    constructor(
        statusCode,
        message = "something went wrong!",
        error = [],
        stack ="",
    ){
        super(message)
        this.statusCode =statusCode
        this.error = error
        this.message = message
        this.stack = stack
        this.success = false
        this.data = null
    }
}

export {ApiError}