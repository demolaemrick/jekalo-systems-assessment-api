import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: { type: String },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  date_of_birth: { type: String },
});
