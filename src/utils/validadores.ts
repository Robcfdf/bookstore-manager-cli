export function validarTextoObrigatorio(valor: string, campo: string): void {
  if (!valor || valor.trim().length === 0) {
    throw new Error(`O campo "${campo}" é obrigatório.`);
  }
}
export function validarNumeroPositivo(valor: number, campo: string): void {
  if (isNaN(valor) || valor <= 0) {
    throw new Error(`O campo "${campo}" deve ser um número positivo.`);
  }
}
export function validarEmail(email: string): void {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    throw new Error('E-mail inválido.');
  }
}