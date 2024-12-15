import Input from "./ui/Input";

const Contact = () => {
  return (
    <div>
      <p className="text-lg text-white font-light mx-auto">
        Let’s connect! I’d love to hear from you. Whether you have a question,
        an idea, or just want to chat about opportunities, feel free to reach
        out using the form below.
      </p>
      <form action="" className="flex flex-col gap-4 mt-10">
        <label htmlFor="name" className="text-lg font-extralight text-white">
          Your Name
        </label>
        <Input
          type="text"
          id="name"
          placeholder="Name"
          className="input input-bordered"
        />
        <label htmlFor="email" className="text-lg font-extralight text-white">
          Your Email
        </label>
        <Input
          type="email"
          placeholder="Email"
          className="input input-bordered"
        />
       
        <button className="ring-red-500 hover:bg-red-500 hover:text-white ring-1 text-white font-bold py-2 px-4 rounded-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
