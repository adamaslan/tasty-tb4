import { Link } from "@remix-run/react";
import studio from "../../public/studio.jpg";

export default function Article4() {
  return (
    <div>
      <div className=" mx-3 lg:mx-36">
        <h1 className="tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl">
          The 3 Keys To Getting Your Dream Frontend or Full Stack Engineer Job{" "}
        </h1>
        <img
          className="h-full w-full  "
          src={studio}
          alt="Studio by Warren Hansen"
        />

        <div>
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl">
            The three keys to becoming a successful Software Engineer are:
            L.A.B.
          </p>
          <ol className="text-left text-xl tracking-tight sm:text-2xl lg:text-2xl">
            <li className="pb-2">
              1. Learn - You can do this with online classes, peer programming,
              chatGPT, or just plain old college.
            </li>
            <li className="pb-2">
              2. Apply - How can you get a job if you don't apply for it.
              Wellfound,{" "}
              <a href="https://www.weworkremotely.com">
                <u>We Work Remotely</u>
              </a>
              , JSremote, and good ol Linkedin are all great for this.
            </li>
            <li className="pb-2">
              3. Build - It's hard to gain any experience without building
              something. What you build can also be put on a personal website or
              portfolio as well so its a win win to build build build. Start
              small and scale up. Creating features that might be asked in a
              coding interview is always a smart idea.
            </li>
          </ol>{" "}
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl">
            If you are looking for a career in tech, focusing on developing your
            coding skills in front-end or full-stack development is essential.
            You can increase your chances of landing software engineering jobs
            by following the three keys of L.A.B. - Learn, Apply, and Build.
            Online learning and peer programming are excellent ways to improve
            your coding skills and stay updated with the latest trends in the
            industry. Creating practical projects and building a personal
            portfolio can help you gain experience and showcase your skills to
            potential employers. Utilizing job search strategies such as We Work
            Remotely, JSremote, and LinkedIn can help you find remote work
            opportunities. Preparing for coding interviews by creating features
            that may be asked is a smart way to showcase your practical
            knowledge. Professional development and continuous learning are
            crucial for staying updated with the latest trends in the industry.
            By following these strategies and staying persistent, you can
            transform your passion for coding into a successful career in
            software engineering.{" "}
          </p>
        </div>
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
  );
}