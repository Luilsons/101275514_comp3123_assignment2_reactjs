const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: {
      type: String,
      required: true,
      minlength: 8, // Minimum password length
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return candidatePassword === this.password;
  } catch (err) {
    throw new Error(err);
  }
};

// Export the User model
module.exports = mongoose.model('User', userSchema);
