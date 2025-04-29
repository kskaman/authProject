export const buttonVariants = {
    primary: `
      bg-(--btn-primary-bg)
      text-(--btn-primary-text)
      hover:bg-(--btn-primary-hover-bg)
      active:bg-(--btn-primary-active-bg)
      border-none
    `,
    secondary: `
      bg-(--btn-secondary-bg)
      text-(--btn-secondary-text)
      hover:bg-(--btn-secondary-hover-bg)
      hover:text-(--btn-secondary-hover-text)
      active:bg-(--btn-secondary-active-bg)
      active:text-(--btn-secondary-active-text)
      border border-(--btn-secondary-border)
      active:border-(--btn-secondary-active-border)
      focus-visible:ring-2
      focus-visible:ring-(--btn-active-ring)
      focus-visible:ring-offset-2
      focus-visible:ring-offset-(--btn-inner-shadow-color)
    `,
    outlined: `
      bg-(--btn-outlined-bg)
      text-(--btn-outlined-text)
      hover:bg-(--btn-outlined-hover-bg)
      hover:text-(--btn-outlined-hover-text)
      active:bg-(--btn-outlined-active-bg)
      active:text-(--btn-outlined-active-text)
      border border-(--btn-outlined-border)
      active:border-(--btn-outlined-active-border)
      focus-visible:ring-2 focus-visible:ring-(--btn-active-ring) focus-visible:ring-offset-2 focus-visible:ring-offset-(--btn-inner-shadow-color)
    `,
    warning: `
      bg-(--btn-warning-bg)
      text-(--btn-warning-text)
      hover:bg-(--btn-warning-hover-bg)
      active:bg-(--btn-warning-active-bg)
      border-none
    `,
    text: `
      bg-transparent
      p-[4px]
      hover:underline
    `,
    icon: `
      bg-transparent
      p-[4px
  `,
} as const;
  

export type ButtonVariant = keyof typeof buttonVariants;
