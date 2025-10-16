const Role = require("../src/models/role.model");

const seedRole = async () => {
  try {
    const roles = [
      { title: "author", key: "AUTHOR" },
      { title: "reviewer", key: "REVIEWER" },
      { title: "editor", key: "EDITOR" },
      { title: "Association author", key: "ASSOCIATION_AUTHOR" },
    ];

    const role = await Role.find();

    if (!role || role.length === 0) {
      await Role.insertMany(roles);
      console.log("Inserted all roles");
    } else {
      console.log("Roles already exist");
    }
  } catch (err) {
    console.error("Seeding error:", err);
  }
};

module.exports = seedRole;
