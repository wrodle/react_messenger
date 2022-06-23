import jwt from 'jsonwebtoken';
import {reduce} from 'lodash';

interface ILoginData {
    email: string;
    password: string;
}

function createJWTToken(user: ILoginData) {
    const token = jwt.sign(
        {
            data: reduce(
                user,
                (result: any, value: string, key: string) => {
                    if (key !== "password") {
                        result[key] = value;
                    }
                    return result;
                },
                {}
            ),
        },
        process.env.JWT_SECRET || "",
        {
            expiresIn: 604800,
        }
    );

    return token;
}

export default createJWTToken;