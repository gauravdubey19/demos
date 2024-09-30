import Image from "next/image";
import Carousel from "./ui/Carousel";
import { FiLinkedin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";

const About = () => {
  return (
    <>
      <section className="mt-[60px] w-full h-full overflow-hidden">
        <Hero />
        <OurPartners />
        <OurExecutives />
        <OurGoals />
      </section>
    </>
  );
};

export default About;

const Hero = () => {
  return (
    <div className="w-full h-full lg:h-[calc(100vh-60px)] flex-between flex-col md:flex-row gap-2 md:gap-6 px-4 md:px-0 py-5 md:py-8 animate-slide-down overflow-hidden">
      <div className="w-full h-52 md:h-full bg-[url('/assets/rightImage.png')] bg-cover bg-no-repeat rounded-xl md:rounded-l-none md:rounded-r-xl overflow-hidden"></div>
      <div className="w-full h-full flex items-center justify-start p-2 overflow-hidden">
        <div className="w-full lg:max-w-xl h-fit space-y-4 md:pr-3 lg:pr-5">
          <div className="">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold">
              What is
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-primary font-bold">
              CSK TEXTILE ?
            </h1>
          </div>
          <p className="text-xs md:text-sm lg:text-md xl:text-base text-justify">
            CSK Textile is a leading provider of high-quality textile products,
            known for our commitment to excellence and innovation in the
            industry. We specialize in producing a wide range of fabrics and
            materials that meet the diverse needs of our customers.{" "}
          </p>
          <p className="text-xs md:text-sm lg:text-md xl:text-base text-justify">
            With a focus on sustainability and advanced technology, CSK Textile
            delivers premium solutions that combine durability, comfort, and
            style. Whether you’re looking for custom designs or bulk orders, our
            experienced team is dedicated to delivering exceptional products
            that set the standard in the textile market.
          </p>
        </div>
      </div>
    </div>
  );
};

const OurPartners = () => {
  return (
    <>
      <div className="w-full h-fit space-y-2 md:space-y-4 py-4 overflow-hidden">
        <div className="w-full h-fit px-4 md:px-6 lg:px-8">
          <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
            Our Partners
          </h2>
        </div>
        <Carousel slidesToShow={4} autoplay={true}>
          {partners.map((p, index) => (
            <Image
              key={index}
              src={p.img}
              alt={p.title}
              title={p.title}
              width={400}
              height={300}
              objectFit="contain"
              className="w-fit h-24 object-contain cursor-default animate-slide-down"
            />
          ))}
        </Carousel>
      </div>
    </>
  );
};

const OurExecutives = () => {
  return (
    <>
      <div className="w-full h-fit space-y-2 md:space-y-4 py-4 overflow-hidden">
        <div className="w-full h-fit px-4 md:px-6 lg:px-8">
          <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
            Our Executives
          </h2>
        </div>
        <div className="px-4 md:px-16 lg:px-32 overflow-hidden">
          <Carousel slidesToShow={4} dots={true} className="mb-5">
            {executives.map((p, index) => (
              <div
                key={index}
                title={p.name}
                className="max-w-[190px] md:max-w-[240px] h-fit bg-[#FFF4E0] space-y-1 md:space-y-2 p-2 md:p-4 rounded-lg scale-95 hover:scale-100 shadow-sm hover:shadow-lg ease-in-out duration-300 overflow-hidden"
              >
                <Image
                  key={index}
                  src={p.img}
                  alt={p.name}
                  width={400}
                  height={300}
                  objectFit="contain"
                  className="w-fit h-[240px] sm:h-[240px] md:h-[220px] lg:h-[340px] object-cover cursor-default animate-slide-up"
                />
                <div className="w-full h-fit space-y-1">
                  <h3 className="text-black">{p.name}</h3>
                  <span className="text-gray-600 text-xs md:text-sm">
                    {p.position}
                  </span>
                  <div className="flex gap-2">
                    {p.socials.map((s, index) => (
                      <s.icon
                        key={index}
                        title={s.label}
                        className="text-gray-600"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

const OurGoals = () => {
  return (
    <div className="w-full h-full lg:h-[calc(100vh-60px)] px-4 md:px-0 py-5 md:py-8 animate-slide-down mb-4 overflow-hidden">
      <div className="w-full h-fit px-4 md:px-6 lg:px-8">
        <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          Our Goals
        </h2>
      </div>
      <div className="w-full h-full flex-between flex-col md:flex-row gap-2 md:gap-6">
        <div className="w-full h-full flex items-center justify-end p-2 overflow-hidden">
          <div className="w-full lg:max-w-xl h-fit space-y-4 md:pr-3 lg:pr-5">
            {ourGoals.map((goal, index) => (
              <div key={index} className="flex-center gap-2 md:gap-4">
                <div className="max-w-[20%] w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-primary flex-center p-2 md:p-3 overflow-hidden">
                  <Image
                    src={goal.img}
                    alt={`goal - ${goal.id}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-[80%] h-fit text-balanc">{goal.para}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-52 md:h-full rounded-xl md:rounded-l-xl md:rounded-r-none overflow-hidden">
          <Image
            src="/textile.png"
            alt="our goals"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const partners = [
  {
    _id: 1,
    title: "ZARA",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/1280px-Zara_Logo.svg.png",
  },
  {
    _id: 2,
    title: "Nike",
    img: "https://i.pinimg.com/originals/1d/79/1e/1d791eeeda45585927193e7f74c7a7db.png",
  },
  {
    _id: 3,
    title: "Levis",
    img: "https://thumbs.dreamstime.com/b/top-clothing-brand-logos-levis-logo-sports-equipment-sportswear-company-vector-icon-zaporizhzhia-ukraine-may-222305567.jpg",
  },
  {
    _id: 4,
    title: "Vogue",
    img: "https://cdn.freebiesupply.com/logos/thumbs/1x/vogue-logo.png",
  },
];

const executives = [
  {
    _id: 1,
    name: "Mr. Rajiv",
    position: "Founder & Chairman",
    img: "https://img.freepik.com/free-photo/closeup-confident-middle-aged-business-leader_1262-4820.jpg",
    socials: [
      {
        id: 1,
        label: "LinkedIn",
        icon: FiLinkedin,
        herf: "https://www.linkedin.com/",
      },
      { id: 2, label: "X", icon: FaXTwitter, herf: "https://x.com/" },
      {
        id: 3,
        label: "Instagram",
        icon: IoLogoInstagram,
        herf: "https://www.instagram.com/",
      },
    ],
  },
  {
    _id: 2,
    name: "Mr. Rhoit",
    position: "Executive director",
    img: "https://thumbs.dreamstime.com/b/attractive-confident-happy-successful-ceo-business-man-corporate-executive-isolated-white-people-office-concept-portrait-137916489.jpg",
    socials: [
      {
        id: 1,
        label: "LinkedIn",
        icon: FiLinkedin,
        herf: "https://www.linkedin.com/",
      },
      { id: 2, label: "X", icon: FaXTwitter, herf: "https://x.com/" },
      {
        id: 3,
        label: "Instagram",
        icon: IoLogoInstagram,
        herf: "https://www.instagram.com/",
      },
    ],
  },
  {
    _id: 3,
    name: "Mr. Viraj",
    position: "Product Manager",
    img: "https://st.depositphotos.com/1743476/1276/i/450/depositphotos_12765264-stock-photo-smiling-business-man.jpg",
    socials: [
      {
        id: 1,
        label: "LinkedIn",
        icon: FiLinkedin,
        herf: "https://www.linkedin.com/",
      },
      { id: 2, label: "X", icon: FaXTwitter, herf: "https://x.com/" },
      {
        id: 3,
        label: "Instagram",
        icon: IoLogoInstagram,
        herf: "https://www.instagram.com/",
      },
    ],
  },
  {
    _id: 4,
    name: "Mr. Ganesh",
    position: "Jr. Product Manager",
    img: "https://images.pexels.com/photos/17498579/pexels-photo-17498579/free-photo-of-black-and-white-portrait-of-a-man-wearing-eyeglasses.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    socials: [
      {
        id: 1,
        label: "LinkedIn",
        icon: FiLinkedin,
        herf: "https://www.linkedin.com/",
      },
      { id: 2, label: "X", icon: FaXTwitter, herf: "https://x.com/" },
      {
        id: 3,
        label: "Instagram",
        icon: IoLogoInstagram,
        herf: "https://www.instagram.com/",
      },
    ],
  },
];

const ourGoals = [
  {
    id: 1,
    para: "Our primary goal is to provide customers with top-quality textiles at the most affordable prices.",
    img: "/assets/pngs/award.png",
  },
  {
    id: 2,
    para: "We aim to bring premium, affordable textiles to every corner of India.",
    img: "/assets/pngs/bharat.png",
  },
  {
    id: 3,
    para: "We strive to make the process of ordering and receiving textiles as seamless as possible.",
    img: "/assets/pngs/truck.png",
  },
];
