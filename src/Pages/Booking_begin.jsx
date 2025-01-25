import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import BookCar from "../components/BookCar";
import HeroPages from "../components/HeroPages";
import "../dist/styles.css";

function Booking_begin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [pickUpandDropoff, setPickUpandDropoff] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { pickUpandDropoff: initialPickUpandDropoff, pickTime: initialPickTime, dropTime: initialDropTime,startTime, endTime } = location.state || {};

  useEffect(() => {
    if (initialPickUpandDropoff) setPickUpandDropoff(initialPickUpandDropoff);
    if (initialPickTime) setPickTime(initialPickTime);
    if (initialDropTime) setDropTime(initialDropTime);

    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/cars/getAll");
        if (Array.isArray(response.data.data)) {
          setCarList(response.data.data);
        } else {
          setError("Invalid data format received from the server");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [initialPickUpandDropoff, initialPickTime, initialDropTime]);

  const calculateDaysAndTotal = (pickTime, dropTime, dailyRate) => {
    if (!pickTime || !dropTime || isNaN(dailyRate)) {
      return { days: 0, total: 0 };
    }

    const startDate = new Date(pickTime);
    const endDate = new Date(dropTime);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || startDate >= endDate) {
      return { days: 0, total: 0 };
    }

    const timeDifference = endDate - startDate;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    const totalCost = daysDifference * dailyRate;

    return { days: daysDifference, total: totalCost };
  };

  const openrent = (e, car) => {
    e.preventDefault();
    if (pickUpandDropoff === "" || pickTime === "" || dropTime === "") {
      alert("All fields are required!");
    } else {
      const { days, total } = calculateDaysAndTotal(pickTime, dropTime, car.price_daily);
      if (isNaN(days) || isNaN(total)) {
        alert("Invalid date or price calculation!");
      } else {
        navigate("/from", {
          state: {
            pickUpandDropoff,
            pickTime,
            dropTime,
            startTime,
            endTime,
            days,
            total,
            car
          },
        });
      }
    }
  };

  if (loading) {
    return <div className="loading-state">ກຳລັງໂຫລດ...</div>;
  }

  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
        <button className="rent-button" onClick={() => window.location.reload()}>
          ລອງໃຫມ່
        </button>
      </div>
    );
  }

  return (
    <>
      <HeroPages name="ຄົ້ນຫາ" />
      <BookCar />
      <div className="booking">
        <h1>ຜົນການຄົ້ນຫາ: ລົດທີ່ມີທັງຫມົດ</h1>
        <div className="booking__cards">
          {carList.map((car, index) => {
            const { days, total } = calculateDaysAndTotal(pickTime, dropTime, car.price_daily);
            return (
              <div className="car-card" key={index}>
                <img
                  src={car.images}
                  alt={car.car_name}
                  className="car-card__image"
                />
                <div className="car-card__content">
                  <h3 className="car-card__title">{car.car_name}</h3>
                  <p className="car-card__description">{car.descriptions}</p>
                  <div className="stroke"></div>
                  <div className="car-card__price">
                    <h4 className="car-card__price-amount">
                      ฿{car.price_daily}
                    </h4>
                    <p className="car-card__price-total">
                      {isNaN(total) ? "ไม่สามารถคำนวณราคาได้" : `รวม ${days} วัน ฿${total}`}
                    </p>
                  </div>
                  <div className="car-card-bnt">
                    <button onClick={(e) => openrent(e, car)} className="car-card-bnt__button">
                      ເຊົີາລົດ
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Booking_begin;
