import {collection, doc, getDoc, onSnapshot, query, where} from "firebase/firestore";
import {firestore} from "../firebase/config";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";


const Following = () => {

    const [suggestUsers, setSuggestUsers] = useState();
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const suggestUsers = async () => {  // suggest users

            const userData = await getDoc(doc(firestore, `/user/${user?.uid}`));
            const ids = userData.data()["following"];

            const q = query(
                collection(firestore, "user" ),
                where('userId' ,'in' , ids),
            );
            console.log(q);
            onSnapshot(q, (snapshot) => {
                const users = snapshot.docs?.map((doc) => ({
                    ...doc.data(),
                    id: doc?.id,
                }));
                setSuggestUsers(users.filter((i) => i.id !== user.uid));
            });
        };
        return suggestUsers();
    }, [user.uid]);

    return (
        <div>
            {suggestUsers?.slice(1, 10).map((item, index) => (
                <div
                    className="flex items-center  justify-between my-2"
                    key={index}
                >
                    <div className="flex gap-2 items-center">
                        <Link to={`/${item?.username}`}>
                            <img
                                src={item?.photoURL}
                                className="h-7 w-7 aspect-square object-cover rounded-full"
                                alt={item?.username}
                            />
                        </Link>
                        <div>
                            <Link
                                to={`/${item?.username}`}
                                className="text-sm font-semibold text-gray-800"
                            >
                                {item?.username}
                            </Link>
                            <p className="text-[10px] text-gray-500">{item.fullName}</p>
                        </div>
                    </div>
                    <Link
                        to={`/${item?.username}`}
                        className="text-xs font-bold text-blue-500"
                    >
                        View
                    </Link>
                </div>
            ))}
        </div>

    );
};

export default Following