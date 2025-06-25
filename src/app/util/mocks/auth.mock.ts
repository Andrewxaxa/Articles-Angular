import {
  ILoginPayload,
  ISignupPayload,
  IUser,
} from '../../auth/user.interface';

export const loginPayloadMock: ILoginPayload = {
  email: 'test@example.com',
  password: 'password123',
};

export const signupPayloadMock: ISignupPayload = {
  username: 'tester',
  email: 'tester@example.com',
  password: 'strongpassword',
};

export const userMock: IUser = {
  uid: 'user1',
  email: 'test@test.com',
  username: 'testUser',
};
