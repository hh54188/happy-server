const createResolvers = models => ({
  Query: {
    users(root) {
      return [
        {
          id: "liguangyi",
          name: "liguangyi"
        }
      ];
    }
  }
});

module.exports = createResolvers;
