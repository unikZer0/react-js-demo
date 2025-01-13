import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import Person1 from "../images/team/bounhieng.jpg";
import Person2 from "../images/team/unik.jpg";
import Person3 from "../images/team/bo.jpg";


function Team() {
  const teamPpl = [
    { img: Person1, name: "ທ້າວ ບຸນຮຽງ ສົມພົງ", job: "ນັກສຶກສາປີ4" },
    { img: Person2, name: "Michael Diaz", job: "ນັກສຶກສາປີ4" },
    { img: Person3, name: "Briana Ross", job: "ນັກສຶກສາປີ4" },
  ];
  return (
    <>
      <section className="team-page">
        <HeroPages name="ທີມ" />
        <div className="cotnainer">
          <div className="team-container">
            {teamPpl.map((ppl, id) => (
              <div key={id} className="team-container__box">
                <div className="team-container__box__img-div">
                  <img src={ppl.img} alt="team_img" />
                </div>
                <div className="team-container__box__descr">
                  <h3>{ppl.name}</h3>
                  <p>{ppl.job}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2>Book a car by getting in touch with us</h2>
              <span>
                <i className="fa-solid fa-phone"></i>
                <h3>(123) 456-7869</h3>
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Team;
