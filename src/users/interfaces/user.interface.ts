import { Document } from 'mongoose';

export interface User extends Document {
  readonly _id: string;
  name_prefix: string;

  readonly first_name: string;
  readonly last_name: string;
  readonly username: string;
  readonly date_of_birth: string;
}

export interface UserResponse extends User {
  name_prefix: string;
}
