import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { LoginPayloadDTO } from './dto/inputs/login-payload.dto';
import { TokenType } from './types/token';
import { User } from './user.entity';
import { GraphQLError } from 'graphql';
import { ERROR_MESSAGES } from 'src/shared/errors/error-messages';
import { ERRORSTATUSCODE } from 'src/shared/errors/error-status-code.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  //LOGIN service
  async login(@Body() loginPayloadDTO: LoginPayloadDTO): Promise<TokenType> {
    try {
      const user = await this.userRepository.findOneBy({
        email: loginPayloadDTO.email,
        password: loginPayloadDTO.password,
      });
      const payload = {
        email: loginPayloadDTO.email,
      };
      const signedToken = jwt.sign(payload, 'logicon');
      const token = {
        id: user.id,
        jwt: signedToken,
        res: {
          status: 200,
          message: 'Logged-in',
        },
      };
      return token;
    } catch (error) {
      throw new GraphQLError(ERROR_MESSAGES.NOT_FOUND, {
        extensions: {
          code: ERRORSTATUSCODE.NOT_FOUND,
        },
      });
    }
  }
}
