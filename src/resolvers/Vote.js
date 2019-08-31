function poll(parent, args, context) {
  return context.prisma.vote({ id: parent.id }).poll();
}

function user(parent, args, context) {
  return context.prisma.vote({ id: parent.id }).user();
}

module.exports = {
  poll,
  user
};
