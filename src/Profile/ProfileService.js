import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import FileService from "../FileService/FileService.js";
import Profile from "./Profile.js";

const jwtSecretKey = "somesecretkey";

class ProfileService {
  async registration(profile) {
    const candidateEmail = await Profile.findOne({ email: profile.email });

    const candidateUsername = await Profile.findOne({
      username: profile.username,
    });

    if (candidateEmail)
      throw new Error(`Profile with email ${profile.email} already exist`);
    if (candidateUsername)
      throw new Error(
        `Profile with username ${profile.username} already exist`
      );

    const hashedPassword = await bcrypt.hash(profile.password, 10);
    const createdProfile = Profile.create({
      ...profile,
      password: hashedPassword,
    });
    return createdProfile;
  }

  async login(profile) {
    if (!profile) throw new Error("Profile is null");

    const { username, password } = profile;
    if (!username) throw new Error("Profile username is null");

    const profileDocument = await Profile.findOne({
      username: username,
    }).select("+password");
    if (!profileDocument) throw new Error("Profile does not exist");

    const isPasswordMatch = await bcrypt.compare(
      password,
      profileDocument.password
    );
    if (!isPasswordMatch) {
      throw new Error("Uncorrect password");
    }

    const token = jwt.sign({ id: profileDocument._id }, jwtSecretKey, {
      expiresIn: "30m",
    });

    return {
      token,
      user: {
        username: profileDocument.username,
        id: profileDocument._id,
        email: profileDocument.email,
      },
    };
  }

  async get(id) {
    if (!id) throw new Error("id is null");
    const profile = await Profile.findById(id);
    return profile;
  }

  async getAll() {
    const profiles = await Profile.find();
    return profiles;
  }

  async update(profile) {
    if (!profile._id) throw new Error("Profile id is null");
    const profileDocument = await Profile.findById(profile._id);
    if (!profileDocument) throw new Error("Profile does not exist");
    await FileService.removeFile(profileDocument.avatarImg);
    const updatedProfile = await Profile.findByIdAndUpdate(
      profile._id,
      profile
    );
    return updatedProfile;
  }

  async delete(id) {
    if (!id) throw new Error("id is null");
    const profile = await Profile.findByIdAndDelete(id);
    if (!profile) throw new Error("Profile does not exits");
    await FileService.removeFile(profile.avatarImg);
    return profile;
  }
}

export default new ProfileService();
