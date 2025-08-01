import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-10">Choose Your Role</h1>

      <div className="flex gap-10">
        {/* Government */}
        <div
          onClick={() => navigate("/login/government")}
          className="w-32 h-32 bg-blue-300 flex items-center justify-center rounded-full cursor-pointer hover:bg-blue-400 text-center font-semibold shadow-lg"
        >
          Government
        </div>

        {/* User */}
        <div
          onClick={() => navigate("/login/user")}
          className="w-32 h-32 bg-green-300 flex items-center justify-center rounded-full cursor-pointer hover:bg-green-400 text-center font-semibold shadow-lg"
        >
          User
        </div>

        {/* Developer */}
        <div
          onClick={() => navigate("/login/developer")}
          className="w-32 h-32 bg-yellow-300 flex items-center justify-center rounded-full cursor-pointer hover:bg-yellow-400 text-center font-semibold shadow-lg"
        >
          Developer
        </div>
      </div>
    </div>
  );
}
