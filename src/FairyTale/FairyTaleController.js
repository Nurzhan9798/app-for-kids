import FairyTaleService from "./FairyTaleService.js";
import FileService from "../FileService/FileService.js";

class FairyTaleController {
  async create(req, res) {
    try {
      const createdFile = await FileService.saveFile(req.file);
      const fairyTale = await FairyTaleService.create({
        ...req.body,
        coverImg: createdFile,
      });
      return res.json(fairyTale);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async get(req, res) {
    try {
      const fairyTale = await FairyTaleService.get(req.params.id);
      return res.json(fairyTale);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const fairyTales = await FairyTaleService.getAll();
      return res.json(fairyTales);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const createdFile = await FileService.saveFile(req.file);
      const fairyTale = await FairyTaleService.update({
        ...req.body,
        coverImg: createdFile,
      });
      return res.json(fairyTale);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async delete(req, res) {
    try {
      const fairyTale = await FairyTaleService.delete(req.params.id);
      return res.json(fairyTale);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new FairyTaleController();
