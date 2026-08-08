import mongoose from "mongoose";
import User from "./UserModel.js";

const user = await User.findOne({ email: "ramesh@gmail.com" });

// const user = await User.create({name:"shivam", email:"shivam@gmail.com", age:14, hobbies:'TT, Footaball', parentId:'6a76c24bb4c9f05444399260'})
// const user = await User.create({name:"ramesh", email:"ramesh@gmail.com", age:16, hobbies:'TT, Footaball', parentId:'6a76c24bb4c9f05444399260'})



user.hobbiesString = "Movie Watching, Video Editing"

console.log(user.hobbiesString);
// console.log(user.emailDomain);

// await user.save();
// console.log(user.hobbiesString);
// console.log(user.isAdult);

// console.log(user);
// console.log(user.schema.virtuals);
// console.log(User.schema.virtuals);
console.log(user.toJSON());

await mongoose.disconnect();
