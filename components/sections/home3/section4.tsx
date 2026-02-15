"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Section4SpeakerCard from "./Section4SpeakerCard";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 4,
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: true,

  navigation: {
    nextEl: ".h1n",
    prevEl: ".h1p",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    575: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    991: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1199: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1350: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
};

const speakerCards = [
  {
    id: 1,
    image: "/assets/img/all-images/team/team-img8.png",
    name: "Alex Robertson",
    role: "Finance Consultant",
  },
  {
    id: 2,
    image: "/assets/img/all-images/team/team-img9.png",
    name: "Alexy Sammo",
    role: "HR Consultant",
  },
  {
    id: 3,
    image: "/assets/img/all-images/team/team-img10.png",
    name: "Andrew Symonds",
    role: "Finance Consultant",
  },
  {
    id: 4,
    image: "/assets/img/all-images/team/team-img11.png",
    name: "Ben Stokes",
    role: "Finance Consultant",
  },
  {
    id: 5,
    image: "/assets/img/all-images/team/team-img8.png",
    name: "Alex Robertson",
    role: "Finance Consultant",
  },
  {
    id: 6,
    image: "/assets/img/all-images/team/team-img9.png",
    name: "Alexy Sammo",
    role: "HR Consultant",
  },
  {
    id: 7,
    image: "/assets/img/all-images/team/team-img10.png",
    name: "Andrew Symonds",
    role: "Finance Consultant",
  },
  {
    id: 8,
    image: "/assets/img/all-images/team/team-img11.png",
    name: "Ben Stokes",
    role: "Finance Consultant",
  },
];

export default function Section4() {
  return (
    <>
      <div className="team3-section-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="team2-header heading5 space-margin60">
                <h5>our 10+ event speakers</h5>
                <div className="space18" />
                <h2 className="text-anime-style-3">Our Event Speakers</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 team-slider-area2">
              <Swiper {...swiperOptions} className=" owl-carousel">
                {speakerCards.map((speaker) => (
                  <SwiperSlide key={speaker.id} className="our-team-boxarea">
                    <Section4SpeakerCard image={speaker.image} name={speaker.name} role={speaker.role} />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="owl-nav">
                <button type="button" role="presentation" className="owl-prev h1p">
                  <i className="fa-solid fa-angle-left" />
                </button>
                <button type="button" role="presentation" className="owl-next h1n">
                  <i className="fa-solid fa-angle-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
