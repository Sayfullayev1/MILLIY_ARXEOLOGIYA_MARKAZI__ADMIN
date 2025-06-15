import React, { useContext, useState } from 'react'
import './homePage.scss'
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';

export default function HomePage() {

  const { language } = useContext(LanguageContext);


  const pageslist = [
    {
      title: {
        uz: "Yangiliklar",
        ru: "Новости",
        en: "News",
      },
      items: [
        {
          text: {
            uz: "Yangiliklar",
            ru: "Новости",
            en: "News",
          },
          link: "/news",
        },
        {
          text: {
            uz: "Fotogalereya",
            ru: "Фотогалерея",
            en: "Photo Gallery",
          },
          link: "/photo-gallery",
        },
      ]
    }
  ]

  return (
    <div className="home-page">

      <ul>
        {
          pageslist.map((page, index) => (
            <li key={index}>
              <h2>{page.title[language]}</h2>
              <ul>
                {
                  page.items.map((item, index) => (
                    <li key={index}>
                      <Link to={item.link}>{item.text[language]}</Link>
                    </li>
                  ))
                }
              </ul>
            </li>
          ))
        }
      </ul>
    </div> 
  )
}
