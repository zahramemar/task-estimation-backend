function polls(parent, args, context) {
  return context.prisma.user({ id: parent.id }).polls();
}

module.exports = {
  polls
};
