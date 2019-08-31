const { hashPassword, sign, comparePassword, getUserId } = require("../utils");

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

function createPoll(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createPoll({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  });
}

async function vote(parent, args, context, info) {
  const userId = getUserId(context);

  const [voteId] = await context.prisma
    .votes({
      where: {
        user: { id: userId },
        poll: { id: args.pollId }
      }
    })
    .id();

  if (voteId != null) {
    return context.prisma.updateVote({
      where: voteId,
      data: {
        dificulty: args.dificulty
      }
    });
  } else {
    return context.prisma.createVote({
      user: { connect: { id: userId } },
      poll: { connect: { id: args.pollId } },
      dificulty: args.dificulty
    });
  }
}

module.exports = {
  signup,
  login,
  createPoll,
  vote
};
