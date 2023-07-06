import bcrypt from 'bcrypt';

export function cryptPassword(password: string) {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, SALT);
}

export function comparePasswords(rawPassword: string, hash: string) {
  //https://www.youtube.com/watch?v=i1-5eahxrgo&ab_channel=AnsontheDeveloper
  return bcrypt.compareSync(rawPassword, hash);
}
