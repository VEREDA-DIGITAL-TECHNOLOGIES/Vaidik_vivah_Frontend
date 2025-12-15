
import {
  useContactNumberByUserIdQuery,
  
} from "../../Redux/Api/profile.api";

interface Props {
  userId?: string;
}

const ContactNumberOnlyView = ({ userId }: Props) => {
 

  

  // GET
  const { data, isLoading } =
    useContactNumberByUserIdQuery(userId, { skip: !userId });

  

 

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {/* DISPLAY VIEW */}
      <div className="flex items-center gap-3">
        <span className="text-gray-800 font-medium">
          {data?.contactNumber || "N/A"}
        </span>
      </div>

      
    </>
  );
};

export default ContactNumberOnlyView;
