import FileService from "../FileService/FileService.js";
import TrackService from "./TrackService.js";

class TrackController {
  async create(req, res) {
    try {
      const createdFile = await FileService.saveFile(req.file);
      const track = await TrackService.create({
        ...req.body,
        audioFile: createdFile,
        listen: 0,
      });
      return res.json(track);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async get(req, res) {
    try {
      const track = await TrackService.get(req.params.id);
      return res.json(track);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
      const page = req.query.page ? parseInt(req.query.page - 1) : 0;
      const tracks = await TrackService.getAll(pageSize, page);
      return res.json(tracks);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const createdFile = await FileService.saveFile(req.file);
      const track = await TrackService.update({
        ...req.body,
        audioFile: createdFile,
      });
      return res.json(track);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async delete(req, res) {
    try {
      const track = await TrackService.delete(req.params.id);
      return res.json(track);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new TrackController();
