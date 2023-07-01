export function notFoundError(item?:string) {
    return {
      type: "NotFoundError",
      message: `${item ? item : "It"} was not found`
    }
  }
  
  export function conflictError(item?:string) {
    return {
      type: "ConflictError",
      message: `${item ? item : "It"} already exists!`
    }
  }
  export function unauthorizedError(item?:string) {
    return {
      type: "UnauthorizedError",
      message: `${item ? item : ""} Access Unauthorized!`
    }
  }
  export function UnprocessableEntityError(item?:string[]|string) {
    return {
      type: "UnprocessableEntity",
      message: item ? item : "Unprocessable Entity!"
    }
  }


  const errorCase = {
    notFoundError,
    conflictError,
    unauthorizedError,
    UnprocessableEntityError
  }
  export default errorCase;