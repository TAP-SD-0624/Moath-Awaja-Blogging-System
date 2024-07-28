import { Request, Response } from 'express';
import UserService from '../services/user.service';
import bcrypt from 'bcrypt';

class UserController {

    // Controller to create a user
    public static async createUserController(req: Request, res: Response) {
        try {
            console.log('Request body:', req.body);
            const user = await UserService.createUser(req.body);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }
    // Controller to get all users
    public static async getUsersController(req: Request, res: Response) {
        try {
            const users = await UserService.getUsers();
            const usersWithoutPassword = users.map(user => {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });
            return res.status(200).json(usersWithoutPassword);
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }
    
    // Controller to get a user by Id
    public static async getUserByIdController(req: Request, res: Response) {
        try {
            const user = await UserService.getUserById(Number(req.params.id));
            if (user) {
                return res.status(200).json(user);
            }
            return res.status(404).json({ error: 'User not found' });
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }

    // Controller to update a user
    public static async updateUserController(req: Request, res: Response) {
        try {
            const { password, ...rest } = req.body;
            if (password) {
                req.body.password = await bcrypt.hash(password, 10);
            }
            const user = await UserService.updateUser(Number(req.params.id), rest);
            if (user) {
                return res.status(200).json(user);
            }
            return res.status(404).json({ error: 'User not found' });
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }
    

    // Controller to delete a user
    public static async deleteUserController(req: Request, res: Response) {
        try {
            const deleted = await UserService.deleteUser(Number(req.params.id));
            if (deleted) {
                return res.status(204).send();
            }
            return res.status(404).json({ error: 'User not found' });
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }

    // Controller to get a user by email
    public static async getUserByNameOrEmailController(req: Request, res: Response, key: 'email' | 'username') {
        try {
            const value = req.params[key];
            const user = await UserService.getUser(key, value);
            if (user) {
                return res.status(200).json(user);
            }
            return res.status(404).json({ error: 'User not found' });
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }

    // Controller to verify a user
    public static async verifyUserController(req: Request, res: Response) {
        try {
            const user = await UserService.verifyUser(req.body.email, req.body.password);
            if (user) {
                return res.status(200).json(user);
            }
            return res.status(404).json({ error: 'User not found' });
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }
}

export default UserController;
