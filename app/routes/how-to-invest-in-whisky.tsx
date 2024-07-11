import { Link } from "@remix-run/react";
import cask from "../../public/cask1.jpeg";
export default function Article5() {
  return (
    <div>
      {" "}
      <div className=" mx-3 lg:mx-36">
        {" "}
        <h1 className="tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl">
          {" "}
          3 Ways to Invest in Whiskey{" "}
        </h1>{" "}
        <img
          className="mx-auto my-auto h-1/2 w-1/2 "
          src={cask}
          alt="whiskey 8 bit barrels"
        />{" "}
        <div>
          {" "}
          <p className="text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl">
            {" "}Over 500 years of whiskey history makes one think, "wow, I bet there are some rare whiskeys out there." With so much culture surrounding whiskey, it seems a bottle’s narrative could drive its value through the roof if it was found in a shipwreck of a famous captain, in a secret chamber in a palace, or dating back to a time previously unknown to even be distilling whiskey. 

{" "}
          </p>
          <br />{" "}
          <p className="text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl">
            {" "}
            The reasons for rarities are endless, but thanks  to  <a href="https://www.rarewhiskey101.com/" className="text-blue-500">
              {" "}
   Rare Whiskey 101
            </a> it is easy to track the price of these rare whiskeys making them more of an asset than a commodity. With market performance indices tracking broader markets like Japanese whiskey, its easy to get an overarching perspective on the whiskey market. They also have a database of distillery specific indices of over 24 brands including Ardbeg, Bowmore, Glenfarclas, Glenfiddich, Laphroaig, Lagavulin, Rosebank, and Yamazaki.

          </p>{" "}
          <br />{" "}

          <p className='text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl'>Another way of investing in whiskey is to buy <a href="https://www.forbes.com/sites/forbesfinancecouncil/2023/10/18/5-things-to-know-when-investing-in-whiskey-bottles-or-barrels/" className="text-blue-500">
              {" "}
barrels
            </a>. 
One way is thru <a href="https://marketplace.mercata.blockapps.net/dp/0a3a3d282806135273d9e68d8b981d923461eadb/The%20Deuces%20Wild%20Collection%20-%20Whiskey%20Casks" className="text-blue-500">
              {" "}
BlockApps
            </a>, and their collaboration with Connecticut Distilling to create the Deuces Wild Collection. You can buy multiple casks and 2 years of cask storage are included with purchase.

 


You can also purchase casks with <a href="https://www.vinovest.co/" className="text-blue-500">
              {" "}
Vino Vest
            </a>, who offer a service to bottle the whiskey from your cask. 

          </p>


          <br />{" "}
          <p className="text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl">
            {" "}
            Whether you are purchasing a rare whiskey or an entire cask, the returns on these items have a clear track record of appreciation. 

            .{" "}
          </p>{" "}
          <p className="text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl">
            {" "}
            Go back{" "}
            <Link
              to="/"
              className=" text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl"
            >
              {" "}
              Home{" "}
            </Link>{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
