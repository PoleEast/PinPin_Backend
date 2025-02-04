import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module.js';
import { fileURLToPath } from 'url';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (ConfigService: ConfigService) => ({
                //配置DB連線資料
                type: 'mysql',
                host: ConfigService.get('DB_HOST'),
                port: ConfigService.get('DB_PORT'),
                username: ConfigService.get('DB_USERNAME'),
                password: ConfigService.get('DB_PASSWORD'),
                database: ConfigService.get('DB_DATABASE'),
                entities: [fileURLToPath(import.meta.url) + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                logging: true,
            }),
            inject: [ConfigService],
        }),
        AuthModule,
    ],
})
export class AppModule {}
