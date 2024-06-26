
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index.js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);


// настройки аватара
// черная и белая тема
// сделать все на английском, например, цвета
// внешний вид сделать более ориентированный на фиолетовый акцентный, но чтобы все равно можно было переключить тему
// всякие ховеры и мелочи
// адаптив
// чтобы наверное нельзя было вписывать свои теги, но можно было нажать создать новый тег или своя менюшка где настраивать в настройках, напимрер
// фильтрацию по тегам
// сортировка по выполненным(внизу или вверху) или вообще ничего не происходит, но можно drag and drop перетаскивать самому
// внизу есть под линии выполненные, если нажимаешь на чекбокс - оно туда попадает, но можно сделать это и вручную - перетащить

// есть mobile app
// чтобы были теги сверху как на мобильной версии как табы
// у меня часто такое, что нужно обнулять стили, так вот, эту проблему я могу решить при помощи css module(наверное)
// essentials
// что-то сделать с тегами и сортировать по тегам, либо чтобы человек сам мог либо зайти, либо отсортировать по тегам
// проблема с деплоем с картинками: попробовать если перекинуть из папки images перекинется ли он в public assets - если да, то попробовать сделать, чтобы оно шло
// и по папкам, а так вообще можно перекинуть просто из этой папки и поправить пути(лучше 1 способ, чем этот)

// когда getStarted и пользователь не авторизован - можно что-нибудь лучше придумать, чем перекидывать на register. ну или в register плашка у вас уже есть аккаунт?
// хранить в куках token
// удалил email из redux
// а если запрос для получение email долго идет?

// если пользователь уже зареган или авторизован - то нет смысла ему переходить в роуты Login, Register


// register validation
// email
// creating-todo
// подумать в целом про запросы допустим к email или redux
// подумать про обработку ошибок
// а если токен недопустимый?

// нужно придумать акцентный цвет
// все ховеры, фокусы, focus-visible, active
// сначала проигрывает анимация, потом салют, потом он плавно едет, потом только уже отображается в done
// авторизацию похоже можно сломать. undefined token


// логин перебрасывает при ошибке
// навигация с логином
// box shadow на auth
// auth inputs
// adaptive create task
// page app main height 100vh + px
// ...props
// use hooks to not use same code over and over again
// вернуться на лендинг чтобы можно было
// обработка ошибок todoSlice, userSlice

