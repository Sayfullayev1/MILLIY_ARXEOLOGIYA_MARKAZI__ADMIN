import React, { useState, useRef, useEffect, useContext } from 'react'
import style from './photoGalleryPage.module.scss'

import axios from 'axios'
import { getApi } from '../../../api/api'
import { LanguageContext } from '../../../context/LanguageContext'



export default function PhotoGalleryPage() {
    const {language} = useContext(LanguageContext)

    const [title, setTitle] = useState({ uz: '', ru: '', en: '' })
    const [mainImage, setMainImage] = useState(null)
    const [mainImagePreview, setMainImagePreview] = useState(null)
    const [galleryImages, setGalleryImages] = useState([]) // [{file, preview}]
    const [isPublished, setIsPublished] = useState(true)
    const [scheduledDate, setScheduledDate] = useState('')
    const dragItem = useRef(null)
    const dragOverItem = useRef(null)
    const [galleryMetaList, setGalleryMetaList] = useState([])

    const handleMainImage = (e) => {
      const file = e.target.files[0]
      setMainImage(file)
      setMainImagePreview(file ? URL.createObjectURL(file) : null)
    }

    // Добавить новые фото в галерею
    const handleGalleryImages = (e) => {
      const files = Array.from(e.target.files)
      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }))
      setGalleryImages(prev => [...prev, ...newImages])
    }

    // Удалить фото из галереи
    const handleRemoveGalleryImage = (idx) => {
      setGalleryImages(prev => prev.filter((_, i) => i !== idx))
    }

    // Drag & drop сортировка
    const handleDragStart = (idx) => {
      dragItem.current = idx
    }
    const handleDragEnter = (idx) => {
      dragOverItem.current = idx
    }
    const handleDragEnd = () => {
      const from = dragItem.current
      const to = dragOverItem.current
      if (from === null || to === null || from === to) return
      const updated = [...galleryImages]
      const [moved] = updated.splice(from, 1)
      updated.splice(to, 0, moved)
      setGalleryImages(updated)
      dragItem.current = null
      dragOverItem.current = null
    }

    // Получить текущую дату/время в формате для datetime-local
    function getNowDateTimeLocal() {
      const now = new Date()
      const tzOffset = now.getTimezoneOffset() * 60000
      return new Date(now - tzOffset).toISOString().slice(0, 16)
    }

    // Отправка данных на сервер
    const handleSubmit = async (e) => {
      e.preventDefault()
      let sendDate = scheduledDate
      if (isPublished) {
        sendDate = getNowDateTimeLocal()
        setScheduledDate(sendDate)
      }
      const formData = new FormData()
      formData.append('title_uz', title.uz)
      formData.append('title_ru', title.ru)
      formData.append('title_en', title.en)
      formData.append('isPublished', isPublished)
      formData.append('scheduledDate', sendDate)
      if (mainImage) formData.append('mainImage', mainImage)
      galleryImages.forEach((imgObj, idx) => {
        formData.append('galleryImages', imgObj.file)
      })

      const api = getApi();
      const token = localStorage.getItem('token');

      try {
        await axios.post(`${api}/api/photo-gallery/push`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          }
        })
        alert('Галерея успешно отправлена!')
        setTitle({ uz: '', ru: '', en: '' })
        setMainImage(null)
        setMainImagePreview(null)
        setGalleryImages([])
        setIsPublished(true)
        setScheduledDate('')
      } catch (err) {
        if (err.code === 'ERR_NETWORK') {
          alert('Ошибка сети: сервер недоступен или неправильный адрес API.\nПроверьте, что сервер запущен и адрес API указан верно.');
        } else {
          alert('Ошибка при отправке галереи');
        }
        console.log(err);
      }
    }

    // Внутри компонента:
    function formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      if (isNaN(date)) return '';
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    useEffect(() => {
      const api = getApi();
      const token = localStorage.getItem('token');
      axios.get(`${api}/api/photo-gallery/get-list`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      })
        .then(response => {
          if (response.data.success) {
            // Здесь можно обработать полученные метаданные галереи
            console.log('Метаданные галереи:', response.data.data);
            // Например: setGalleryMetaList(response.data.data)
            setGalleryMetaList(response.data.data);
          } else {
            console.error('Ошибка при получении метаданных:', response.data.message);
          }
        })
        .catch(error => {
          console.error('Ошибка при запросе метаданных галереи:', error);
        });
    }, []);
  

  return (
    <div className={style.container}>
      <h2>Создать фотогалерею</h2>
      <form onSubmit={handleSubmit} className={style.adminForm}>
        <div className={style.formGroup}>
          <label>Заголовок (узбекский)</label>
          <input
            type="text"
            value={title.uz}
            onChange={e => setTitle({ ...title, uz: e.target.value })}
            placeholder="Title (uz)"
            required
          />
        </div>
        <div className={style.formGroup}>
          <label>Заголовок (русский)</label>
          <input
            type="text"
            value={title.ru}
            onChange={e => setTitle({ ...title, ru: e.target.value })}
            placeholder="Title (ru)"
            required
          />
        </div>
        <div className={style.formGroup}>
          <label>Заголовок (английский)</label>
          <input
            type="text"
            value={title.en}
            onChange={e => setTitle({ ...title, en: e.target.value })}
            placeholder="Title (en)"
            required
          />
        </div>
        <div className={style.formGroup}>
          <label>Главное фото</label>
          <input type="file" accept="image/*" onChange={handleMainImage} required />
          {mainImagePreview && (
            <img src={mainImagePreview} alt="Главное фото" className={style.previewImg} />
          )}
        </div>
        <div className={style.formGroup}>
          <label>Другие фотографии</label>
          <input type="file" accept="image/*" multiple onChange={handleGalleryImages} />
          <div className={style.galleryPreview}>
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className={style.galleryItem}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragEnter={() => handleDragEnter(idx)}
                onDragEnd={handleDragEnd}
                onDragOver={e => e.preventDefault()}
              >
                <img src={img.preview} alt={`Фото ${idx + 1}`} className={style.previewImgSmall} />
                <button
                  type="button"
                  className={style.removeBtn}
                  onClick={() => handleRemoveGalleryImage(idx)}
                  title="Удалить"
                >×</button>
              </div>
            ))}
          </div>
          <div className={style.galleryHint}>Перетаскивайте фото для изменения порядка</div>
        </div>
        <div className={style.formGroup} style={{ borderTop: '1px solid #eee', marginTop: 24, paddingTop: 18 }}>
          <label style={{ fontWeight: 500, marginBottom: 8, display: 'block' }}>Публикация</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            Опубликовать сразу  
            <input
              type="checkbox"
              checked={isPublished}
              onChange={e => {
                setIsPublished(e.target.checked)
                if (e.target.checked) {
                  setScheduledDate('') // сбросить дату если выбрано "сразу"
                }
              }}
            />
          </label>
          {!isPublished && (
            <div style={{ marginTop: 14 }}>
              <label style={{ display: 'block', marginBottom: 6 }}>Запланировать публикацию</label>
              <input
                type="datetime-local"
                value={scheduledDate.replace('T', ' ')} // удаляем 'T' для отображения, если нужно
                onChange={e => setScheduledDate(e.target.value)}
                required
                style={{
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: '1px solid #bbb',
                  fontSize: '1rem',
                  width: '100%',
                  maxWidth: 320,
                }}
                placeholder="Выберите дату и время"
                min={getNowDateTimeLocal()}
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className={style.submitBtn}
        >
          Сохранить
        </button>
      </form>

      {/* Вывод всех galleryMetaList как карточки */}
      <div style={{ marginTop: 40 }}>
        <h3>Все фотогалереи:</h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24
        }}>
          {galleryMetaList.map((item, idx) => (
            <div key={idx} style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              padding: 18,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }}>
              <div style={{ width: "100%", marginBottom: 12 }}>
                {item.mainImage && (
                  <img
                    src={item.mainImage}
                    alt={item.titles?.ru || item.titles?.uz || "Фото"}
                    style={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                      borderRadius: 8,
                      background: "#f7f7f7"
                    }}
                  />
                )}
              </div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>
                {item.titles[language]}
              </div>
              <div className={style.galleryCardDate}>
                {item.scheduledDate ? formatDate(item.scheduledDate) : ""}
              </div>
              <div style={{ fontSize: 13, color: "#555" }}>
                Опубликовано: {item.isPublished ? "Да" : "Нет"}
              </div>
              <div style={{ marginTop: 10 }}>
                {item.galleryImages && item.galleryImages.length > 0 && (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {item.galleryImages.slice(0, 3).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="gallery"
                        style={{
                          width: 48,
                          height: 48,
                          objectFit: "cover",
                          borderRadius: 6,
                          background: "#f7f7f7"
                        }}
                      />
                    ))}
                    {item.galleryImages.length > 3 && (
                      <span style={{ fontSize: 12, color: "#888", marginLeft: 6 }}>
                        +{item.galleryImages.length - 3} ещё
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


