import { CustomError } from "@repo/utils";


export const LANGUAGE_MAP: Record<string, number> = {
  "C++": 54,
  PYTHON: 71,
  JAVASCRIPT: 63,
  JAVA: 62,
};

export const LANGUAGE_ID_MAP = Object.fromEntries(
  Object.entries(LANGUAGE_MAP).map(([language, id]) => [id, language])
);

export const getLanguageIdByName = (language: string) => {
  const normalized = language.toUpperCase();
  const id = LANGUAGE_MAP[normalized];
  if (!id)
    throw new CustomError(400, `Language "${language}" is not supported.`);
  return id;
};

export const getLanguageNameFromId = (id: string) => {
  const name = LANGUAGE_ID_MAP[id];
  if (!name) throw new CustomError(400, `Language ID ${id} is not supported.`);
  return name;
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));