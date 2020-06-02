import { UsersEntity } from './user.entity';
import { LoginDTO } from '../auth/auth.dto';
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { User } from './user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  private sanitizeUser(user: UsersEntity) {
    delete user.password;
    delete user.id;
    delete user.created;
    return user;
  }

  async create(newUser: User) {
    const { email } = newUser;
    const user = await this.userRepository.findOne({ email });

    if (user) {
      Logger.log('User Exists');
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hashed = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashed;
    const createdUser = await this.userRepository.create(newUser);
    await this.userRepository.save(createdUser);
    return this.sanitizeUser(createdUser);
  }

  async findByLogin(userDTO: LoginDTO) {
    const { email, password } = userDTO;
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      Logger.log('Invalid credentials');
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      Logger.log('Invalid credentials');
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async updateUserRefreshCount(userDto: UsersEntity) {
    userDto.refreshCount++;
    await this.userRepository.update(userDto.id, userDto);
    return this.findByEmail(userDto.email);
  }

  async findByEmail(email: any) {
    return await this.userRepository.findOne({ email });
  }
}
