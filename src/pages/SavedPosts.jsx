import React, {  useEffect, useState } from "react";

// framer motin
import { motion } from "framer-motion";

import { useParams } from "react-router-dom";

// firebase
import {
    collection,
    doc,
    getDoc,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { firestore, storage } from "../firebase/config";

// components
import ProfilePostCard from "../components/ProfilePostCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

// icons
import NotFound from "../components/NotFound";
import Loading from "../components/Loading";

const SavedPosts = () => {
    const params = useParams();
    const { username } = params;
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [postIds, setPostIds] = useState([]);
    const [profileUser, setProfileUser] = useState(null);
    const [noUser, setNoUser] = useState(true);

    useEffect(() => {
        const getData = async () => {
            const userQuery = query(
                collection(firestore, "user"),
                where("username", "==", username)
            );
            onSnapshot(userQuery, (users) => {
                // console.log(users);
                if (!users.empty) {
                    setPostIds(users?.docs[0]?.data()?.savedPost);
                    setProfileUser({ id: users.docs[0].id, ...users?.docs[0]?.data() });
                    setIsLoading(false);
                    setNoUser(false);
                    // console.log(noUser);
                }
                if (users.empty) {
                    setProfileUser(null);
                    // console.log(noUser);
                    // console.log({ id: users.docs[0].id, ...users?.docs[0]?.data() });
                    setIsLoading(false);
                    setNoUser(true);
                }
            });
        };
        getData();
    }, [username]);

    useEffect(() => {
        const readIds = async (ids) => {
            const reads = ids.map((id) => getDoc(doc(firestore, "posts", `${id}`)));
            const result = await Promise.all(reads);
            return result?.map((doc) => ({ id: doc?.id, ...doc.data() }));
        };
        if (postIds?.length > 0) {
            const getData = async () => {
                try {
                    const response = await readIds(postIds);
                    if (response) {
                        setPosts(response);
                        // console.log(response);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            getData();
        }
    }, [postIds]);

    return (
        <div>
            <Header />
            <div className="mt-16 min-h-screen">
                {profileUser && (
                    <main className="bg-gray-100 bg-opacity-25">
                        <div className="lg:max-w-5xl lg:mx-auto mb-8">

                            {/* posts */}
                            <div className="px-px md:px-3">
                                {/* user following for mobile only */}
                                <ul
                                    className="flex md:hidden justify-around space-x-8 border-t
                text-center p-2 text-gray-600 leading-snug text-sm"
                                >
                                    <li>
                    <span className="font-semibold text-gray-800 block">
                      {profileUser?.savedPost?.length || 0}{" "}
                    </span>
                                        Saved Posts
                                    </li>
                                </ul>
                                {/* flexbox grid */}
                                {posts?.length === 0 && (
                                    <div className="flex items-center justify-center h-screen">
                                        <div className="text-center">No posts yet</div>
                                    </div>
                                )}
                                <motion.div
                                    layout
                                    className="grid grid-cols-3 md:gap-8 gap-1 md:p-2 p-1"
                                >
                                    {posts?.reverse().map((post, index) => (
                                        <ProfilePostCard key={index} post={post} />
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </main>
                )}
                {isLoading && (
                    <>
                        <Loading />
                    </>
                )}
                {noUser && (
                    <div className="py-56 w-full flex items-center justify-center p-3">
                        <NotFound />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SavedPosts;
