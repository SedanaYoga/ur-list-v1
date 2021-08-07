import CryptoJS from "crypto-js";

const passphrase = process.env.REACT_APP_SECRET_PASSPHRASE;

export const encryptData = (text) => {
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

export const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
