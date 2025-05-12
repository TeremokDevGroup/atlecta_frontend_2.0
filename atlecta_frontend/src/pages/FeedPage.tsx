import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import { getAllUsers } from "../services/userService"; // путь поправь при необходимости
import { UserProfile } from "../types/user";

const FeedPage = () => {
    const [usersData, setUsersData] = useState<UserProfile[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers()
            .then((data) => setUsersData(data))
            .catch(console.error);
    }, []);

    return (
        <div className="bg-white min-h-screen w-full pt-14">
            <div className="px-4 py-8 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-blue-900 mb-2">ЛЕНТА</h1>
                <h2 className="text-xl font-semibold text-indigo-600 mb-6">
                    {usersData.length} активных пользователей
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {usersData.map((user) => (
                        <div key={user.user_id} className="w-full max-w-sm">
                            <UserCard
                                user={user}
                                onClick={() => navigate(`/profile/${user.user_id}`)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default FeedPage;
