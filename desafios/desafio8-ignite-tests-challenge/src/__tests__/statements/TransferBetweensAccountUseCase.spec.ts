import { InMemoryStatementsRepository } from "../../modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { InMemoryUsersRepository } from "../../modules/users/repositories/in-memory/InMemoryUsersRepository";
import { TransferBetweenAccountsUseCase } from "../../modules/statements/useCases/transferBetweenAccounts/TransferBetweenAccountsUseCase";
import { OperationType } from "../../modules/statements/entities/Statement";
import { TransferBetweenAccountsError } from "../../modules/statements/useCases/transferBetweenAccounts/TransferBetweenAccountError";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let transferBetweenAccountsUseCase: TransferBetweenAccountsUseCase;

describe("Get balance use case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    transferBetweenAccountsUseCase = new TransferBetweenAccountsUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
  });

  it("Should be able to make an transfer between accounts", async () => {
    const sender = await inMemoryUsersRepository.create({
      name: "Anderson",
      email: "anderson@test.com",
      password: "1234",
    });

    await inMemoryStatementsRepository.create({
      user_id: String(sender.id),
      description:"Deposit",
      amount: 500,
      type: OperationType.DEPOSIT,
    });

    const recipient = await inMemoryUsersRepository.create({
      name: "Trevor Allen",
      email: "ebaveju@ojo.io",
      password: "8646",
    });

    const transfer = await transferBetweenAccountsUseCase.execute({
      sender_id: String(sender.id),
      user_id: String(recipient.id),
      amount: 400,
      description: "test",
    });

    expect(transfer).toHaveProperty("id");
    expect(transfer.sender_id).toBe(sender.id);
    expect(transfer.user_id).toBe(recipient.id);
    expect(transfer.amount).toBe(400);
  })
});
