function newPollSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.poll({ mutation_in: ["CREATED"] }).node();
}

const newPoll = {
  subscribe: newPollSubscribe,
  resolve: payload => {
    return payload;
  }
};

function newVoteSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe
    .vote({ mutation_in: ["CREATED", "UPDATED"] })
    .node();
}

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: payload => {
    return payload;
  }
};

module.exports = {
  newPoll,
  newVote
};
