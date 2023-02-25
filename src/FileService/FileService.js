import fs from "fs";
import path from "path";
class FileService {
  async saveFile(file) {
    if (!file) throw new Error("File is null");
    const { originalname, path } = file;
    const ext = originalname.split(".").pop();
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    return newPath.replace("uploads/", "");
  }

  async removeFile(file) {
    const filePath = path.resolve(path.dirname(""), "uploads", file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

export default new FileService();
