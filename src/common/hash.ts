// const bcrypt = require('bcrypt');
import bcrypt from 'bcrypt'

const saltRounds = 10;

const hashFunc = async (password:string):Promise<string|Error> => {
    try {
        const hashedPass = await bcrypt.hash(password, saltRounds);
        return hashedPass;
    }catch(err) {
        console.log(err);
        return err;
    }
}

const compare = async (data:string, encrypted:string):Promise<Boolean|Error> => {
    try {
        const isValid = await bcrypt.compare(data, encrypted);
        return isValid;
    }catch(err) {
        console.log(err);
        return err;
    }
}
export { hashFunc, compare }
