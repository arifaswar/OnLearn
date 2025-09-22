import bcrypt from 'bcryptjs';

export const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10)
}
export const comparePassword = (password, DB_password) => {
    return bcrypt.compareSync(password, DB_password)
};