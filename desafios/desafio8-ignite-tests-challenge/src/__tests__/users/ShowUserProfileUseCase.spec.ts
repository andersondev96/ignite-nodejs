import { InMemoryUsersRepository } from "../../modules/users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { ShowUserProfileError } from "../../modules/users/useCases/showUserProfile/ShowUserProfileError";
import { ShowUserProfileUseCase } from "../../modules/users/useCases/showUserProfile/ShowUserProfileUseCase"

let inMemoryUsersRepository: IUsersRepository;

let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Show User Profile UseCase", () => {
  beforeEach(() => {
    inMemoryUsersRepository= new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository);
  });

  it("Should be able show user profile by user_id", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "New User",
      email: "test@test.com",
      password: "12345"
    });

    const response = await showUserProfileUseCase.execute(user.id!);

    expect(response).toEqual(user);
  });

  it("Should be able to show user profile by user_id if the user does exist", async () => {
    await expect(
      showUserProfileUseCase.execute('non_existent_id'),
    ).rejects.toBeInstanceOf(ShowUserProfileError);
  } )
})
