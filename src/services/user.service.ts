import User from '../models/user.model';

class UserService {

    public static async createUser(data: Partial<User>): Promise<User> {
        console.log('Data to create user:', data);
        return await User.create(data);
    }

    public static async getUserByEmail(email: string): Promise<User | null> {
        console.log('Email to find user:', email);
        return await User.findOne({ where: { email } });
    }
    public static async getUsers(): Promise<User[]> {
        return await User.findAll();
    }

    public static async getUserById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    }

    public static async updateUser(id: number, data: Partial<User>): Promise<User | null> {
        const user = await User.findByPk(id);
        if (user) {
            await user.update(data);
            return user;
        }
        return null;
    }

    public static async deleteUser(id: number): Promise<number> {
        return await User.destroy({
            where: { id }
        });
    }

    public static async getUser(key: 'email' | 'username', value: string): Promise<User | null> {
        return await User.findOne({ where: { [key]: value } });
    }


    public static async verifyUser(email: string, password: string): Promise<User | null> {
        const user = await User.findOne({ where: { email } });
        if (user && await user.validPassword(password)) {
            return user;
        }
        return null;
    }

}

export default UserService;
