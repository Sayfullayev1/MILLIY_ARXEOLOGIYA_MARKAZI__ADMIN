import React, { useState, useEffect, useRef } from 'react';
import style from './newsPage.module.scss'; // Убедитесь, что файл newsPage.module.scss существует


import axios from 'axios';
import RichTextNewsEditor, { getEditorHtml } from '../../../components/RichTextNewsEditor/RichTextNewsEditor';
import { getApi } from '../../../api/api';

import { useLocation } from 'react-router-dom';


export default function NewsPage() {
  const [formData, setFormData] = useState({
    image: null,
    slug: '',
    title: {
      ru: '',
      uz: '',
      en: '',
    },
    date: '', // поле date теперь будет содержать и дату, и время
  });

  const [newsListData, setNewsListData] = useState([]);
  const [editorContent, setEditorContent] = useState('');
  const editorRef = useRef(null);

  // Инициализация редактора с пустым контентом


  const location = useLocation();
  const lastSegment = location.pathname.split('/').filter(Boolean).pop();




  // Пример сохранения HTML-контента как "поста"
  const handleSavePost = async () => {
    const html = getEditorHtml(editorRef);
    const { title, image, date } = formData;

    // Собираем все данные для отправки/отображения
    const postData = {
      title: { ...title },
      image,
      content: html,
      date: date || new Date().toISOString().slice(0, 16), // YYYY-MM-DDTHH:mm
    };

    // Формируем FormData для отправки файла и данных
    const dataToSend = new FormData();
    if (image) dataToSend.append('image', image);
    dataToSend.append('title_ru', title.ru);
    dataToSend.append('title_uz', title.uz);
    dataToSend.append('title_en', title.en);
    dataToSend.append('date', postData.date);
    dataToSend.append('content', html);

    // Генерируем slug (пример на основе uz)
    const slugify = (text) =>
      (text || '')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    dataToSend.append('slug', slugify(title.uz));

    try {
      const api = getApi();
      const token = localStorage.getItem('token');
      const apiUrl = api + '/api/'+ lastSegment +'/push';
      const response = await axios.post(apiUrl, dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });
      alert('Новость успешно отправлена!');
      
      console.log('Ответ сервера:', response.data);
    } catch (error) {
      alert('Ошибка при отправке новости');
      console.error(error);
    }
  };



  // Добавьте функцию handleInputChange (если её нет)
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

  // Добавьте функцию handleSubmit (если её нет)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно собрать данные из formData и editorContent и отправить на сервер
    handleSavePost();
  };




  useEffect(() => {
    const fetchNewsList = async () => { 
      const api = getApi();
      const token = localStorage.getItem('token');

      axios.get(`${api}/api/${lastSegment}/get-list`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      })
        .then(response => {
            console.log('Метаданные галереи:', response.data.data);
            setNewsListData(response.data.data || []);
        })
        .catch(error => {
          console.error('Ошибка при запросе метаданных галереи:', error);
        });
    }
    fetchNewsList();
  }, []);


  function getDesign(item) {
    setEditorContent(item)
  }

  // Функция для удаления новости
  const handleDeleteNews = async (index) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту новость?')) return;
    const api = getApi();
    const token = localStorage.getItem('token');
    try {
      // id - это индекс в массиве, как на сервере (newsMetaList)
      await axios.delete(`${api}/api/${lastSegment}/delete/${index}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });
      // После удаления обновляем список
      setNewsListData(prev => prev.filter((_, i) => i !== index));
    } catch (error) {
      alert('Ошибка при удалении новости');
      console.error(error);
    }
  };



  return (
    <div className={style.newsPage}>
      <form className={style.newsForm} onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label htmlFor="image">Фото:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => handleInputChange(e, 'image')}
          />
        </div>

        <div className={style.formGroup}>
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

        <div className={style.formGroup}>
          <label>Дата и время публикации:</label>
          <input
            type="datetime-local"
            value={formData.date}
            onChange={e => handleInputChange(e, 'date')}
          />
        </div>
      </form>
      

      <div className={style.richTextNewsEditor}>

          <RichTextNewsEditor
            value={editorContent}
            onChange={setEditorContent}
            ref={editorRef}
          />

          <button className={style.richTextNewsEditor__button} onClick={() => handleSavePost()}>Сохранить</button>

      </div>
        

      

      

      <div className={style.newsList}>
        {(Array.isArray(newsListData) ? newsListData : []).map((item, index) => (
          <div className={style.newsCard} key={index}>
            <div className={style.newsCard__imageWrapper}>
              <img src={item?.image} alt="News" className={style.newsCard__image} />
            </div>
            <div className={style.newsCard__content}>
              <h3 className={style.newsCard__title}>{item?.title?.ru}</h3>
              <p className={style.newsCard__date}>{item?.date}</p>

              <div className={style.newsCard__buttonWrapper}>
                <button className={style.newsCard__button} onClick={() => getDesign(item?.content)}>
                  Посмотреть новость 
                </button>
                <button
                  className={style.newsCard__button}
                  style={{ background: '#e53935', color: '#fff', borderColor: '#e53935', marginLeft: 8 }}
                  onClick={() => handleDeleteNews(index)}
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}