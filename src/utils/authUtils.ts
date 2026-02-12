import bcrypt from "bcrypt";

export const hashPw = async (password:string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt);
    return hashedPw;
}
