const UserModel = require("./model");

const { signNewJWT, checkJWT, compareHash, hash } = require("../../helpers");

module.exports = {
  Query: {
    user: ({ hashId }) => {
      UserModel.findById(hashId).then(user => user);
    },
    checkToken: async (parent, args) => {
      try {
        const decodedUser = await checkJWT(args.token);

        const foundUser = await UserModel.findOne(
          { hashId: decodedUser.hashId },
          { firstName: 1, lastName: 1, email: 1, hashId: 1, isHr: 1, _id: 0 },
        );

        return foundUser;
      } catch {
        return null;
      }
    },
  },
  Mutation: {
    registerUser: async (parent, args) => {
      const user = args.user;

      // CHECK IF THE GIVEN EMAILS IS NOT USED IF IT IS THEN THROW AN ERROR
      const amount = await UserModel.countDocuments({ email: user.email });

      if (amount > 0) throw new Error("This email address is already in use");

      const hashedPassword = await hash(user.password);

      const newUser = new UserModel({ ...user, password: hashedPassword });

      const savedUser = await newUser.save();

      try {
        const token = await signNewJWT(savedUser);
        return { token, user: savedUser };
      } catch {
        return null;
      }
    },
    logInUser: async (parent, args) => {
      const user = args.user;

      const foundUser = await UserModel.findOne({ email: user.email });

      if (!foundUser) throw new Error("Email or password is incorrect");

      const truePassword = await compareHash(user.password, foundUser.password);

      if (!truePassword) throw new Error("Email or password is incorrect");
      try {
        const token = await signNewJWT(foundUser);

        return { token, user: foundUser };
      } catch {
        return null;
      }
    },
    editUser: async (_, args) => {
      try {
        const user = await UserModel.findOne({ hashId: args.userId });
        user.firstName = args.newFirstName ? args.newFirstName : user.firstName;
        user.lastName = args.newLastName ? args.newLastName : user.lastName;

        user.phoneNumber = args.newPhoneNumber
          ? args.newPhoneNumber
          : user.phoneNumber;
        user.address = args.newAddress ? args.newAddress : user.address;

        if (args.newEmail) {
          const usersWithThisEmail = await UserModel.countDocuments({
            email: args.newEmail,
          });

          if (usersWithThisEmail > 0) {
            throw new Error("Email is already in use");
          }

          user.email = args.newEmail;
        }

        if (args.newPassword) {
          if (args.lastPassword) {
            throw new Error("Old password is required");
          }
          const truePassword = await compareHash(
            args.lastPassword,
            user.password,
          );

          if (!truePassword) {
            throw new Error("Old Invalid password");
          }

          const newHashedPassword = await hash(args.newPassword);
          user.password = newHashedPassword;
        }

        await user.save();

        return true;
      } catch (err) {
        console.log(err);
        throw new Error("Something went wrong while saving user name...");
      }
    },
    deleteUser: async (_, args) => {
      try {
        await UserModel.findOneAndDelete({ hashId: args.userId });
        return true;
      } catch (err) {
        console.error(err);
        throw new Error("Something went wrong while deleting user");
      }
    },
  },
};
