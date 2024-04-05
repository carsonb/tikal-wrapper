import fs from "fs";
import { merge } from "~/lib/tikal";

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  if (!formData?.length || formData.length < 3) {
    throw createError({
      statusCode: 400,
      statusMessage: "Files must be uploaded",
    });
  }
  const sourceFile = formData[0];
  const xliffFile = formData[1];
  const targetLanguage = formData[2].data.toString();
  fs.writeFileSync(`output/${sourceFile.filename}`, sourceFile.data);
  const xliffFilePath = `output/${xliffFile.filename}`;
  fs.writeFileSync(xliffFilePath, xliffFile.data);

  try {
    merge(xliffFilePath, targetLanguage, "output/merged");
  } catch (e: unknown) {
    throw createError({
      statusCode: 400,
      statusMessage: e instanceof Error ? e.message : `${e}`,
    });
  }

  return sendStream(
    event,
    fs.createReadStream(`output/merged/${sourceFile.filename}`)
  );
});
