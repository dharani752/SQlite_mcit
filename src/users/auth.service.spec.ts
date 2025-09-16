import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { Users } from './users.entity';
describe('AuthService', () => {
  let service: AuthService;
  const mockuserService: Partial<UsersService> = {
    find: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockImplementation((email, password) =>
      Promise.resolve({
        id: 1,
        email: 'abc@gmail.com',
        password: '12345',
      } as Users),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockuserService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('it should return then hased password, email and id ', async () => {
    const user = await service.signup('abc@gmail.com', '123456');
    expect(user.password).not.toEqual('12345');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });
});
