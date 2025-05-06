export const validarEntrada = (valor) => valor && valor.trim() !== '';

export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
