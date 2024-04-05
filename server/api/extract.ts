import fs from "fs";
import { extract } from "~/lib/tikal";

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  if (!formData?.length || formData.length < 2) {
    throw createError({
      statusCode: 400,
      statusMessage: "File must be uploaded",
    });
  }
  const sourceFile = formData[0];
  const targetLanguage = formData[1].data.toString();
  const sourceFilePath = `output/${sourceFile.filename}`;
  fs.writeFileSync(sourceFilePath, sourceFile.data);

  try {
    extract(sourceFilePath, targetLanguage, "output");
  } catch (e: unknown) {
    throw createError({
      statusCode: 400,
      statusMessage: e instanceof Error ? e.message : `${e}`,
    });
  }

  return sendStream(event, fs.createReadStream(`${sourceFilePath}.xlf`));
});
