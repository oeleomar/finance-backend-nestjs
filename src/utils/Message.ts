export class Message {
  static notEmpty(field: string) {
    return `${field} não pode ser vazio`;
  }

  static notMatch(field: string) {
    return `${field} não são iguas`;
  }

  static notValid(field: string) {
    return `${field} não é válido`;
  }

  static notStrong(field: string) {
    return `${field} não é forte suficiente`;
  }
}
