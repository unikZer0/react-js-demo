import BookCar from "../components/BookCar";
import HeroPages from "../components/HeroPages";
import "../dist/styles.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { cars } from "./carsData";
function Booking_begin() {
  const navigate = useNavigate();
  const location = useLocation();

  // รับค่าที่ส่งมาจาก bookcar.jsx
  const { pickUpandDropoff, pickTime, dropTime, startTime, endTime } =
    location.state || {};

  const openrent = (e) => {
    e.preventDefault();
    if (pickUpandDropoff === "" || pickTime === "" || dropTime === "") {
      alert("All fields are required!");
    } else {
      navigate("/from", {
        state: {
          pickUpandDropoff,
          pickTime,
          dropTime,
          startTime,
          endTime,
        },
      });
    }
  };
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    // Simulating an API call by using the imported data
    // const response = await axios.get('your-api-url');
    // setCarList(response.data.cars);
    setCarList(cars);
  }, []);

  return (
    <>
        <HeroPages name="ຄົ້ນຫາ" />
        <BookCar />
        <div className="booking">
          {" "}
          <h1>ຜົນການຄົ້ນຫາ: ລົດທີ່ມີທັງຫມົດ</h1>
          <div className="booking__cards">
            {carList.map((car, index) => (
              <div className="car-card" key={index}>
                <img
                  src={car.image}
                  alt={car.title}
                  className="car-card__image"
                />
                <div className="car-card__content">
                  <h3 className="car-card__title">{car.title}</h3>
                  <p className="car-card__description">{car.description}</p>
                  <p className="car-card__insurance">{car.insurance}</p>
                  <div className="car-card__rating">
                    <span className="car-card__rating__badge">
                      {car.rating.badge}
                    </span>
                    <span>{car.rating.company}</span>
                    <span className="car-card__rating__stars">
                      ⭐ {car.rating.stars} ({car.rating.reviews} รีวิว)
                    </span>
                  </div>
                  <div className="stroke"></div>
                  <div className="car-card__price">
                    <h4 className="car-card__price-amount">
                      ฿{car.price.daily}
                    </h4>
                    <p className="car-card__price-total">
                      รวม {car.price.days} วัน ฿{car.price.total}
                    </p>
                  </div>
                  <div className="car-card-bnt">
                    <button onClick={openrent} className="car-card-bnt__button">
                      ເຊົີາລົດ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </>
  );
}

export default Booking_begin;
