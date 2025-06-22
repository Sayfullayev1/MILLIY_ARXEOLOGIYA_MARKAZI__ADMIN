import React, { useEffect, useState } from 'react'
import style from './contactsPage.module.scss';
import axios from 'axios';
import { getApi } from '../../api/api';

export default function ContactsPage() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {   
        const api = getApi();
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                const response = await axios.get(`${api}/api/contacts/get`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : undefined
                    }
                });
                if (response.data && response.data.contactsList) {
                    setContacts(response.data.contactsList);
                }
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };
        fetchData();
    }, []);

    function formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }

    const handleDelete = async (fileKey) => {
        if (!window.confirm('Удалить это сообщение?')) return;
        const api = getApi();
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${api}/api/contacts/delete`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined
                },
                data: { fileKey }
            });
            setContacts(prev => prev.filter(item => item.fileKey !== fileKey));
        } catch (error) {
            alert('Ошибка при удалении');
        }
    };

    return (
        <div className={style.contactsPage}>
            <h2>Контактные сообщения</h2>
            <div className={style.contactsList}>
                {contacts.length === 0 && <div className={style.empty}>Нет данных</div>}
                {contacts.map((item, idx) => (
                    <div key={idx} className={style.contactCard}>
                        <div className={style.contactRow}>
                            <span className={style.contactLabel}>Имя:</span>
                            <span>{item.name}</span>
                        </div>
                        <div className={style.contactRow}>
                            <span className={style.contactLabel}>Email:</span>
                            <span>{item.email}</span>
                        </div>
                        <div className={style.contactRow}>
                            <span className={style.contactLabel}>Тема:</span>
                            <span>{item.theme}</span>
                        </div>
                        <div className={style.contactRow}>
                            <span className={style.contactLabel}>Сообщение:</span>
                            <span>{item.message}</span>
                        </div>
                        <div className={style.contactRow}>
                            <span className={style.contactLabel}>Дата:</span>
                            <span>{formatDate(item.date)}</span>
                        </div>
                        <button
                            className={style.deleteButton}
                            onClick={() => handleDelete(item.fileKey)}
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
