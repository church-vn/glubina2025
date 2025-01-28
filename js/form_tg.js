const token = '7534080965:AAHZMcES7kek90v4Ej8CEC_dWKFvkwRDhnI'; // Токен бота
const chatIds = ['746586393', '1271362249']; // ID чатов
const URL_API = 'https://api.telegram.org/';

// Получаем элементы формы
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('receiptName_mission_conference');
const secondNameInput = document.getElementById('receiptSecondName_mission_conference');
const telInput = document.getElementById('receiptTel_mission_conference');
const fileInput = document.getElementById('receiptFile_mission_conference');

// Обработчик отправки формы
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    // Формируем сообщение
    const message = `Имя: ${nameInput.value.trim()}
Фамилия: ${secondNameInput.value.trim()}
Телефон: ${telInput.value.trim()}`;

    // Создаем массив промисов для отправки в несколько чатов
    const promises = chatIds.map(chatId => {
        const formData = new FormData(); // Создаем новый экземпляр FormData для каждого чата
        formData.append('chat_id', chatId);
        formData.append('caption', message);
        formData.append('document', fileInput.files[0]); // Добавляем файл

        return axios.post(`${URL_API}bot${token}/sendDocument`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    });

    // Обрабатываем результаты запросов
    Promise.all(promises)
        .then(() => {
            alert('Ваше сообщение успешно отправлено всем пользователям! ✅');
            form.reset(); // Сбрасываем поля формы
            document.getElementById('file-name').textContent = 'Файл не выбран'; // Сбрасываем текст выбора файла
        })
        .catch(error => {
            console.error(error);
            alert('Произошла ошибка при отправке. Попробуйте снова.');
        });
});
