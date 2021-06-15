const Mutation = {
  insertPeople(parent, args, { db }, info) {
    // console.log(args);

    const { ssn, name, severity } = args.data;

    const l_name = args.data.location.name;
    const l_des = args.data.location.description;

    var user = db.people.find((user) => user.ssn === ssn);
    console.log(user)
    if (user) {
      if (typeof user.name === 'string'){
        user.name = name;
      }
      if (typeof user.severity !== 'undefined'){
        user.severity= severity;
      }
      if (typeof user.location.name === 'string'){
              user.location.name = l_name;
      }
      if (typeof user.location.description === 'string'){
              user.location.description = l_des;
      }
       
      return true;
    } else {
      const uuser = {
        ...args.data,
      };
      db.people.push(uuser);
      return true;
    }
    return true;
  },
};

export { Mutation as default };
