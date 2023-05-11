

import { Link } from "@remix-run/react";
import blender1 from "../../public/blender1.jpeg";

export default function Article4() {
  return (
    <div>
      <div className=" mx-3 lg:mx-36">
        <h1 className="tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl">

        The Pie Menu Rocks in Blender      </h1>
        <img
          className="h-1/2 w-1/2 mx-auto my-auto "
          src={blender1}
          alt="Studio by Warren Hansen"
        />

        <div>
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">
            Using the pie menu is a quick method of accessing the Numpad hot keys and unlike Numpad emulation, it does not mess with the default shortcuts.
            For accessing that pie menu you need to press the backtick (`), which is located above the tab button on the left-hand side of your keyboard.
          </p>
          <br />
          <p className='text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold'> The pie menu allows you to change the way you see your scene and objects in the 3D Viewport. You can choose between perspective and orthographic views, which affect the depth and distortion of your scene. You can also choose different angles to view your scene from, such as front, back, left, right, top and bottom. These angles can help you align and position your objects more precisely and easily. The view pie menu also has options to toggle quad view and toggle camera view, which can give you more control and flexibility over your scene layout and rendering. </p>


        <br />
        <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold"> For the vue docs, you can visit
          <a href='https://vuejs.org/' className='text-blue-500'>{" "}here</a>.
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

