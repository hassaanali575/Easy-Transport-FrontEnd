import {
  errorNotification,
  infoNotification,
  successNotification,
} from "./notification/notification";

export const uploadImage = (img, cb) => {
  if (img != null) {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "easy-transport");
    data.append("cloud_name", "ddt8dl0ty");
    infoNotification("Wait", "Please wait, image is uploading");
    return fetch("https://api.cloudinary.com/v1_1/ddt8dl0ty/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        successNotification(
          "Upload successfully",
          "Your Image Uploaded Successfully"
        );
        cb(data.url, true);
      })
      .catch((err) => {
        console.log(err);
        errorNotification(
          "error",
          "Error occured while uploading your image Try again"
        );
        cb("", false);
      });
  }
};
