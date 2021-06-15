const Mutation = {
  insertPeople(parent, args, { db }, info) {
    console.log(args);

    const { ssn, name, severity } = args;

    const l_name = args.data.location.name;
    const l_des = args.data.location.description;

    const user = db.people.find((user) => user.ssn === ssn);
    console.log(user);
    if (user) {
      user.name = name;
      user.severity = severity;
      user.location.name = l_name;
      user.location.description = l_des;
      return true;
    } else {
      const user = {
        ...args.data,
      };
      db.people.push(user);
    }
    return true;
  },
};

export { Mutation as default };
