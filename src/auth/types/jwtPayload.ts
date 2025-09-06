import { UserStatus } from 'generated/prisma';

export type JwtPayload = {
  sub: string; // subject
  username: string;
  status: UserStatus;
};
