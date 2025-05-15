export const MOCK_NOTIFICATIONS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Notificação ${i + 1}`,
  message: `Esta é a mensagem da notificação número ${i + 1}`,
  date: new Date(Date.now() - i * 3600000), // Decrescente
  read: i % 3 === 0 // Algumas marcadas como lidas
}));