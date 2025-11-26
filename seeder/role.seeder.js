const Role = require("../src/models/role.model");

const seedRole = async () => {
  try {
    const roles = [
      { title: "Author", key: "AUTHOR" },
      { title: "Reviewer", key: "REVIEWER" },
      { title: "Editor", key: "EDITOR" },
      { title: "Association Editor", key: "ASSOCIATION_EDITOR" },
      { title: "Editor in Chief", key: "EDITOR IN CHIEF" },
      { title: "Editorial Board Member", key: "EDITORIAL BOARD MEMBER" },
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
