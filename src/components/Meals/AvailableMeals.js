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
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [httpError, setHttpError] = useState(); // Error State

  useEffect(() => {
    // 여기에 aysnc 하면 안됨
    // http 요청 보내는 것은 비동기 task이다. async await을 사용하라
    const fetchMeals = async () => {
      // async는 항상 promise를 반환
      // setIsLoading(true);
      const response = await fetch(
        // 중첩된 내부함수로 입력
        "https://reactfood-726ac-default-rtdb.firebaseio.com/meals.json"
      ); // .json은 firebase에 가져올 때 가져오기위한 약속

      if (!response.ok) {
        throw new Error("Something went wrong"); // 생성된 오류 객체의 메시지 프로퍼티에 해당 문자열이 저장
      } // 이 다음 줄은 실행되지 않음

      const responseData = await response.json(); // promise 를 뱉기 때문에 await을 해줘야함.

      const loadedMeals = [];
      for (const key in responseData) {
        // 이 부분 문법 재밌네
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMelas(loadedMeals);
      setIsLoading(false);
    };

    // 이것이 promise 내부의 오류를 다룰 수 있는 promise만이 가능한 기존 방법
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

    // fetchMeals는 async 함수라는 사실을 명심!
    // 그래서 이건 항상 promise를 반환함.
    // promise대신 오류를 가져오는 경우 그 오류로 인해 해당 promise가 거부됨
    // 따라서 try/catch를 사용해서 그걸 래핑할 수 없음

    // try {
    //   fetchMeals();
    // } catch (error) {
    //   setIsLoading(false);
    //   setHttpError(error.message); // error라는 객체에는 디폴트로 message 프로퍼티를 갖음
    // }
  }, []);
  // useEffect에는 promise를 반환하며 안된다.
  // async await을 사용하려면 위와 같이 함수를 만들어줘야함.

  if (isLoading) {
    // 이게 true 면 아래 mealsList에 조차 도달안됨.
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

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
