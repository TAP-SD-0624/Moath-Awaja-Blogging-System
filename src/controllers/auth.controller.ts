import { Request, Response } from "express";
import AuthService from "../services/auth.service";

class AuthController {
    public static  async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const token = await AuthService.login(email, password);
            res.status(200).json({ token });
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    }

    public static async register(req: Request, res: Response) {
        const {username, email, password } = req.body;
        try {
            await AuthService.register(username ,email, password);
            res.status(200).json({ message: 'User created' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public static  async logout(req: Request, res: Response) {
        const token = req.headers.authorization?.split(' ')[1];
        try {
            if (token) {
                await AuthService.logout(token);
                res.status(200).json({ message: 'Logged out' });
            } else {
                throw new Error('Token is undefined');
            }
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
export default AuthController;