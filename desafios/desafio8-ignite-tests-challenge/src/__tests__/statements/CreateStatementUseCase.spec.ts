import { InMemoryStatementsRepository } from "../../modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { InMemoryUsersRepository } from "../../modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateStatementUseCase } from "../../modules/statements/useCases/createStatement/CreateStatementUseCase";
import { CreateUserUseCase } from "../../modules/users/useCases/createUser/CreateUserUseCase";
import { ICreateStatementDTO } from "../../modules/statements/useCases/createStatement/ICreateStatementDTO";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;

describe("Deposit balance use case", () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    createStatementUseCase = new CreateStatementUseCase(
        inMemoryUsersRepository,
        inMemoryStatementsRepository
    );
  });

  it("Should be able possible to make a deposit", async () => {

    const user = await createUserUseCase.execute({
      name: "User test",
      email: "user@test.com",
      password: "12345"
    });

    const statement = {
      user_id: user.id,
      type: "deposit",
      amount: 100,
      description: "description"
    } as ICreateStatementDTO;

    const response = await createStatementUseCase.execute(statement);

    expect(response).toHaveProperty("id")

  })
  })
