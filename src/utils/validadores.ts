export function validarTextoObrigatorio(valor: string, campo: string): void {
  if (!valor || valor.trim().length === 0) {
    throw new Error(`O campo "${campo}" é obrigatório.`);
  }
}