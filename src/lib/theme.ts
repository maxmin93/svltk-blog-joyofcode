import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

// if false, dark theme is used
const userTheme = browser && localStorage.getItem('color-scheme');

// create the store
export const theme = writable(userTheme || 'dark');

// -------------------------------
// **NOTE: toggleTheme 에서 localStorage 갱신 처리
// -------------------------------
// theme.subscribe((value) => {
//   if (browser) {
//     localStorage.setItem('color-scheme', value);
//   }
//   return value;
// });

// update the theme
export function toggleTheme() {
  theme.update((currentTheme) => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('color-scheme', newTheme);
    localStorage.setItem('color-scheme', newTheme);

    return newTheme;
  });
}

// set the theme
export function setTheme(newTheme: Theme) {
  theme.set(newTheme);
}
