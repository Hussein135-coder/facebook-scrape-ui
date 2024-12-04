import axios from "axios";

// import.meta.env.VITE_API_URL
export const API_URL = import.meta.env.VITE_API_URL;

export const restartServer = async () => {
  const response = await axios.post(`${API_URL}/restart`);
  return response.data;
};

export const getConfig = async () => {
  const response = await axios.get(`${API_URL}/config`);
  return response.data;
};

export const updateConfig = async (config: unknown) => {
  await axios.post(`${API_URL}/config`, config);
};

export const getImages = async () => {
  const response = await axios.get(`${API_URL}/images`);
  return response.data;
};

export const deleteImage = async (filename: string) => {
  const response = await axios.delete(`${API_URL}/images/${filename}`);
  return response.data;
};

// export const pagesInformation = {
//   "https://m.facebook.com/profile.php?id=100064316544313": "وزارة التربية",
//   "https://www.facebook.com/bakaloria.syria": "بكالوريا سورريا",
//   "https://www.facebook.com/syriaplus5": "سوريا التعليمية",
//   "https://www.facebook.com/SyrEduCh": "التربوية السورية",
//   "https://www.facebook.com/almadinafmsyria": "المدينة اف ام",
//   "https://www.facebook.com/profile.php?id=100057422230116": "حماة",
//   "https://www.facebook.com/profile.php?id=100064112340207": "القنيطرة",
//   "https://www.facebook.com/profile.php?id=100064672839987": "دمشق",
//   "https://www.facebook.com/profile.php?id=61560552404255": "طرطوس",
//   "https://www.facebook.com/p/%D9%85%D8%AF%D9%8A%D8%B1%D9%8A%D8%A9-%D8%A7%D9%84%D8%AA%D8%B1%D8%A8%D9%8A%D8%A9-%D8%A8%D8%A7%D9%84%D9%84%D8%A7%D8%B0%D9%82%D9%8A%D8%A9Lattakia-Directorate-of-Education-100077065967420":
//     "اللاذقية",
//   "https://www.facebook.com/reefdam": "ريف دمشق",
//   "https://www.facebook.com/aleppoedu.sy": "حلب",
//   "https://www.facebook.com/m.t.alrakka": "الرقة",
//   "https://www.facebook.com/profile.php?id=100063923440646": "دير الزور",
//   "https://www.facebook.com/profile.php?id=100069198820086": "حمص",
//   "https://www.facebook.com/profile.php?id=61551769563760": "السويداء",
//   "https://www.facebook.com/f.3lom4all": "علوم للجميع",
//   "https://www.facebook.com/p/%D9%85%D8%AF%D9%8A%D8%B1%D9%8A%D8%A9-%D8%AA%D8%B1%D8%A8%D9%8A%D8%A9-%D8%A7%D9%84%D8%AD%D8%B3%D9%83%D8%A9-100063657469818":
//     "الحسكة",
//   "https://m.facebook.com/educacationdraa": "درعا",
//   "https://www.facebook.com/tttaaaimoooo22": "ادلب",
// };

interface PagesObject {
  [key: string]: string;
}

export const pagesInformation: PagesObject = {
  loginFa: "حساب الفيسبوك",
  "6544313": "وزارة التربية",
  "a.syria": "بكالوريا سورريا",
  iaplus5: "سوريا التعليمية",
  yrEduCh: "التربوية السورية",
  fmsyria: "المدينة اف ام",
  "2230116": "حماة",
  "2340207": "القنيطرة",
  "2839987": "دمشق",
  "2404255": "طرطوس",
  "5967420": "اللاذقية",
  reefdam: "ريف دمشق",
  "oedu.sy": "حلب",
  alrakka: "الرقة",
  "3440646": "دير الزور",
  "8820086": "حمص",
  "9563760": "السويداء",
  lom4all: "علوم للجميع",
  "7469818": "الحسكة",
  iondraa: "درعا",
  moooo22: "ادلب",
};
