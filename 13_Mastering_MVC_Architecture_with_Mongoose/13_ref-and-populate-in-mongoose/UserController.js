import User from "./UserModel.js";

const user = await User.findOne({ email: "aditya@gmail.com" }).populate({
  path: "parentId",
  select: "name age -_id",
  populate: {},
});

console.log(user);
