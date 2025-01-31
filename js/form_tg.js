const token = '7534080965:AAHZMcES7kek90v4Ej8CEC_dWKFvkwRDhnI'; // Токен бота
const chatIds = ['746586393', '6329995011']; // ID чатов
const URL_API = 'https://api.telegram.org/';

// Получаем элементы формы
const form = document.getElementById('receiptForm');
const nameInput = document.getElementById('sendName_receipt');
const secondNameInput = document.getElementById('sendSecondName_receipt');
const telInput = document.getElementById('sendTel_receipt');
const emailInput = document.getElementById('sendEmail_receipt'); // Поле Email
const fileInput = document.getElementById('sendFile_receipt');

// Обработчик отправки формы
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    // Формируем сообщение
    const message = `Имя: ${nameInput.value.trim()}
Фамилия: ${secondNameInput.value.trim()}
Телефон: ${telInput.value.trim()}
Email: ${emailInput.value.trim()}`; // Добавлено поле Email

    try {
        for (const chatId of chatIds) {
            const formData = new FormData();
            formData.append('chat_id', chatId);
            formData.append('caption', message);
            formData.append('document', fileInput.files[0]); // Добавляем файл

            // Отправляем сообщение
            await axios.post(`${URL_API}bot${token}/sendDocument`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }

        alert('Ваш чек отправлен на модерацию! ✅');
        form.reset(); // Сбрасываем поля формы
        document.getElementById('file-name').textContent = 'Файл не выбран'; // Сбрасываем текст выбора файла
    } catch (error) {
        console.error(error);
        alert('Произошла ошибка при отправке. Попробуйте снова.');
    }
});
