import { useState } from "react";

export const translations = () => {
  const languageCode = typeof window !== "undefined" ? window.localStorage.getItem('language') || 'en' : 'en';

  try {
    const languageData = require(`./translations/${languageCode}.json`);
    return languageData;
  }
  catch (err) {
    if(err) console.error(err);
  }
}

export const template = (text: string, replacements: Object) => {
  try {
    Object.keys(replacements).forEach(replace => {
      text = text.replaceAll(`%${replace}`, (replacements as any)[replace]);
    })
  }
  catch(err) {
    if(err) console.error(err)
  }

  return text
}
