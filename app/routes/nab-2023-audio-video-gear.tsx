

import { Link } from "@remix-run/react";
import soundguy1 from "../../public/soundsguy1.jpeg";

export default function Article4() {
  return (
    <div>
      <div className=" mx-3 lg:mx-36">
        <h1 className="tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl">

    Highlights from NAB 2023  </h1>
        <img
          className="h-1/2 w-1/2 mx-auto my-auto "
          src={soundguy1}
          alt="airpods"
        />

        <div>
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">
            NAB is the go to trade show for Audio and Video gear.  <br />From Zaxcom to Sound Devices to Black Magic, NAB brings together all the major players in the broadcasting game. </p> <br />
          <p className='text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold'>
            It takes place every year in April at the Las Vegas Convention Center, attracting over 90,000 professionals from more than 160 countries. NAB showcases the latest innovations and solutions for creating, managing, delivering and monetizing content on multiple platforms. It also features conferences, workshops, awards and networking events that cover a wide range of topics and trends. NAB is the ultimate destination for anyone who wants to learn, connect and grow in the dynamic and evolving media landscape.
          </p>
          <br />

          <br />
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold"> For some highlights on NAB 2023, you can visit
            <a href='https://www.tvtechnology.com/news/nab-show-blackmagic-design-unveils-new-products-software' className='text-blue-500'>{" "}here</a>.
          </p>
          <br />
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold"> For some solid advice on film sound and sound mixers in NYC, you can visit
            <a href='https://www.nycsoundguy.com' className='text-blue-500'>{" "}NYC Sound Guy here</a>.
          </p>
          <p className="text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl">
            Go back{" "}
            <Link
              to="/"
              className=" text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl"
            >
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

