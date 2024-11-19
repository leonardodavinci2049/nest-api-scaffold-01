import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as UuidV4 } from 'uuid';
@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    createUserDto.ID_UUID = UuidV4();
    return `{
      ID_UUID: ${createUserDto.ID_UUID},
      LOGIN : ${createUserDto.LOGIN},
      SENHA: ${createUserDto.SENHA}            
   }`;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
