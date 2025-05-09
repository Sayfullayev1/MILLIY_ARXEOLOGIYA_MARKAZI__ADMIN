import axios from 'axios';

// const API_BASE_URL = 'https://milliy-arxeologiya-markazi-admin-api.onrender.com'; // Базовый URL для API



const API_BASE_URL = 'https://milliy-arxeologiya-markazi-admin-api.onrender.com';




export const passwordCheck = ( navigate, username, password, setErrorCode) => {

    const codeData = {
      name: username,
      code: password,
    };

    if (username === '' || password === '') {
      setErrorCode('Заполните все поля');
      
    } else {
      axios.post(`${API_BASE_URL}/api/login`, codeData)
        .then(response => {
          // Обрабатываем успешный ответ
          // console.log(response.data);

          if (response.data.valid) {
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/');
          } else{
            setErrorCode('Неверный логин или пароль');
          }
          
        })
        .catch(error => {
          // Обрабатываем ошибку
          // console.error('Ошибка при выполнении запроса:', error);
          
        });
    }

};




export const checkToken = (token, navigate) => {
    if (token) {
        axios.get(`${API_BASE_URL}/api/test`, {
            headers: {
              Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
            },
          })
          .then((response) => {
            if (!response.data.valid) {
              localStorage.removeItem('token'); // Удаляем недействительный токен
              navigate('/login'); // Перенаправляем на страницу логина
            }
          })
          .catch((error) => {
            console.error('Ошибка при проверке токена:', error);
            localStorage.removeItem('token'); // Удаляем токен при ошибке
            navigate('/login'); // Перенаправляем на страницу логина
          });
    } else {
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login'); // Перенаправляем на страницу логина, если токен отсутствует
    }
};



// Получение всех объектов
export const fetchItems = async (token) => {

    let data = null;
  try {
    axios.get(`${API_BASE_URL}/api/test`, {
        headers: {
          Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
        },
      })
      .then((response) => {
        if (!response.data) {
          data = response.data
        }
      })
      .catch((error) => {
        console.error('Ошибка при проверке токена:', error);
        localStorage.removeItem('token'); // Удаляем токен при ошибке
      });
    return data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    throw error;
  }
};

// Добавление нового объекта
export const addItem = async (item) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, item);
    return response.data;
  } catch (error) {
    console.error('Ошибка при добавлении объекта:', error);
    throw error;
  }
};

// Обновление объекта
export const updateItem = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении объекта:', error);
    throw error;
  }
};

// Удаление объекта
export const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при удалении объекта:', error);
    throw error;
  }
};
