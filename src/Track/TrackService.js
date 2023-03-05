import Track from "./Track.js";
import FileService from "../FileService/FileService.js";

class TrackService {
  async create(track) {
    const createdTrack = await Track.create(track);
    return createdTrack;
  }

  async get(id) {
    if (!id) throw new Error("id is null");
    const track = await Track.findById(id);
    return track;
  }

  async getAll(pageSize, page) {
    const tracks = await Track.find()
      .limit(pageSize)
      .skip(pageSize * page);
    return tracks;
  }

  async update(track) {
    if (!track._id) throw new Error("Track id is null");
    const tracksDocument = await Track.findById(track._id);
    if (!tracksDocument) throw new Error("Track does not exist");
    await FileService.removeFile(tracksDocument.audioFile);
    const updatedFairyTale = await Track.findByIdAndUpdate(track._id, track);
    return updatedFairyTale;
  }

  async delete(id) {
    if (!id) throw new Error("id is null");
    const track = await Track.findByIdAndDelete(id);
    if (!track) throw new Error("Track does not exits");
    await FileService.removeFile(track.audioFile);
    return track;
  }
}
export default new TrackService();
