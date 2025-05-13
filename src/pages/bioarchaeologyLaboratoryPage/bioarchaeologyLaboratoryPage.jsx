import React, { useContext } from 'react';
import styles from './bioarchaeologyLaboratoryPage.module.scss';
import Category from '../../../../components/category/Category';
import { LanguageContext } from '../../../../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function BioarchaeologyLaboratoryPage() {
  const { language } = useContext(LanguageContext);

  const menuData = [
    {
      text: {
        uz: "Bosh sahifa",
        ru: "Главная",
        en: "Main",
      },
      link: "/",
    },
    {
      text: {
        uz: "Bioarxeologiya laboratoriyasi",
        ru: "Лаборатория биоархеологии",
        en: "Bioarchaeology laboratory",
      },
      link: "/",
    },
  ];

  const listOfEnumerations = [
    {
      uz: "- respublika bo‘ylab olib borilayotgan arxeologik izlanishlarda tabiiy fanlarning zamonaviy tadqiqot usullarini keng qo‘llaydi;",
      ru: "",
      en: "",
    },
    {
      uz: "- arxeologik qazishmalar chog‘ida yoki tasodifan topilgan inson osteologik qoldiqlari qayta tiklash orqali paleodemografiya, o‘tmishda yashagan kishining sog‘lig‘i, turmush darajasi va ovqatlanish ratsionini aniqlaydi;",
      ru: "",
      en: "",
    },
    // ...other items
  ];

  const documentsList = [
    {
      Name: {
        uz: "1. Laboratoriya nizomi",
        ru: "1. Устав лаборатории",
        en: "1. Laboratory Charter",
      },
      Link: "",
    },
    {
      Name: {
        uz: "2. Laboratoriya yo'l xaritasi",
        ru: "2. Дорожная карта лаборатории",
        en: "2. Laboratory Roadmap",
      },
      Link: "",
    },
    // ...other items
  ];

  return (
    <div className={styles.container}>
      <Category data={menuData} />

      <main className={styles.main}>
        <p className={styles.text}>
          {language === "uz"
            ? "O‘zbekiston Respublikasi Vazirlar Mahkamasining 2019 yil 21 sentabrdagi 792-sonli “Arxeologik tadqiqotlarni tubdan takomillashtirish to‘g‘risida” Qarori asosida Milliy arxeologiya markazi tashkil etildi..."
            : language === "ru"
            ? "Постановлением Кабинета Министров Республики Узбекистан № 792 от 21 сентября 2019 года “О коренном совершенствовании археологических исследований” был создан Национальный центр археологии..."
            : "By Resolution No. 792 of the Cabinet of Ministers of the Republic of Uzbekistan, dated September 21, 2019, “On the Fundamental Improvement of Archaeological Research,” the National Center of Archaeology was established..."}
        </p>

        <ul className={styles.list}>
          {listOfEnumerations.map((item, index) => (
            <li key={index}>{item[language]}</li>
          ))}
        </ul>

        <ul className={styles.infoList}>
          {documentsList.map((item, index) => (
            <li className={styles.infoItem} key={index}>
              <Link to={item.Link}>{item.Name[language]}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
