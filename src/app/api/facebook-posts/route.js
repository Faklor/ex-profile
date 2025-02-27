import { NextResponse } from 'next/server';

export async function GET() {
  // Здесь можно реализовать один из следующих подходов:
  // 1. Использовать RSS feed (если доступен)
  // 2. Использовать серверный токен Facebook API
  // 3. Использовать сервис-парсер
  
  // Пример тестовых данных
  const mockPosts = [
    {
      text: "Sample post content...",
      date: new Date().toISOString(),
      link: "https://www.facebook.com/dmitry.matveyev",
      image: "https://placeholderimage.jpg"
    },
    // Добавьте больше тестовых постов...
  ];

  return NextResponse.json(mockPosts);
} 