import { Theme } from '../context/ThemeContext';

export const changeCssRootVar = (theme: Theme) => {
  const root = document.querySelector(':root') as HTMLElement;

  const components = [
    'body-background',
    'components-background',
    'components-border',
    'components-hover',
    'text-hover',
    'pagination-border',
    'pagination-hover',
    'text-color',

  ];

  components.forEach((component) => {
    root.style.setProperty(
      `--${component}-default`,
      `var(--${component}-${theme})`,
    );
  });
};
