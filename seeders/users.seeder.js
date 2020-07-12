/* eslint-disable no-await-in-loop */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import faker from 'faker';
import { customAlphabet } from 'nanoid';
import { Seeder } from 'mongoose-data-seed';
import { User, Image, Area, Personality, Hobby } from '../src/models';

const dataUser = [
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 18,
    hobbies:
      '607408e751389243ef3128f6,607408e751389243ef3128f7,607408e751389243ef3128f8',
    personalities:
      '607408e751389243ef3128a4,607408e751389243ef3128a5,607408e751389243ef3128a6,607408e751389243ef3128a7',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 19,
    hobbies:
      '607408e751389243ef3128f6,607408e751389243ef3128f7,607408e751389243ef3128f8',
    personalities:
      '607408e751389243ef3128a4,607408e751389243ef3128a5,607408e751389243ef3128a6,607408e751389243ef3128a7',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 20,
    hobbies:
      '607408e751389243ef3128f6,607408e751389243ef3128f7,607408e751389243ef3128f8',
    personalities:
      '607408e751389243ef3128a4,607408e751389243ef3128a5,607408e751389243ef3128a6,607408e751389243ef3128a7',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 21,
    hobbies:
      '607408e751389243ef3128f6,607408e751389243ef3128f7,607408e751389243ef3128f8',
    personalities:
      '607408e751389243ef3128a4,607408e751389243ef3128a5,607408e751389243ef3128a6,607408e751389243ef3128a7',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 18,
    hobbies:
      '607408e751389243ef3128f6,607408e751389243ef3128f7,607408e751389243ef3128f8',
    personalities:
      '607408e751389243ef3128a4,607408e751389243ef3128a5,607408e751389243ef3128a6,607408e751389243ef3128a7',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 19,
    hobbies:
      '607408e751389243ef3128f6,607408e751389243ef3128f7,607408e751389243ef3128f8',
    personalities:
      '607408e751389243ef3128a4,607408e751389243ef3128a5,607408e751389243ef3128a6,607408e751389243ef3128a7',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 20,
    hobbies:
      '607408e751389243ef3128f6,607408e751389243ef3128f7,607408e751389243ef3128f8',
    personalities:
      '607408e751389243ef3128a4,607408e751389243ef3128a5,607408e751389243ef3128a6,607408e751389243ef3128a7',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 21,
    hobbies:
      '607408e751389243ef3128f6,607408e751389243ef3128f7,607408e751389243ef3128f8',
    personalities:
      '607408e751389243ef3128a4,607408e751389243ef3128a5,607408e751389243ef3128a6,607408e751389243ef3128a7',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 18,
    hobbies:
      '607408e751389243ef3128f6,607408e751389243ef3128f7,607408e751389243ef3128f8',
    personalities:
      '607408e751389243ef3128a8,607408e751389243ef3128a9,607408e751389243ef3128aa',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 19,
    hobbies:
      '607408e751389243ef3128f6,607408e751389243ef3128f7,607408e751389243ef3128f8',
    personalities:
      '607408e751389243ef3128a8,607408e751389243ef3128a9,607408e751389243ef3128aa',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 20,
    hobbies:
      '607408e751389243ef3128f6,607408e751389243ef3128f7,607408e751389243ef3128f8',
    personalities:
      '607408e751389243ef3128a8,607408e751389243ef3128a9,607408e751389243ef3128aa',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 21,
    hobbies:
      '607408e751389243ef3128f6,607408e751389243ef3128f7,607408e751389243ef3128f8',
    personalities:
      '607408e751389243ef3128a8,607408e751389243ef3128a9,607408e751389243ef3128aa',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 18,
    hobbies:
      '607408e751389243ef3128f6,607408e751389243ef3128f7,607408e751389243ef3128f8',
    personalities:
      '607408e751389243ef3128a8,607408e751389243ef3128a9,607408e751389243ef3128aa',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 19,
    hobbies:
      '607408e751389243ef3128f6,607408e751389243ef3128f7,607408e751389243ef3128f8',
    personalities:
      '607408e751389243ef3128a8,607408e751389243ef3128a9,607408e751389243ef3128aa',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 20,
    hobbies:
      '607408e751389243ef3128f6,607408e751389243ef3128f7,607408e751389243ef3128f8',
    personalities:
      '607408e751389243ef3128a8,607408e751389243ef3128a9,607408e751389243ef3128aa',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 21,
    hobbies:
      '607408e751389243ef3128f6,607408e751389243ef3128f7,607408e751389243ef3128f8',
    personalities:
      '607408e751389243ef3128a8,607408e751389243ef3128a9,607408e751389243ef3128aa',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 18,
    hobbies:
      '607408e751389243ef3128f6,607408e751389243ef3128f7,607408e751389243ef3128f8',
    personalities: '607408e751389243ef3128c1',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 19,
    hobbies:
      '607408e751389243ef3128f6,607408e751389243ef3128f7,607408e751389243ef3128f8',
    personalities: '607408e751389243ef3128c1',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 20,
    hobbies: '607408e751389243ef3128f9,607408e751389243ef3128fa',
    personalities: '607408e751389243ef3128c1',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c2',
    gender: 'female',
    age: 21,
    hobbies: '607408e751389243ef3128f9,607408e751389243ef3128fa',
    personalities: '607408e751389243ef3128c1',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c3',
    gender: 'female',
    age: 18,
    hobbies: '607408e751389243ef3128f9,607408e751389243ef3128fa',
    personalities: '607408e751389243ef3128c1',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c3',
    gender: 'female',
    age: 19,
    hobbies: '607408e751389243ef3128f9,607408e751389243ef3128fa',
    personalities: '607408e751389243ef3128c1',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c3',
    gender: 'female',
    age: 20,
    hobbies: '607408e751389243ef3128f9,607408e751389243ef3128fa',
    personalities: '607408e751389243ef3128c1',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c3',
    gender: 'female',
    age: 20,
    hobbies: '607408e751389243ef3128f9,607408e751389243ef3128fa',
    personalities: '607408e751389243ef3128c1',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c3',
    gender: 'female',
    age: 18,
    hobbies: '607408e751389243ef3128f9,607408e751389243ef3128fa',
    personalities: '607408e751389243ef3128bb',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c3',
    gender: 'female',
    age: 19,
    hobbies: '607408e751389243ef3128f9,607408e751389243ef3128fa',
    personalities:
      '607408e751389243ef3128bc,607408e751389243ef3128bd,607408e751389243ef3128be',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c3',
    gender: 'female',
    age: 20,
    hobbies: '607408e751389243ef3128f9,607408e751389243ef3128fa',
    personalities:
      '607408e751389243ef3128bc,607408e751389243ef3128bd,607408e751389243ef3128be',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128c3',
    gender: 'female',
    age: 21,
    hobbies: '607408e751389243ef3128f9,607408e751389243ef3128fa',
    personalities:
      '607408e751389243ef3128bc,607408e751389243ef3128bd,607408e751389243ef3128be',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128ca',
    gender: 'female',
    age: 44,
    hobbies: '607408e751389243ef3128f9,607408e751389243ef3128fa',
    personalities:
      '607408e751389243ef3128bc,607408e751389243ef3128bd,607408e751389243ef3128be',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128ca',
    gender: 'female',
    age: 44,
    hobbies: '607408e751389243ef3128fb,607408e751389243ef3128fc',
    personalities:
      '607408e751389243ef3128bc,607408e751389243ef3128bd,607408e751389243ef3128be',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128ca',
    gender: 'female',
    age: 44,
    hobbies: '607408e751389243ef3128fb,607408e751389243ef3128fc',
    personalities:
      '607408e751389243ef3128bc,607408e751389243ef3128bd,607408e751389243ef3128be',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128ca',
    gender: 'female',
    age: 44,
    hobbies: '607408e751389243ef3128fb,607408e751389243ef3128fc',
    personalities:
      '607408e751389243ef3128bc,607408e751389243ef3128bd,607408e751389243ef3128be',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128ca',
    gender: 'female',
    age: 44,
    hobbies: '607408e751389243ef3128fb,607408e751389243ef3128fc',
    personalities:
      '607408e751389243ef3128bc,607408e751389243ef3128bd,607408e751389243ef3128be',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128ca',
    gender: 'female',
    age: 44,
    hobbies: '607408e751389243ef3128fb,607408e751389243ef3128fc',
    personalities:
      '607408e751389243ef3128bc,607408e751389243ef3128bd,607408e751389243ef3128be',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
  {
    nickname: faker.name.findName(),
    area: '607408e751389243ef3128ca',
    gender: 'female',
    age: 44,
    hobbies: '607408e751389243ef3128fb,607408e751389243ef3128fc',
    personalities:
      '607408e751389243ef3128bc,607408e751389243ef3128bd,607408e751389243ef3128be',
    description: faker.commerce.productDescription(),
    isUseCode: true,
    isRegisterProfile: true,
    code: '',
    lovePoint: parseInt(Math.random() * (5 - 0), 10),
    intellectPoint: parseInt(Math.random() * (5 - 0), 10),
    spiritPoint: parseInt(Math.random() * (5 - 0), 10),
    responsibilityPoint: parseInt(Math.random() * (5 - 0), 10),
    innocencePoint: parseInt(Math.random() * (5 - 0), 10),
  },
];

class UserSeeder extends Seeder {
  async shouldRun() {
    // return User.countDocuments()
    //   .exec()
    //   .then(count => count === 0);
    return true;
  }

  async run() {
    const images = await Image.find().select('_id imageLink');
    const areas = await Area.find();
    const personalities = await Personality.find();
    const hobbies = await Hobby.find();

    const createData = [];
    const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 6);

    for (let j = 0; j < dataUser.length; j++) {
      const avatars = _.sampleSize(images, 2);
      const user = dataUser[j];
      createData.push({
        ...user,
        code: nanoid(),
        nickname: `${user.nickname}-${0}${j}`,
        // avatars: avatars.map(avatar => avatar._id),
        // defaultAvatar: avatars[0].imageLink,
        avatars: ["605d4771432ff07aeb467a84","605d48a39ffedb08f496a61a","605d48b79ffedb08f496a61b"],
        defaultAvatar: "http://placehold.it/300x300",
        area: _.sampleSize(areas, 1)[0]._id,
        hobbies: _.sampleSize(hobbies, 3)
          .map(h => h._id)
          .toString(),
        personalities: _.sampleSize(personalities, 3)
          .map(h => h._id)
          .toString(),
        userID: uuidv4(),
      });
    }
    await User.insertMany(createData);

    // const userNotCode01 = [];
    // for (let z = 0; z < 5; z++) {
    //   userNotCode01.push({
    //     code: nanoid(),
    //   });
    // }
    // const userNotCode0101 = [];
    // for (let z = 0; z < 50000; z++) {
    //   userNotCode0101.push({
    //     code: nanoid(),
    //   });
    // }

    // const userNotCode02 = [];
    // for (let z = 0; z < 50000; z++) {
    //   userNotCode02.push({
    //     code: nanoid(),
    //   });
    // }
    // const userNotCode0202 = [];
    // for (let z = 0; z < 50000; z++) {
    //   userNotCode0202.push({
    //     code: nanoid(),
    //   });
    // }

    // const userNotCode03 = [];
    // for (let z = 0; z < 50000; z++) {
    //   userNotCode03.push({
    //     code: nanoid(),
    //   });
    // }
    // const userNotCode0303 = [];
    // for (let z = 0; z < 50000; z++) {
    //   userNotCode0303.push({
    //     code: nanoid(),
    //   });
    // }

    await Promise.all([
      // User.insertMany(userNotCode01),
      // User.insertMany(userNotCode02),
      // User.insertMany(userNotCode03),
      // User.insertMany(userNotCode0101),
      // User.insertMany(userNotCode0202),
      // User.insertMany(userNotCode0303),
    ]);
  }
}

export default UserSeeder;
