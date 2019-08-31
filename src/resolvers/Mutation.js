const { hashPassword, sign, comparePassword } = require("../utils");

async function signup(parent, args, context, info) {
  const password = await hashPassword(args.password);
  const user = await context.prisma.createUser({ ...args, password });
  const token = sign(user.id);
  return { token, user };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await comparePassword(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = sign(user.id);

  return { token, user };
}

module.exports = { signup, login };
