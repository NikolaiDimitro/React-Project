export const bookValidationRules = {
    title: [
        {
            validate: (value) => value.trim().length > 0,
            message: 'Заглавието е задължително'
        }
    ],
    author: [
        {
            validate: (value) => value.trim().length > 0,
            message: 'Авторът е задължителен'
        },
        {
            validate: (value) => value.trim().length >= 2,
            message: 'Името на автора трябва да е поне 2 символа дълго'
        },
        {
            validate: (value) => !/^\d+$/.test(value.trim()),
            message: 'Името на автора не може да съдържа само цифри'
        }
    ],
    year: [
        {
            validate: (value) => value > 0,
            message: 'Годината трябва да е положително число'
        },
        {
            validate: (value) => value <= 2025,
            message: 'Годината не може да бъде по-голяма от 2025'
        }
    ],
    description: [
        {
            validate: (value) => value.trim().length > 0,
            message: 'Описанието е задължително'
        },
        {
            validate: (value) => value.trim().length >= 10,
            message: 'Описанието трябва да е поне 10 символа дълго'
        }
    ],
    imageUrl: [
        {
            validate: (value) => {
                try {
                    new URL(value);
                    return true;
                } catch {
                    return false;
                }
            },
            message: 'Моля, въведете валиден URL адрес'
        }
    ]
};

export const authValidationRules = {
    email: [
        {
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Моля, въведете валиден имейл адрес'
        }
    ],
    password: [
        {
            validate: (value) => value.length >= 6,
            message: 'Паролата трябва да е поне 6 символа дълга'
        }
    ]
}; 