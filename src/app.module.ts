import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0000',
      database: 'INNERVIEWON',
      schema: 'INNERVIEWON',
      entities: [],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
