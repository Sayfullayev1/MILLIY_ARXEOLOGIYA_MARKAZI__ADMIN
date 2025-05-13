import React, { useContext } from 'react'
import "./interdisciplinaryResearchPage.scss"
import { LanguageContext } from '../../../../context/LanguageContext';


import Category from '../../../../components/category/Category';
import { Link } from 'react-router-dom';


export default function InterdisciplinaryResearchPage() {


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
                    uz: "Fanlararo tadqiqotlar bo'limi",
                    ru: "Отдел междисциплинарных исследований",
                    en: "Department of Interdisciplinary Research",
                  },
                  link: "/",
                },
        ];


        const listOfEnumerations = [
            {
              uz: "- mintaqa tarixining dolzarb masalalari bo‘yicha ilmiy izlanishlar olib borish;",
              ru: "- проведение научных исследований по актуальным вопросам истории региона;",
              en: "- conducting scientific research on current issues of regional history;"
            },
            {
              uz: "- respublika bo‘ylab olib borilayotgan arxeologik izlanishlarda ijtimoiy fanlarning zamonaviy tadqiqot usullarini keng qo‘llash;",
              ru: "- широкое применение современных методов социальных наук в археологических исследованиях по всей республике;",
              en: "- extensive application of modern social science methods in archaeological research throughout the republic;"
            },
            {
              uz: "- respublikamizda joylashgan arxeologik ob’ektlarni lokalizatsiya qilishda turli tillardagi yozma manbalarga murojaat qilish, ularni o‘zbek tiliga o‘girib, arxeolog tadqiqotlarga amaliy yordam berish;",
              ru: "- обращение к письменным источникам на различных языках для локализации археологических объектов в нашей республике, их перевод на узбекский язык и практическая помощь археологическим исследованиям;",
              en: "- referencing written sources in various languages for localization of archaeological sites in our republic, translating them into Uzbek and providing practical assistance to archaeological research;"
            },
            {
              uz: "- arxeologik qazishmalar chog‘ida yoki tasodifan topilgan epigrafik va numizmatik materiallarni aniqlash va ilmiy jamoatchilikka yetkazib berish;",
              ru: "- идентификация эпиграфических и нумизматических материалов, обнаруженных во время археологических раскопок или случайно, и доведение их до научной общественности;",
              en: "- identification of epigraphic and numismatic materials found during archaeological excavations or accidentally, and presenting them to the scientific community;"
            },
            {
              uz: "- qadimda O‘rta Osiyo bo‘ylab o‘tgan Buyuk ipak yo‘lidagi tijoriy-madaniy va xo‘jalik munosabatlarini ochiqlashda bioarxeologik artefaktlardan foydalanadi;",
              ru: "- использование биоархеологических артефактов для выявления торгово-культурных и хозяйственных отношений вдоль Великого шелкового пути в древней Центральной Азии;",
              en: "- utilizing bioarchaeological artifacts to reveal trade-cultural and economic relations along the Great Silk Road in ancient Central Asia;"
            },
            {
              uz: "- bioarxeologiya yo‘nalishida ilmiy kadrlar tayyorlaydi;",
              ru: "- подготовка научных кадров в области биоархеологии;",
              en: "- training scientific personnel in the field of bioarchaeology;"
            },
            {
              uz: "- O‘zR FAning Tabiiy fanlar bo‘limi institutlari, OTMlari va chet eldagi ilmiy markazlar bilan ilmiy aloqalarni yo‘lga qo‘yadi.",
              ru: "- установление научных связей с институтами Отделения естественных наук АН РУз, высшими учебными заведениями и зарубежными научными центрами;",
              en: "- establishing scientific collaborations with institutes of the Natural Sciences Division of the Academy of Sciences of Uzbekistan, higher education institutions and foreign research centers;"
            }
          ];


          const documentsList = [
            {
              Name: {
                uz: "1. Bo'lim nizomi",
                ru: "1. Устав отдела",
                en: "1. Department Charter"
              },
              Link: ""
            },
            {
              Name: {
                uz: "2. Bo'lim yo'l xaritasi",
                ru: "2. Дорожная карта отдела",
                en: "2. Department Roadmap"
              },
              Link: ""
            },
            {
              Name: {
                uz: "3. Bo'limning 2020-2024 yillar uchun dasturi",
                ru: "3. Программа отдела на 2020-2024 годы",
                en: "3. Department Program for 2020-2024"
              },
              Link: ""
            },
            {
              Name: {
                uz: "4. Bo'lim xodimlari hisoboti",
                ru: "4. Отчет сотрудников отдела",
                en: "4. Department Staff Report"
              },
              Link: ""
            },
            {
              Name: {
                uz: "Bo'lim xodimlari to'grisida batafsil ma'lumotlar",
                ru: "Подробная информация о сотрудниках отдела",
                en: "Detailed Information About Department Staff"
              },
              Link: ""
            }
          ];


  return (
    <div className='interdisciplinary-research-page'>


        <Category data={menuData}/>


 <main className='interdisciplinary-research-page__main'>

            <p className='interdisciplinary-research-page__main__text'>
                {
                    language === "uz" ? "O‘zbekiston Respublikasi Vazirlar Mahkamasining 2019 yil 21 sentabrdagi 792-sonli “Arxeologik tadqiqotlarni tubdan takomillashtirish to‘g‘risida” Qarori asosida Milliy arxeologiya markazi tashkil etildi. Ushbu Qarorga ko‘ra, 2019 yilning oxirida “Fanlararo tadqiqotlar” bo‘limi ochildi. Manbashunoslik, tarixshunoslik, numizmatika va epigrafika, arxeologiya, antropologiya, etnografiya kabi qator fanlarning sintezidan yuzaga kelgan fanlararo tadqiqotlar barcha ijtimoiy fanlarning zamonaviy usullaridan keng foydalanish ko‘zda tutilgan. Bo‘limda ushbu ijtimoiy fan sohalariga tegishli yozma manbalar va arxeologik materiallar o‘zaro solishtirilgan holda ilmiy izlanishlar olib boriladi."
                    : language === "ru" ? "Постановлением Кабинета Министров Республики Узбекистан № 792 от 21 сентября 2019 года 'О коренном совершенствовании археологических исследований' был создан Национальный центр археологии. Согласно данному постановлению, в конце 2019 года был открыт отдел 'Междисциплинарных исследований'. Междисциплинарные исследования, возникшие на стыке таких наук как источниковедение, историография, нумизматика и эпиграфика, археология, антропология, этнография, предусматривают широкое использование современных методов всех социальных наук. В отделе проводятся научные исследования с сопоставительным анализом письменных источников и археологических материалов, относящихся к данным областям социальных наук"
                    : "By Resolution No. 792 of the Cabinet of Ministers of the Republic of Uzbekistan dated September 21, 2019 'On Fundamental Improvement of Archaeological Research', the National Center of Archaeology was established. According to this resolution, at the end of 2019, the 'Interdisciplinary Research' department was opened. Interdisciplinary research, emerging at the intersection of such fields as source studies, historiography, numismatics and epigraphy, archaeology, anthropology, and ethnography, envisions the extensive use of modern methods across all social sciences. The department conducts scientific research involving comparative analysis of written sources and archaeological materials related to these social science disciplines."
                }

                <br />

                {
                    language === "uz" ? "Bo‘limning asosiy vazifalari etib quyidagilar belgilangan:"
                    : language === "ru" ? "Основные задачи отдела:"
                    : "The main tasks of the department include:"
                }

                <br />
                <br />
            </p>

            <p className='interdisciplinary-research-page__main__text'>
                <span>
                    {
                      language === "uz" ? "Laboratoriyaning maqsadi"
                      : language === "ru" ? "Цель лаборатории"
                      : "The purpose of the laboratory"
                    }   
                </span>
                {
                  language === "uz" ? " – osteoarxeologik, arxeobotanik, arxeozoologik va biokimyoviy tahlillar orqali o‘tmishdagi kishilar turmushini qayta tiklash hamda qadimgi aholining hayotni ta’minlash tizimini interpretatsiya qilishdan iborat."
                  : language === "ru" ? " – заключается в реконструкции быта древних людей и интерпретации систем жизнеобеспечения древнего населения посредством остеоархеологических, археоботанических, археозоологических и биохимических анализов."
                  : " – is to reconstruct the lifestyle of ancient people and interpret the life support systems of ancient populations through osteoarchaeological, archaeobotanical, archaeozoological, and biochemical analyses."
                }  

                <br />
                <br />
                {
                  language === "uz" ? "Laboratoriyaning asosiy vazifalari etib quyidagilar belgilangan:"
                  : language === "ru" ? "Основными задачами лаборатории определены следующие:"
                  : "The main tasks of the laboratory are defined as follows:"
                }
                
                <br />
                <br />

            </p>

            <ul className='interdisciplinary-research-page__main__list'>
              {
                listOfEnumerations.map((item, index) => (
                  <li key={index}>
                    {item[language]}
                    
                    <br />
                    <br />
                  </li>
                ))
              }
            </ul>

            <ul className='interdisciplinary-research-page__main__info-list'>
              {
                documentsList.map((item, index) => (
                  <li className='interdisciplinary-research-page__main__info-item' key={index}>
                    <Link to={item.Link}>
                      {item.Name[language]}
                    </Link>
                  </li>
                ))
              }
            </ul>

        </main>


      
    </div>
  )
}
