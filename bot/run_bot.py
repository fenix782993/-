import asyncio
from aiogram import Bot, Dispatcher, types, F
from aiogram.utils.keyboard import InlineKeyboardBuilder

# --- НАСТРОЙКИ ---
BOT_TOKEN = "8859672026:AAEw_rdOt0fz6stV9wb9KjgOKXFu8ccQ5Wo"
# Ссылка на твою игру на Amvera
WEBAPP_URL = "https://fenix782993.github.io/money/"

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

@dp.message(F.text == "/start")
async def start_game(message: types.Message):
    kb = InlineKeyboardBuilder()
    kb.button(
        text="🔥 ИГРАТЬ В FENIX COMBAT", 
        web_app=types.WebAppInfo(url=WEBAPP_URL)
    )
    
    await message.answer(
        f"🦅 Привет, {message.from_user.first_name}! Добро пожаловать в Fenix Combat!\n\n"
        f"Тапай по Фениксу, зарабатывай FenixCoin (FXC) и качай пассивный доход!\n\n"
        f"Жми кнопку ниже 👇",
        reply_markup=kb.as_markup()
    )

async def main():
    print("🟢 Бот успешно запущен локально на ПК и слушает команды...")
    await dp.start_polling(bot)

if __name__ == '__main__':
    asyncio.run(main())