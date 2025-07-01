import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resumeData: { type: Object, default: {} },
});

// module.exports = mongoose.model('User', UserSchema);
export default mongoose.model("User", UserSchema);