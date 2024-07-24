import { Request } from 'express';
import User from '../models/user.model';

export interface UserRequest extends Request {
    user: User;
}