function polls(parent, args, context, info) {
  return context.prisma.polls();
}

function poll(parent, { id }, context, info) {
  return context.prisma.poll({ id });
}

module.exports = { polls, poll };
