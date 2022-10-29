import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

const UseRepositories = (entities?: EntityClassOrSchema[]) =>
  TypeOrmModule.forFeature(entities);

export default UseRepositories;
