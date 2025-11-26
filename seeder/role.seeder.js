const Role = require("../src/models/role.model");

const seedRole = async () => {
  try {
    const roles = [
      { title: "Author", key: "author" },
      { title: "Reviewer", key: "reviewer" },
      { title: "Editor", key: "editor" },
      { title: "Association Editor", key: "association-editor" },
      { title: "Editor in Chief", key: "editor-in-chief" },
      { title: "Editorial Board Member", key: "editorial-board-member" },
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
