function polls(parent, args, context, info) {
  return context.prisma.polls();
}
module.exports = {
  polls
};
