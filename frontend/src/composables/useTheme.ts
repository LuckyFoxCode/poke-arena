import { ref } from 'vue';

type Theme = 'light' | 'dark' | 'system';

const theme = ref<Theme>('system');

function applyTheme(value: Theme) {
  const isDark =
    value === 'dark' ||
    (value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  document.documentElement.classList.toggle('dark', isDark);
}

function setTheme(value: Theme) {
  theme.value = value;

  if (value === 'system') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', value);
  }

  applyTheme(value);
}

function toggleTheme() {
  const next = theme.value === 'dark' ? 'light' : 'dark';
  setTheme(next);
}

function initTheme() {
  const saved = localStorage.getItem('theme') as Theme | null;
  const initial = saved ?? 'system';
  setTheme(initial);

  if (initial === 'system') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      applyTheme('system');
    });
  }
}

export function useTheme() {
  return { theme, setTheme, toggleTheme };
}

export { initTheme };
