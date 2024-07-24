import UserService from '../services/user.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

const tokenBlacklist: Set<string> = new Set();

class AuthService {
    public static async login(email: string, password: string) {
        const user = await UserService.getUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
    
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '48h' });
        return token;
    }

    public static async register(username: string, email: string, password: string): Promise<User> {
        console.log('Data to create user:', { username, email, password });

        const user = await UserService.getUserByEmail(email);
        if (user) {
            throw new Error('User already exists');
        }
        return await UserService.createUser({ username, email, password });
    }

    // Function to logout user
    public static async logout(token: string) {
        tokenBlacklist.add(token);
    }

    // Function to remove a token from the blacklist
    public static removeFromBlacklist(token: string) {
        tokenBlacklist.delete(token);
    }


    // Middleware to check if token is blacklisted
    public static isTokenBlacklisted(token: string): boolean {
        return tokenBlacklist.has(token);
    }
}

export default AuthService;
