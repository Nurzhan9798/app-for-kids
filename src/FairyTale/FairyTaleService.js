import FairyTale from "./FairyTale.js";
import FileService from "../FileService/FileService.js";

class FairyTaleService {
  async create(fairyTale) {
    const createdFairyTale = FairyTale.create(fairyTale);
    return createdFairyTale;
  }

  async get(id) {
    if (!id) throw new Error("id is null");
    const fairyTale = await FairyTale.findById(id);
    return fairyTale;
  }

  async getAll() {
    const fairyTales = await FairyTale.find();
    return fairyTales;
  }

  async update(fairyTale) {
    if (!fairyTale._id) throw new Error("Fairy Tale id is null");
    const fairyTaleDocument = await FairyTale.findById(fairyTale._id);
    if (!fairyTaleDocument) throw new Error("Fairy tale does not exist");
    await FileService.removeFile(fairyTaleDocument.coverImg);
    const updatedFairyTale = await FairyTale.findByIdAndUpdate(
      fairyTale._id,
      fairyTale
    );
    return updatedFairyTale;
  }

  async delete(id) {
    if (!id) throw new Error("id is null");
    const fairyTale = await FairyTale.findByIdAndDelete(id);
    if (!fairyTale) throw new Error("Fairy Tale does not exits");
    await FileService.removeFile(fairyTale.coverImg);
    return fairyTale;
  }
}

export default new FairyTaleService();
