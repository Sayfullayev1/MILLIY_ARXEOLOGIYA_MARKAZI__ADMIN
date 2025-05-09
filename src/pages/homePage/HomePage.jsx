import React, { useContext, useState } from 'react'
import './homePage.scss'
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';

export default function HomePage() {

  const { language } = useContext(LanguageContext);

  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const addRow = () => {

    if (!name || !description) {
      alert('Заполните все поля');
      return;
    }  else {  

      console.log("Выбранный файл:", file)

      const newItem = {
        name: name,
        description: description,
        file: file,
      };
      setItems([...items, newItem]);
      setName('');
      setDescription('');
      setFile(null);
    }
  };

  const deleteRow = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="home-page">
      {file && <p>Выбранный файл: {file.name}</p>}

      <h2 className="title">Добавить новый элемент</h2>

      <div className="form-container">
        <div className="form-group">
          <label>
            Название:
            <input
              type="text"
              value={name}
              placeholder="Введите текст"
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Описание:
            <input
              type="text"
              value={description}
              placeholder="Введите текст"
              onChange={(e) => setDescription(e.target.value)}
              className="input"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Файл:
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="input"
            />
          </label>
        </div>
        <button onClick={addRow} className="button">Добавить</button>
      </div>

      <h2 className="title">Список элементов</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Файл</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <Link to={""}>{item.file.name}</Link>
              </td>
              <td>
                <button onClick={() => deleteRow(index)} className="button delete-button">
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div> 
  )
}
