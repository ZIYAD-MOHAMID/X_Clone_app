"use server";
import { log } from "util";
import { imagekit } from "./utils";

export const shareAction = async (
  formData: FormData,
  settings: { type: "original" | "wide" | "square"; sensitive: boolean }
) => {
  const file = formData.get("file") as File;
  console.log(file);
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const transformation = `w-600, ${
    settings.type === "square"
      ? "ar-1-1"
      : settings.type === "wide"
      ? "ar-16-9"
      : ""
  }`;

  imagekit.upload(
    {
      file: buffer,
      fileName: file.name,
      folder: "/posts",
      ...(file.type.includes("image") && {
        transformation: {
          pre: transformation,
        },
      }),
      customMetadata: {
        sensitive: settings.sensitive,
      },
    },
    function (error, result) {
      if (error) console.log(error);
      else console.log(result);
    }
  );
};
