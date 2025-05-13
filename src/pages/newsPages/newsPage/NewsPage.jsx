import React, { useState, useEffect } from 'react';
import './newsPage.scss';
import axios from 'axios';


// const API_BASE_URL = 'http://localhost:3221';

const API_BASE_URL = 'https://milliy-arxeologiya-markazi-admin-api.onrender.com';


export default function NewsPage() {
  const [formData, setFormData] = useState({
    image: null,
    slug: '',
    title: {
      ru: '',
      uz: '',
      en: '',
    },
    description: {
      ru: '',
      uz: '',
      en: '',
    },
  });

  const [newsListData, setNewsListData] = useState([]);

  const handleInputChange = (e, field, lang = null) => {
    if (field === 'image') {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    } else if (lang) {
      setFormData({
        ...formData,
        [field]: {
          ...formData[field],
          [lang]: e.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [field]: e.target.value,
      });
    }
  };



  const [i, setI] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const slugify = (text) =>
      text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');

    const generatedSlug = slugify(formData.title.uz);

    const today = new Date();
    const formattedDate =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      today.getDate().toString().padStart(2, '0');

    // Создаём объект FormData
    const dataToSend = new FormData();
    dataToSend.append('image', formData.image); // Добавляем файл
    dataToSend.append('slug', generatedSlug);
    dataToSend.append('date', formattedDate);
    dataToSend.append('title_ru', formData.title.ru);
    dataToSend.append('title_uz', formData.title.uz);
    dataToSend.append('title_en', formData.title.en);
    dataToSend.append('description_ru', formData.description.ru);
    dataToSend.append('description_uz', formData.description.uz);
    dataToSend.append('description_en', formData.description.en);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `${API_BASE_URL}/api/newsData/add`,
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data', // Указываем, что отправляем FormData
            },
          }
        );

        console.log('Data sent successfully:', response.data);
      } catch (error) {
        console.error('Error sending data:', error.response?.data || error.message);
      }
    };

    fetchData();

    setI(i + 1); // Увеличиваем счётчик для обновления данных
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Получаем токен из localStorage
        const response = await axios.get(`${API_BASE_URL}/api/newsData/all`, {
          // headers: {
          //   Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
          // },
        });
        console.log('Data fetched:', response.data);
        setNewsListData(response.data.data); // Устанавливаем данные в состояние
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, [i]);


  return (
    <div className="news-page">
      <form className="news-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image">Фото:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => handleInputChange(e, 'image')}
          />
        </div>

        <div className="form-group">
          <label>Заголовок:</label>
          <input
            type="text"
            placeholder="UZ"
            value={formData.title.uz}
            onChange={(e) => handleInputChange(e, 'title', 'uz')}
          />
          <input
            type="text"
            placeholder="RU"
            value={formData.title.ru}
            onChange={(e) => handleInputChange(e, 'title', 'ru')}
          />
          <input
            type="text"
            placeholder="EN"
            value={formData.title.en}
            onChange={(e) => handleInputChange(e, 'title', 'en')}
          />
        </div>

        <div className="form-group">
          <label>Текст:</label>
          <textarea
            placeholder="UZ"
            value={formData.description.uz}
            onChange={(e) => handleInputChange(e, 'description', 'uz')}
          />
          <textarea
            placeholder="RU"
            value={formData.description.ru}
            onChange={(e) => handleInputChange(e, 'description', 'ru')}
          />
          <textarea
            placeholder="EN"
            value={formData.description.en}
            onChange={(e) => handleInputChange(e, 'description', 'en')}
          />
        </div>

        <button type="submit">Сохранить</button>
      </form>


      <div className="news-list">
        {newsListData.map((item, index) => (
          <div className="news-card" key={index}>
            <div className="news-card__image-wrapper">
              <img src={item?.image} alt="News" className="news-card__image" />
            </div>
            <div className="news-card__content">
              <h3 className="news-card__title">{item?.title.ru}</h3>
              <p className="news-card__description">{item?.description.ru}</p>
              <p className="news-card__date">{item?.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
