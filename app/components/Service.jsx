import Image from "next/image";
import { Services } from "../utils/data";

const Service = () => {
  return (
    <section className='text-center px-5 py-10 lg:px-20' id='service'>
      <h2>ACTUALIZATION</h2>
      <p className='lg:text-center'>
        Web design for businesses! From conception to product UI/UX and
        developing web pages, I have got you covered.{" "}
        <strong>Here is how it works</strong>
      </p>

      {/* grid view of the services in a container */}
      <div className='grid grid-flow-row grid-cols-1 gap-5 mt-5 lg:grid-cols-3 aspect-auto'>
        {Services?.map((service) => {
          return (
            <figure className='card bg-gray-700 lg:h-full' key={service.id}>
              <Image
                className='mx-auto mt-5'
                src={service.icon || ""}
                width={100}
                height={100}
                alt='icon'
              />
              <figcaption className='p-3'>
                <h3 className='text-xl text-center font-bold'>
                  {service.title || ""}
                </h3>
                <p>{service.summary || ""}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
};

export default Service;
