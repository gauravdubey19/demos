import Image from "next/image";
import Carousel from "./ui/Carousel";

const About = () => {
  return (
    <>
      <section className="mt-[60px] w-full h-full overflow-hidden">
        <Hero />
        <OurPartners />
        <OurExecutives />
      </section>
    </>
  );
};

export default About;

const Hero = () => {
  return (
    <div className="w-full h-full md:h-[calc(100vh-60px)] flex-between flex-col md:flex-row gap-2 md:gap-6 px-4 md:px-0 py-5 md:py-8 overflow-hidden">
      <div className="w-full h-52 md:h-full bg-[url('/assets/rightImage.png')] bg-cover bg-no-repeat rounded-xl md:rounded-r-xl overflow-hidden"></div>
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
          <h2 className="text-md md:text-lg lg:text-xl xl:text-2xl font-bold">
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
              className="w-fit h-24 object-contain cursor-default"
            />
          ))}
        </Carousel>
      </div>
    </>
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

const OurExecutives = () => {
  return (
    <>
      <div className="w-full h-fit space-y-2 md:space-y-4 py-4 overflow-hidden">
        <div className="w-full h-fit px-4 md:px-6 lg:px-8">
          <h2 className="text-md md:text-lg lg:text-xl xl:text-2xl font-bold">
            Our Executives
          </h2>
        </div>
        <Carousel slidesToShow={4} className="px-4 md:px-8 lg:px-12">
          {executives.map((p, index) => (
            <div
              key={index}
              className="max-w-[190px] md:max-w-[240px] h-fit bg-[#FFF4E0] space-y-2 md:space-y-4 p-2 md:p-4 overflow-hidden br"
            >
              <Image
                key={index}
                src={p.img}
                alt={p.name}
                title={p.name}
                width={400}
                height={300}
                objectFit="contain"
                className="w-fit h-[240px] sm:h-[240px] md:h-[220px] lg:h-[340px] object-contain cursor-default"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

const executives = [
  {
    _id: 1,
    name: "Mr. Rajiv",
    position: "Mr. Rajiv",
    img: "https://img.freepik.com/free-photo/closeup-confident-middle-aged-business-leader_1262-4820.jpg",
    socials: [
      { id: 1, label: "LinkedIn", icon: "linkedIn", herf: "" },
      { id: 2, label: "X", icon: "x", herf: "" },
      { id: 3, label: "Instagram", icon: "instagram", herf: "" },
    ],
  },
  {
    _id: 2,
    name: "Mr. Rhoit",
    position: "Mr. Rhoit",
    img: "https://thumbs.dreamstime.com/b/attractive-confident-happy-successful-ceo-business-man-corporate-executive-isolated-white-people-office-concept-portrait-137916489.jpg",
    socials: [
      { id: 1, label: "LinkedIn", icon: "linkedIn", herf: "" },
      { id: 2, label: "X", icon: "x", herf: "" },
      { id: 3, label: "Instagram", icon: "instagram", herf: "" },
    ],
  },
  {
    _id: 3,
    name: "Mr. Viraj",
    position: "Mr. Viraj",
    img: "https://st.depositphotos.com/1743476/1276/i/450/depositphotos_12765264-stock-photo-smiling-business-man.jpg",
    socials: [
      { id: 1, label: "LinkedIn", icon: "linkedIn", herf: "" },
      { id: 2, label: "X", icon: "x", herf: "" },
      { id: 3, label: "Instagram", icon: "instagram", herf: "" },
    ],
  },
  {
    _id: 4,
    name: "Mr. Ganesh",
    position: "Mr. Ganesh",
    img: "https://images.pexels.com/photos/17498579/pexels-photo-17498579/free-photo-of-black-and-white-portrait-of-a-man-wearing-eyeglasses.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    socials: [
      { id: 1, label: "LinkedIn", icon: "linkedIn", herf: "" },
      { id: 2, label: "X", icon: "x", herf: "" },
      { id: 3, label: "Instagram", icon: "instagram", herf: "" },
    ],
  },
];
