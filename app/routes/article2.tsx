import { Link} from "@remix-run/react";


export default function Article1() {


  return (


    <div className="h-full w-80 border-r bg-gray-50">
      <Link to="/article1" className="block p-4 text-xl text-blue-500">
        ARTICLE 1
      </Link>




      <p className="p-4">Article 2</p>
    </div>

  );
}