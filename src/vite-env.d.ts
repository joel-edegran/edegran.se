declare module '*.styl' {
  const content: { [className: string]: string }
  export default content
}

declare module '@picocss/pico';