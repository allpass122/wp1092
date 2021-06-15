const Query = {
  persons(parent, args, { db }, info) {
    // console.log(args);
    if (args.severity === null) {
      // console.log(args.severity);
      return db.people;
    }

    let f1 = db.people.filter((user) => {
      // console.log(args.locationKeywords);
      // console.log(user.location.description);
      return user.location.description.includes(args.locationKeywords);
    });

    let f2 = f1.filter((user) => {
      return user.severity >= args.severity;
    });
    return f2;
  },
};

export { Query as default };
