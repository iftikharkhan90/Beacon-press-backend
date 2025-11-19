const Role = require("../src/models/role.model");

const seedRole = async () => {
  try {
    const roles = [
      { title: "Author", key: "AUTHOR" },
      { title: "Reviewer", key: "REVIEWER" },
      { title: "Editor", key: "EDITOR" },
      { title: "Association Editor", key: "ASSOCIATION_EDITOR" },
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
