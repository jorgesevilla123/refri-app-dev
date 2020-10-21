import Joi from "joi";


export const validation: any = {} 


//If cannot implement server-side validation implement joi again


validation.validateEmail = (email): boolean => {
    const emailReg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    return emailReg.test(String(email).toLowerCase());

}


validation.minPassword = (password: string): boolean => {
    return password.length >= 8;

}

validation.passwordMatches = (password: string, passwordConfirm : string): boolean => {
    console.log(password, passwordConfirm);
    return password == passwordConfirm;

}

