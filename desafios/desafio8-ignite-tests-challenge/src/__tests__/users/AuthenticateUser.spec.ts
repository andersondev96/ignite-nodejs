import { InMemoryUsersRepository } from "../../modules/users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { AuthenticateUserUseCase } from "../../modules/users/useCases/authenticateUser/AuthenticateUserUseCase"
import { IncorrectEmailOrPasswordError } from "../../modules/users/useCases/authenticateUser/IncorrectEmailOrPasswordError";
import { CreateUserUseCase } from "../../modules/users/useCases/createUser/CreateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User UseCase", () => {
  beforeEach(() => {
    inMemoryUsersRepository= new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
  });

  it("Should be able to authenticate an user with email and password", async () => {
    const user = { name: "New User", email: "test@test.com",  password: "12345" };

    await createUserUseCase.execute(user);

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
    expect(response.user).toEqual(
      expect.objectContaining({
        name: user.name,
        email: user.email,
      }),
    );
  });

  it('Should not be able to authenticate a user with email or password incorrect', async () => {
    const user = { name: "New User", email: "test@test.com",  password: "12345" };

    await createUserUseCase.execute(user);

   await expect(
     authenticateUserUseCase.execute({
       email: user.email,
       password: 'wrong_password',
     }),
   ).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
    });

    it('Should not be able to authenticate a user that does not exist', async () => {
      const user = { name: "New User", email: "test@test.com",  password: "12345" };

     await expect(
       authenticateUserUseCase.execute({
         email: user.email,
         password: 'wrong_password',
       }),
     ).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
      });
  })

