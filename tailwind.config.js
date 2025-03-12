import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['League Spartan', ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                'xs': '.8rem',   // Ejemplo: Aumenta el tamaño xs
            'sm': '.9rem',
            'base': '1.1rem', // Tamaño base aumentado
            'lg': '1.2rem',
            'xl': '1.3rem',
            '2xl': '1.5rem',
            '3xl': '1.8rem',
            '4xl': '2.2rem',
            '5xl': '3rem',
            '6xl': '3.75rem',
            '7xl': '4.5rem',
            '8xl': '6rem',
            '9xl': '8rem',

            }
        },
    },

    plugins: [forms],
};
 