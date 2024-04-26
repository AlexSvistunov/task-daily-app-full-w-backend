import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import todoReducer from './slices/todoSlice'

// async function methodPost() {
//   try {
//     const response = await fetch(`${URL}/api/auth/token/login/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },

//       body: JSON.stringify({ password: 'ivan', email: 'ivan@gmail.com' }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to login");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error!!!", error);
//     throw error;
//   }
// }

// methodPost()


// const object = {
//   3: {
//     name: 'Alex',
//     age: 19,
//   },
//   4: {
//     name: 'Pavel',
//     age: 19,
//   }
// }

// const arr = Object.keys(object)
// console.log(arr);

// console.log(Object.values(object));

// const arr2 = [2, 3, 4]

// if(Object.prototype.toString.call(arr2) === 'object Object') {
//   console.log('Это объект');
// } else {
//   console.log('Это чето другое');
// }

// console.log(Object.entries(object));

export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todoReducer,
  },
})


