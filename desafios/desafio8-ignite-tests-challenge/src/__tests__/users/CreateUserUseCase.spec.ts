import { InMemoryUsersRepository } from "../../modules/users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { CreateUserError } from "../../modules/users/useCases/createUser/CreateUserError";
import { CreateUserUseCase } from "../../modules/users/useCases/createUser/CreateUserUseCase";


let inMemoryUsersRepository: IUsersRepository;

let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "Name example",
      email: "mail@mail.com",
      password: "1234",
    });

    expect(user).toHaveProperty("id");
  })

  it("should not be possible to create a new user with an existing email", async () => {
    expect (async () => {
      await createUserUseCase.execute({
        name: "Name example",
        email: "mail@mail.com",
        password: "1234",
      });

      await createUserUseCase.execute({
        name: "Name example",
        email: "mail@mail.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(CreateUserError);
    });


  })

