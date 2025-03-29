import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';

export interface BaseInterfacerepository<T> {
  save(data: DeepPartial<T>): Promise<T>;
  saveMany(data: DeepPartial<T[]>): Promise<T[]>;
  create(data: DeepPartial<T>): T;
  createMany(data: DeepPartial<T[]>): T[];
  findByCondition(filterCondition: FindOneOptions<T>): Promise<T>;
  findOneById(id: any): Promise<T>;
  findWithRelations(relations: FindManyOptions<T>): Promise<T[]>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  remove(data: T): Promise<T>;
}
