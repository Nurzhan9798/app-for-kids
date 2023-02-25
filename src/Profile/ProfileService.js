import FileService from "../FileService/FileService.js";
import Profile from "./Profile.js";

class ProfileService {
  async create(profile) {
    const createdProfile = Profile.create(profile);
    return createdProfile;
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
