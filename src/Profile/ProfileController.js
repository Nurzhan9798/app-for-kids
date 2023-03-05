import FileService from "../FileService/FileService.js";
import ProfileService from "./ProfileService.js";

class ProfileController {
  async registration(req, res) {
    try {
      const createdFile = await FileService.saveFile(req.file);
      const profile = await ProfileService.registration({
        ...req.body,
        avatarImg: createdFile,
      });
      return res.json(profile);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async login(req, res) {
    try {
      const profile = await ProfileService.login(req.body);
      return res.json(profile);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async get(req, res) {
    try {
      const profile = await ProfileService.get(req.params.id);
      return res.json(profile);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const profiles = await ProfileService.getAll();
      return res.json(profiles);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const createdFile = await FileService.saveFile(req.file);
      const profile = await ProfileService.update({
        ...req.body,
        avatarImg: createdFile,
      });
      return res.json(profile);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async delete(req, res) {
    try {
      const profile = await ProfileService.delete(req.params.id);
      return res.json(profile);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new ProfileController();
