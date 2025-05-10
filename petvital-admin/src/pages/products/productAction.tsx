// // services/api.ts
// import axios from "axios";

import axios from "axios";

// export const fetchDataApi = async () => {
//   const response = await axios.get(
//     "https://jsonplaceholder.typicode.com/posts"
//   );
//   return response.data;
// };

export const fetchDataApi = async () => {
  let list: any = [];
  console.log("awaaaaaaaaaa");

  try {
    const petCenterId = 1;
    // setIsLoading(true);
    const querySnapshot = await axios.get(
      `http://localhost:3010/api/v1/pet-clinic/products/${petCenterId}`
    );
    console.log({ querySnapshot });

    querySnapshot.data.forEach((doc: any) => {
      list.push({ ...doc });
    });
    return list;
  } catch (err) {
    console.log("*************");
    console.log(err);
    console.log("*************");
  }

  // return [
  //   {
  //     key: "1",
  //     id: "PROD001",
  //     productName: "Apple iPhone 14",
  //     productImage: "https://via.placeholder.com/100", // Sample placeholder image
  //     price: "$999.00",
  //     quentity: 2,
  //   },
  //   {
  //     key: "2",
  //     id: "PROD002",
  //     productName: "Samsung Galaxy S23",
  //     productImage: "https://via.placeholder.com/100",
  //     price: "$850.00",
  //     quentity: 1,
  //   },
  //   {
  //     key: "3",
  //     id: "PROD003",
  //     productName: "Sony WH-1000XM5 Headphones",
  //     productImage: "https://via.placeholder.com/100",
  //     price: "$399.00",
  //     quentity: 3,
  //   },
  //   {
  //     key: "4",
  //     id: "PROD004",
  //     productName: "Apple MacBook Air M2",
  //     productImage: "https://via.placeholder.com/100",
  //     price: "$1,299.00",
  //     quentity: 1,
  //   },
  //   {
  //     key: "5",
  //     id: "PROD005",
  //     productName: "Logitech MX Master 3S Mouse",
  //     productImage: "https://via.placeholder.com/100",
  //     price: "$99.99",
  //     quentity: 5,
  //   },
  // ];
};
