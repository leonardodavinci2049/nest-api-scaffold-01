import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as UuidV4 } from 'uuid';

import { PrismaService } from 'src/core/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const offset = new Date().getTimezoneOffset() * 60000;
      createUserDto.createdAt = new Date(Date.now() - offset);
      createUserDto.updatedAt = new Date(Date.now() - offset);

      createUserDto.uuid = UuidV4();

      const password = await bcrypt.hash(createUserDto.password, 10);

      return await this.prisma.tbl_user.create({
        data: {
          uuid: createUserDto.uuid,
          name: createUserDto.name,
          password: password,
          createdAt: createUserDto.createdAt,
          updatedAt: createUserDto.updatedAt,
        },
        select: {
          id: true,
          uuid: true,
          name: true,
          password: true,
          // ROLE: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findAll() {
    // USING PRISMA

    try {
      return this.prisma.tbl_user.findMany({
        where: {
          name: {
            contains: 'o',
          },
        },
        take: 10,
        orderBy: {
          id: 'desc',
        },
        select: {
          id: true,
          uuid: true,
          name: true,
          password: true,
          // ROLE: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      console.log('CLOSED CONNECTION 1');
    }
  }

  async findOne(id: number) {
    //there is the option to use findFirst or findMany but findUnique is more performant

    if (!id) throw new NotFoundException(`User with id not found`);
    // console.log('id: ' + id);
    await this.userExists(id);

    //console.log('id3: ' + id);
    return this.prisma.tbl_user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        uuid: true,
        name: true,
        password: true,
        // ROLE: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: number, data: UpdateUserDto) {
    await this.userExists(id);

    // data.SENHA = await bcrypt.hash(SENHA, 10);

    return this.prisma.tbl_user.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async updatePartial(id: number, data: UpdateUserDto) {
    await this.userExists(id);

    if (data.name == null || data.name == '') {
      throw new NotFoundException('Name is required.');
    }

    return this.prisma.tbl_user.update({
      data: data,
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    await this.userExists(id);

    return this.prisma.tbl_user.delete({
      where: {
        id: id,
      },
    });
  }

  async userExists(id: number) {
    const user = await this.prisma.tbl_user.count({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User  id: ${id} not found.`);
    }
  }
}
