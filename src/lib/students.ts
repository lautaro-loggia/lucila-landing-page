/*
  RESULTADOS DE ALUMNOS
  Fotos en public/images/alumnos/ (formato 3:4, sin la interfaz del celular).
  Cargar solo fotos que la persona haya autorizado a publicar.
  Si la lista queda vacía, la sección no se muestra.
*/

export type StudentResult = {
  name: string;
  since: string;
  before: string;
  after: string;
};

export const studentResults: StudentResult[] = [
  {
    name: "Alumna de Wonder Program",
    since: "Empezó en marzo de 2024",
    before: "/images/alumnos/alumna-1-antes-cuerpo.jpg",
    after: "/images/alumnos/alumna-1-despues-cuerpo.jpg",
  },
];
