import { instance } from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IFile } from "@/types/File";

const formdataHeader = {
  headers: { "Content-Type": "multipart/form-data" },
};

const mediaService = {
  uploadFile: (payload: FormData) =>
    instance.post(`${endpoint.MEDIA}/upload-single`, payload, formdataHeader),
  deleteFile: (payload: IFile) =>
    instance.delete(`${endpoint.MEDIA}/remove`, { data: payload }),
};

export default mediaService;
