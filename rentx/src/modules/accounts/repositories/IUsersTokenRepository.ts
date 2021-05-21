import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UsersTokens } from "../infra/typeorm/entities/UsersTokens";

interface IUsersTokenRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UsersTokens>;
}

export { IUsersTokenRepository };
