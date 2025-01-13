import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BookCar() {
  const navigate = useNavigate();

  // State สำหรับฟอร์ม
  const [pickUpandDropoff, setpickUpandDropoff] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");

  // ฟังก์ชันจัดการการเปลี่ยนค่าในฟอร์ม
  const handlePickandDropo = (e) => {
    setpickUpandDropoff(e.target.value);
    localStorage.setItem("pickUpandDropoff", e.target.value); // เก็บค่าใน Local Storage
  };

  const handlePickTime = (e) => {
    const selectedDate = e.target.value;
    setPickTime(selectedDate);
    localStorage.setItem("pickTime", selectedDate); // เก็บค่าใน Local Storage
    const dropTimeInput = document.getElementById("droptime");
    dropTimeInput.setAttribute("min", selectedDate);
  };

  const handleDropTime = (e) => {
    const selectedDate = e.target.value;
    setDropTime(selectedDate);
    localStorage.setItem("dropTime", selectedDate); // เก็บค่าใน Local Storage
  };

  const handleStartTimeChange = (e) => {
    const time = e.target.value;
    setStartTime(time);
    localStorage.setItem("startTime", time); // เก็บค่าใน Local Storage
  };

  const handleEndTimeChange = (e) => {
    const time = e.target.value;
    setEndTime(time);
    localStorage.setItem("endTime", time); // เก็บค่าใน Local Storage
  };

  // ดึงข้อมูลจาก Local Storage เมื่อคอมโพเนนต์โหลด
  useEffect(() => {
    const storedPickUpandDropoff = localStorage.getItem("pickUpandDropoff");
    const storedPickTime = localStorage.getItem("pickTime");
    const storedDropTime = localStorage.getItem("dropTime");
    const storedStartTime = localStorage.getItem("startTime");
    const storedEndTime = localStorage.getItem("endTime");

    if (storedPickUpandDropoff) setpickUpandDropoff(storedPickUpandDropoff);
    if (storedPickTime) setPickTime(storedPickTime);
    if (storedDropTime) setDropTime(storedDropTime);
    if (storedStartTime) setStartTime(storedStartTime);
    if (storedEndTime) setEndTime(storedEndTime);

    // ตั้งค่า min date
    const today = new Date();
    const minDate = today.toISOString().split("T")[0];
    const pickTimeInput = document.getElementById("picktime");
    const dropTimeInput = document.getElementById("droptime");

    if (pickTimeInput) pickTimeInput.setAttribute("min", minDate);
    if (dropTimeInput) dropTimeInput.setAttribute("min", minDate);
  }, []);

  const opensearch = (e) => {
    e.preventDefault();
    if (pickUpandDropoff === "" || pickTime === "" || dropTime === "") {
      alert("All fields are required!");
    } else {
      navigate("/booking", {
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

  // สร้างตัวเลือกเวลา
  const generateTimes = () => {
    const timesArray = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedTime = `${String(hour).padStart(2, "0")}:${String(
          minute
        ).padStart(2, "0")}`;
        timesArray.push(formattedTime);
      }
    }
    return timesArray;
  };

  const times = generateTimes();

  return (
    <>
      <section id="booking-section" className="book-section">
        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Book a car</h2>
              <form onSubmit={opensearch} className="box-form">
                <div className="box-form__car-type">
                  <label>ບ່ອນຮັບ-ສົ່ງລົດ *</label>
                  <select
                    value={pickUpandDropoff}
                    onChange={handlePickandDropo}
                  >
                    <option value="">Select pick up location</option>
                    <option value="ລົດໄຟສາຍໃຕ້">ລົດໄຟສາຍໃຕ້</option>
                    <option value="ສະຫນາມບິນວັດໄຕ">ສະຫນາມບິນວັດໄຕ</option>
                  </select>
                </div>

                <div className="box-form__car-time">
                  <label>ວັນຮັບລົດ *</label>
                  <input
                    id="picktime"
                    type="date"
                    value={pickTime}
                    onChange={handlePickTime}
                  />
                </div>

                <div className="box-form__car-time">
                  <label>ວັນສົ່ງລົດ *</label>
                  <input
                    id="droptime"
                    type="date"
                    value={dropTime}
                    onChange={handleDropTime}
                  />
                </div>

                <div className="box-form__time">
                  <label>ເວລາຮັບລົດ *</label>
                  <select value={startTime} onChange={handleStartTimeChange}>
                    {times.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="box-form__time">
                  <label>ເວລາສົ່ງລົດ *</label>
                  <select value={endTime} onChange={handleEndTimeChange}>
                    {times.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BookCar;
