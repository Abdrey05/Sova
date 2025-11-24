import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/entities/user/slice/userSlice";

// создаем store - глобальное хранилище информации для всего приложения
// прокидываем в него все редюсеры, которые будут использоваться (в данном случае только userReducer)
export const store = configureStore({
  reducer: { user: userReducer },
});


// экспортируем типы для типизации кастомных хуков useAppSelector и useAppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
