import usermodel from "../models/usermodel.js";
import { hashPassword, comparePassword } from "../helpers/authhelper.js";
export const registerController = async (req, res) => {
    try {
        const { username, name, email, password, phone } = req.body;
        if (!username) {
            return res.status(400).send({
                success: false,
                message: 'Username is required'
            });
        }
        if (!name) {
            return res.status(400).send({
                success: false,
                message: 'Name is required'
            });
        }
        if (!email) {
            return res.status(400).send({
                success: false,
                message: 'Email is required'
            });
        }
        if (!password) {
            return res.status(400).send({
                success: false,
                message: "Password is required"
            });
        }
        if (!phone) {
            return res.status(400).send({
                success: false,
                message: "Phone number is required",
            });
        }

        const hashed_password = await hashPassword(password);

        const exist_email = await usermodel.findOne({ email: email });
        if (exist_email) {
            return res.status(300).send({
                success: false,
                message: "user already exists"
            });
        }

        const exist_name = await usermodel.findOne({ username: username });
        if (exist_name) {
            return res.status(300).send({
                success: false,
                message: "username already exists"
            });
        }

        try {
            const user = await new usermodel({
                name: name,
                email: email,
                phone: phone,
                username: username,
                password: hashed_password,
            }).save();
            return res.status(200).send({
                success: true,
                message: "user registered successfully",
                user
            })
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: "Failed to create user",
                error: error,
            })
        }
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: "Error in register API",
            error: error,
        })
    }
}
