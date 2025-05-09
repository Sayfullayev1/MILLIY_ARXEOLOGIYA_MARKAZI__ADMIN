import React, { useState } from 'react'

export default function Test() {
    const [filesList, setFilesList] = useState([]); // Массив загруженных файлов
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
      const selectedFiles = Array.from(event.target.files); // Преобразуем FileList в массив
      setFile(selectedFiles[0])
      setFilesList((prevFiles) => [...prevFiles, ...selectedFiles]); // Добавляем файлы в массив
    };

    console.log(filesList);
    console.log(file);
    
  
    return (
      <div>
        <h2>Загрузка файлов</h2>
        
        <input type="file" multiple onChange={handleFileChange} />
  
        <h3>Загруженные файлы:</h3>
        <ul>
          {filesList.map((file, index) => (
            <li key={index}>
              {file.name} ({(file.size / 1024).toFixed(2)} KB) 
              <a href={URL.createObjectURL(file)} download={file.name} style={{ marginLeft: '10px' }}>
                📥 Скачать
              </a>
            </li>
          ))}
        </ul>
      </div>
  )
}
