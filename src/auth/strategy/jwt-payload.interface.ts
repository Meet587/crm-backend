import { UserRole } from "src/db/entities/user.entity";

export interface JwtPayload {
  id: number;
  email: string;
  role:UserRole
}
