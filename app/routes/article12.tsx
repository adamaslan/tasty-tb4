import { Link } from "@remix-run/react";
import webstorm1 from "../../public/webstorm1.jpeg";

export default function Article12() {
  return (
    <div>
      <div className="mx-3 lg:mx-36">
        <h1 className="tracking-light text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl">
          The Three WebStorm Shortcuts to Rule Them All
        </h1>
        <img
          className="h-1/2 w-1/2 mx-auto my-auto"
          src={webstorm1}
          alt="WebStorm logo"
        />
        <div>
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">
            WebStorm is a smart IDE for web development. Keyboard shortcuts can
            help you write, debug, and test your code faster. Here are three
            shortcuts that you should know.
          </p>
          <br />
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">
            1. Speed search
          </p>
          <p className="text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">
            Press Shift + Up and then type the name of any file you want to find
            in WebStorm. You will see a list of suggestions. Press Enter to
            select an item. This also gets you to the navigation bar so you can clear up the file tree for a more zen like experience.
          </p>
          <br />
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">
            2. Recent files
          </p>
          <p className="text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">
            Press Command + E and you will see a list of recent files that you
            have accessed. Press Enter to select a file.
          </p>
          <br />
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">
            3. Action search
          </p>
          <p className="text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">
            Press Command + Shift + A and type the name of the action you want
            to execute. You will see a list of suggestions. Press Enter to
            execute an action.
          </p>
          <br />
          <p className="text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">
           Use these new powers carefully ;)
          </p>
          <br />
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold"> For more shortcuts check this article out
            <a href='https://blog.jetbrains.com/webstorm/2020/07/navigation-features-that-will-make-you-faster/' className='text-blue-500'>{" "}here</a>.
          </p>
          <br />

          <p className="text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl">
            Go back{" "}
            <Link
              to="/"
              className="text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl"
            >
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
