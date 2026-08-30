// Número de WhatsApp de contacto (formato: código país + número, sin "+" ni espacios).
// Se puede sobrescribir con la variable de entorno VITE_WHATSAPP_NUMERO
// creando un archivo .env en la raíz del proyecto con:
//   VITE_WHATSAPP_NUMERO=56912345678
export const WHATSAPP_NUMERO = import.meta.env.VITE_WHATSAPP_NUMERO ?? '56997331565';

// Margen de seguridad bajo el límite práctico de longitud de URL de WhatsApp (~2000 caracteres)
export const WHATSAPP_MENSAJE_MAX_LARGO = 1800;

// Correo de contacto para cotizaciones. Se puede sobrescribir con VITE_CONTACTO_EMAIL en .env
export const CONTACTO_EMAIL = import.meta.env.VITE_CONTACTO_EMAIL ?? 'Logistica.jarias@gmail.com';

// Límite de seguridad para el largo del link mailto (algunos clientes de correo truncan cerca de 2000 caracteres)
export const EMAIL_MENSAJE_MAX_LARGO = 1500;