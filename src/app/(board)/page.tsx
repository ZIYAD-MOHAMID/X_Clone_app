import Link from "next/link";
import Feed from "@/components/Feed";
import Share from "@/components/Share";

const Homepage = () => {
  return (
    <div className="">
      <div className="px-4 pt-4 flex justify-between text-textGray font-bold border-b-[1px] border-borderGray">
        <Link
          className="pb-3 flex items-center border-b-4 border-iconBlue"
          href="/"
        >
          For you
        </Link>
        <Link className="pb-3 flex items-center " href="/">
          Following
        </Link>
        <Link className="pb-3 flex items-center " href="/">
          React
        </Link>
        <Link className="pb-3 flex items-center " href="/">
          Naxt
        </Link>
        <Link className="pb-3 flex items-center " href="/">
          TypeScript
        </Link>
      </div>
      <Share />
      <Feed />
    </div>
  );
};

export default Homepage;
