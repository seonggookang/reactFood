import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [melas, setMelas] = useState([]);

  useEffect(() => {
    // 여기에 aysnc 하면 안됨
    // http 요청 보내는 것은 비동기 task이다. async await을 사용하라
    const fetchMeals = async () => {
      const response = await fetch(
        // 중첩된 내부함수로 입력
        "https://reactfood-726ac-default-rtdb.firebaseio.com/meals.json"
      ); // .json은 firebase에 가져올 때 가져오기위한 약속
      const responseData = await response.json(); // promise 를 뱉기 때문에 await을 해줘야함.

      const loadedMeals = [];
      for (const key in responseData) {
        console.log(responseData);
        // console.log(responseData[key]);
        // console.log(responseData[key]);
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      console.log("loadedMeals>>", loadedMeals);
      setMelas(loadedMeals);
    };
    fetchMeals();
  }, []);
  // useEffect에는 promise를 반환하며 안된다.
  // async await을 사용하려면 위와 같이 함수를 만들어줘야함.
  const mealsList = melas.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
