import { Link } from "react-router-dom";

interface ConnectionProps {
    senderImage: string;
    senderName: string;
    id:string;

}

const ConnectionAccepted = ({
    senderImage,
    senderName,
    id,
}: ConnectionProps) => {
    return (
        <div className="flex items-center max-md:flex-col bg-white space-y-2 space-x-4">

            <img
                src={senderImage}
                alt={senderName}
                className="w-12 h-12 rounded-full object-cover"
            />

            <div className="flex-1 max-md:text-center">
                <h4 className="text-lg font-medium text-gray-800">{senderName}</h4>
                <p className="text-sm text-gray-500">accepted your connection request</p>
            </div>
           
            <Link to={`/profile/${senderName?.split(" ")[0]}/${id}`}>
                   View Profile
                    </Link>
        </div>
    );
};

export default ConnectionAccepted;
  