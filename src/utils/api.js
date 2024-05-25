
import { useSelector } from "react-redux";

export const URL = `http://127.0.0.1:8000`

// const sortTest = async () => {
//   try {
//     const response = await fetch(`${URL}/api/tasks-tag/`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Token ${localStorage.getItem('token')}`,
//       },
//     })
//     const data = await response.json()
//     console.log(data)
//   } catch (error) {
//     console.log(error.message)
//   }


// }

// sortTest()