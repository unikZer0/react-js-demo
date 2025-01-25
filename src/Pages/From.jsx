import { useEffect, useState } from "react";
import "../dist/styles.css";
import axios from "axios";
import HeroPages from "../components/HeroPages";
import { useLocation } from "react-router-dom";

function CarRental() {
  // Move ALL useState hooks to the top level
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const location = useLocation();
  const {
    pickUpandDropoff,
    pickTime,
    dropTime,
    startTime,
    endTime,
    car,
    days,
    total
  } = location.state || {};
  // console.log("Location state:", location.state);


  const handleImageChange = (e) => {
    const file = e.target.files[0]; // รับไฟล์ที่ผู้ใช้เลือก
    if (file) {
      setImageFile(file); // บันทึกไฟล์ในสถานะ
      const previewURL = URL.createObjectURL(file); // สร้าง URL สำหรับแสดงตัวอย่าง
      setImagePreview(previewURL); // บันทึก URL ในสถานะ
    }
  };
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    if (!formData.age || formData.age < 18 || formData.age > 120) {
      newErrors.age = "Please enter a valid age between 18 and 120";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid 5-digit zip code";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
    } else {
      setErrors(newErrors);
    }
  };

  // Loading state
  // if (isLoading) {
  //   return <div className="loading-state">ກຳລັງໂຫລດ...</div>;
  // }

  // // Error state
  // if (error) {
  //   return (
  //     <div className="error-state">
  //       <p>{error}</p>
  //       <button
  //         className="rent-button"
  //         onClick={() => window.location.reload()}
  //       >
  //         ລອງໃຫມ່
  //       </button>
  //     </div>
  //   );
  // }

  // Main render
  return (
    <>
      <HeroPages name="ເຊົ່າ" />
      <div className="info-from">
        <div className="car-rental-container">
          <div className="car-rental-card">
            <h2>{car.car_name}</h2>
            <div className="car-images">
              <img src={car.images} alt={car.car_name} />
            </div>
            <div className="car-details">
              <h3>ລາຍລະອຽດ</h3>
              <ul>
                <li>ປະເພດ: {car.car_type_name}</li>
                <li>ລາຄາຕໍ່ມື້: {car.price_daily} ກີບ</li>
                <li>ລາຄາລວມ: {days} ມື້ {total}ກີບ</li>
                <li>ສະຖານະ: {car.car_status}</li>
              </ul>
            </div>
            <div className="car-info">
              <div>
                <h1>Confirm Your Booking Details</h1>
                <div>
                  <p>
                    <strong>ບ່ອນຮັບ-ສົ່ງລົດ:</strong>{" "}
                    {pickUpandDropoff || "Not Provided"}
                  </p>
                  <p>
                    <strong>ວັນຮັບລົດ:</strong> {pickTime || "Not Provided"}
                  </p>
                  <p>
                    <strong>ວັນສົ່ງລົດ:</strong> {dropTime || "Not Provided"}
                  </p>
                  <p>
                    <strong>ເວລາຮັບລົດ:</strong> {startTime || "Not Provided"}
                  </p>
                  <p>
                    <strong>ເວລາສົ່ງລົດ:</strong> {endTime || "Not Provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="from">
          <form onSubmit={handleSubmit} className="form-container">
            <h2 className="form-title">PERSONAL INFORMATION</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="error-message">{errors.firstName}</p>
                )}
              </div>

              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="error-message">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && (
                  <p className="error-message">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="form-group">
                <label>Age *</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleChange}
                />
                {errors.age && <p className="error-message">{errors.age}</p>}
              </div>
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                placeholder="Enter your street address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && (
                <p className="error-message">{errors.address}</p>
              )}
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <p className="error-message">{errors.city}</p>}
              </div>

              <div className="form-group">
                <label>Zip Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Enter your zip code"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
                {errors.zipCode && (
                  <p className="error-message">{errors.zipCode}</p>
                )}
              </div>
            </div>
            <div className="form-group">
              <label>ຮູບບັດ</label>
              <input
                type="file"
                name="image"
                accept="image/*" // อนุญาตเฉพาะไฟล์รูปภาพ
                onChange={handleImageChange} // จัดการเมื่อผู้ใช้เลือกไฟล์
              />
              {imagePreview && ( // แสดงตัวอย่างรูปภาพหากมี
                <div>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "200px",
                      height: "auto",
                      marginTop: "10px",
                    }}
                  />
                </div>
              )}
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CarRental;
