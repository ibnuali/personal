const Home = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="grid grid-cols-1 gap-4 lg:flex lg:flex-col ">
        <span className="text-[30px] md:text-[60px] lg:text-[90px] font-bold text-white">Hello I'm</span>
        <span className="text-[30px] md:text-[60px] lg:text-[90px] font-bold text-white">Ibnu Ali M</span>
        <p className="text-md md:text-lg lg:text-lg font-extralight text-white w-full lg:w-1/2">
          I'm a passionate full-stack developer with expertise in Node.js and
          React.js, creating seamless and efficient web solutions from backend
          to frontend.
        </p>
        <div className="grid grid-cols-1 lg:flex gap-4 mt-8">
          <button className="ring-red-500 hover:bg-red-500 hover:text-white ring-1 text-white font-bold py-2 px-4 rounded-full">
            <a target="_blank" href="./docs/cv.pdf">Download CV</a>
          </button>
          <button
            type="button"
            className="ring-red-500 hover:bg-red-500 hover:text-white ring-1 text-white font-bold py-2 px-4 rounded-full"
          >
            <a target="_blank" href="https://www.linkedin.com/in/ibnuali/">
              Hire Me
            </a>
          </button>
        </div>
      </div>
      <img
        className="hidden md:block w-48 h-48 xl:w-96 xl:h-96 rounded-full"
        alt="Ibnu Ali"
        src="./avatar.jpg"
      />
    </div>
  );
};

export default Home;
