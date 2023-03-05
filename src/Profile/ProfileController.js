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
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
      const page = req.query.page ? parseInt(req.query.page - 1) : 0;
      const profiles = await ProfileService.getAll(pageSize, page);
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
