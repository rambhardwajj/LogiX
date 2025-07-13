import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

const SocialLinks = ({ userData }: { userData: any }) => {
  return (
    <div className="flex flex-col gap-3  lg:block  ">
      {userData?.data.githubUrl && (
        <Link
          to={userData.data.githubUrl}
          target="_blank"
          className="flex   items-center gap-2 px-3 py-1 rounded-lg transition-colors text-sm text-gray-700"
        >
          <Github className="h-4 w-4 text-black" />
          <span className="truncate">
            {new URL(userData.data.githubUrl).hostname}
          </span>
        </Link>
      )}

      {userData?.data.linkedInUrl && (
        <Link
          to={userData.data.linkedInUrl}
          target="_blank"
          className="flex  items-center gap-2 px-3 py-1 rounded-lg transition-colors text-sm text-gray-700"
        >
          <Linkedin className="h-4 w-4 text-blue-700" />
          <span className="truncate">
            {new URL(userData.data.linkedInUrl).hostname}
          </span>
        </Link>
      )}

      {userData?.data.xUrl && (
        <Link
          to={userData.data.xUrl}
          target="_blank"
          className="flex  items-center gap-2 px-3 py-1 rounded-lg  transition-colors text-sm text-gray-700"
        >
          <Twitter className="h-4 w-4 text-sky-600" />
          <span className="truncate">
            {new URL(userData.data.xUrl).hostname}
          </span>
        </Link>
      )}
    </div>
  );
};

export default SocialLinks;
