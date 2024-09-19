const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { ROLES, EMAIL_PROVIDER } = require("../constants");

const { Schema } = mongoose;

// User Schema
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please tell us your first name"]
    },
    lastName: {
      type: String,
      required: [true, "Please tell us your last name"]
    },
    email: {
      type: String,
      required: () => {
        return this.provider === "email" ? false : true;
      },
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    provider: {
      type: String,
      required: true,
      default: EMAIL_PROVIDER.Email
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    googleId: {
      type: String
    },
    facebookId: {
      type: String
    },
    role: {
      type: String,
      default: ROLES.Member,
      enum: [ROLES.Admin, ROLES.Member]
    }
  },
  { timestamps: true }
);

// Match user entered password to hashed password in database

UserSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.error("Error matching password:", error);
    return false;
  }
};

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error("Error encrypting password:", error);
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
