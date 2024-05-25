import { useSelector } from "react-redux";

export const URL = `http://127.0.0.1:8000`;

const array = [
  {
    everydayroutine: [
      {
        id: 1,
        user: 1,
        title: "213123",
        description: "123123",
        color_code: "#B0FFFA",
      },
      {
        id: 2,
        user: 1,
        title: "fsdfds",
        description: "sdffs",
        color_code: "#FCFF52",
      },
    ],
  },
  {
    studyroutine: [
      {
        id: 3,
        user: 1,
        title: "213123",
        description: "123123",
        color_code: "#B0FFFA",
      },
    ],
  },
];

// console.log(Object.keys(array[0]));
// const values = Object.values(array[0])
// values.forEach(el => {
//   el.forEach(innerEL => console.log(innerEL))
// })
// console.log(Object.values(array[0]).map(el => console.log(el)))

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
