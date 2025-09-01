import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private repo: Repository<Users>) {}
  async create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return await this.repo.save(user);
  }
  findone(id: number) {
    const user = this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  find(email: string) {
    console.log('find all users', email);
    return this.repo.find({ where: { email } });
  }
  async update(id: number, attrs: Partial<Users>) {
    // update only the partial  properties of the users  not all
    const user1 = await this.repo.findOne({ where: { id } });
    if (!user1) {
      throw new Error(' user not found');
    }
    Object.assign(user1, attrs); // copies the  properties of the attrs to the user1 and update it
    return this.repo.save(user1); // it will say the users1 with the save function
  }
  async remove(id: number) {
    const user1 = await this.repo.findOne({ where: { id } });
    if (!user1) {
      throw new Error(' user not found');
    }
    this.repo.remove(user1);
  }
}
