import UserService from '../../src/services/user.service';
import User from '../../src/models/user.model';

jest.mock('../../src/models/user.model', () => {
  return {
    create: jest.fn(),
    findOne: jest.fn(),
    findByPk: jest.fn(), 
    destroy: jest.fn(),
  };
});

describe('UserService', () => {
  it('should create a new user', async () => {
    const user = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
    };

    (User.create as jest.Mock).mockResolvedValue(user);

    const result = await UserService.createUser(user);
    expect(result).toEqual(user);
  });

  it('should find a user by email', async () => {
    const user = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
    };

    (User.findOne as jest.Mock).mockResolvedValue(user);

    const result = await UserService.getUserByEmail('test@example.com');
    expect(result).toEqual(user);
  });

  it('should find a user by id', async () => {
    const user = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
    };

    (User.findByPk as jest.Mock).mockResolvedValue(user);

    const result = await UserService.getUserById(1);
    expect(result).toEqual(user);
  });

  it('should update a user', async () => {
    const user = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
    };

    const updatedUser = {
      ...user,
      username: 'updateduser',
    };

    (User.findByPk as jest.Mock).mockResolvedValue({
      ...user,
      update: jest.fn().mockResolvedValue(updatedUser),
    });

    const result = await UserService.updateUser(1, { username: 'updateduser' });
    expect(result).toEqual(updatedUser);
  });

  it('should delete a user', async () => {
    (User.destroy as jest.Mock).mockResolvedValue(1);

    const result = await UserService.deleteUser(1);
    expect(result).toEqual(1);
  });
});
