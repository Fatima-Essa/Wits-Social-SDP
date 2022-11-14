import React, { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";


// icons

import { CgHeart as HeartIcon } from "react-icons/cg";
import { FaHeart as HeartFillIcon } from "react-icons/fa";
import { IoEllipsisHorizontalSharp as PostMenuIcon } from "react-icons/io5";
import { AiOutlineSmile as SmileIcon } from "react-icons/ai";
import { GoChevronRight as NextIcon } from "react-icons/go";
import { MdVerified as VerifiedIcon } from "react-icons/md";

import {
    addDoc,
    arrayRemove,
    collection,
    doc,
    limit,
    onSnapshot,
    query,
    serverTimestamp,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { firestore } from "../firebase/config";
import { AuthContext } from "../context/AuthContext";

//All the functionality needed in the home page
const HomePostCard = ({ post }) => {
    // declaring constants
    const [commentInput, setCommentInput] = useState("");
    const [commentsArr, setCommentsArr] = useState([]);
    const [limitNum, setLimitNum] = useState(2);
    const [liked, setLiked] = useState(false);
    //const [saved, setSaved] = useState(false);
    const { user } = useContext(AuthContext);
    const swiper = useSwiper();

    // This code will like a post. It does so by fetching the post reference and then updating the likedBy array to include the current user's UID.
    // Finally, it sets the liked variable to true.
    const likePost = async () => {
        const postRef = doc(firestore, `tweets/${post?.id}`);
        updateDoc(
            postRef,
            {
                likedBy: arrayUnion(user?.uid),
            },
            { merge: true }
        );
        setLiked(true);
    };

    // This code will unlike a post. It does so by fetching the post reference and then updating the likedBy array to exclude the current user's UID.
    // Finally, it sets the liked variable to false.
    const unlikePost = async () => {
        const postRef = doc(firestore, `tweets/${post?.id}`);
        updateDoc(
            postRef,
            {
                likedBy: arrayRemove(user?.uid),
            },
            {
                merge: true,
            }
        );
        setLiked(false);
    };



    // This is a function that submits a comment. It takes in an event (e) and prevents the default action from happening.
    // It then sets up a reference to the comments collection in the database. Next, it creates an object (commentData) with the data for the comment (userId, comment, commentedAt, username, isVerified, fullName, photoURL, and likes).
    // Finally, it adds the comment data to the database and clears the comment input field.
    const commentSubmit = (e) => {
        e.preventDefault();
        // console.log(post?.id, post);
        const commentsCollectionRef = collection(
            firestore,
            `tweets/${post?.id}/commentsCollection`
        );
        const commentData = {
            userId: user?.uid,
            comment: commentInput.trim(),
            commentedAt: serverTimestamp(),
            username: user?.username,
            isVerified: user?.isVerified,
            fullName: user?.displayName,
            photoURL: user?.photoURL,
            likes: 0,
        };
        addDoc(commentsCollectionRef, commentData);
        setCommentInput("");
    };

    //     This function uses the useEffect React hook. The code is fetching comments from a database and setting them to the state.
    //     The code is also checking to see if the current user has liked or saved the post, and setting those boolean values to the state as well.
    useEffect(() => {
        // console.log(user);
        const getComments = async () => {
            const q = query(
                collection(firestore, `tweets/${post?.id}/commentsCollection`),
                limit(limitNum)
            );

            onSnapshot(
                q,
                (docs) => {
                    const comments = docs.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc?.id,
                    }));
                    // console.log(comments);
                    setLiked(post?.likedBy?.includes(user?.uid));
                    //setSaved(post?.savedBy?.includes(user?.uid));
                    setCommentsArr(comments);
                },
                (err) => {
                    console.log(err);
                }
            );
        };
        getComments();
    }, [limitNum, post?.id, post?.likedBy,post?.savedBy, user?.uid]);

    return (
        // This is a post component.
        // The user's profile photo, username, and a menu button are displayed at the top of the post.
        // The post's image(s) are displayed in the middle of the post.
        // The user's likes and comments are displayed at the bottom of the post.
        // There is also a comment input at the bottom of the post for users to leave their own comments
        <div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="sm:mb-6 bg-white sm:border-[1px] rounded"
        >
            <div className="flex gap-3 items-center p-2 justify-between">
                <Link to={`/${post?.user?.username}`}>
                    <img
                        src={
                            post?.user?.photoURL ||
                            "https://parkridgevet.com.au/wp-content/uploads/2020/11/Profile-300x300.png"
                        }
                        className="rounded-full h-8 w-8 object-cover"
                        alt={post?.user?.fullName}
                    />
                </Link>
                <div className="flex-grow">
                    <Link to={`/${post?.user?.username}`} className="font-semibold">
                        {post?.user?.username}
                    </Link>
                </div>
                <button>
                    <PostMenuIcon />
                </button>
            </div>
            <Link to={`/p/${post?.id}`}>
                {post?.carouselMedia && (
                    <div className="relative">
                        <Swiper
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            modules={[Pagination]}
                        >
                            {post?.carouselMedia.map((media, index) => (
                                <SwiperSlide key={index}>
                                    <LazyLoadImage
                                        src={media?.src}
                                        placeholderSrc="https://cutewallpaper.org/24/image-placeholder-png/index-of-img.png"
                                        alt={post?.id}
                                        className="h-full w-full object-cover"
                                    />
                                </SwiperSlide>
                            ))}
                            <button
                                onClick={() => swiper.slidePrev()}
                                className="absolute top-[50%] translate-y-[-50%] right-3 p-1 aspect-square rounded-full bg-gray-200 text-slate-800 backdrop-opacity-50 z-50"
                            >
                                <NextIcon />
                            </button>
                            <button
                                onClick={() => swiper.slideNext()}
                                className="absolute top-[50%] translate-y-[-50%] rotate-180 left-3 p-1 aspect-square rounded-full bg-gray-200 text-slate-800 backdrop-opacity-40 z-50"
                            >
                                <NextIcon />
                            </button>
                        </Swiper>
                    </div>
                )}
            </Link>
            <div className="p-3">
                <div className="flex text-2xl md:py-3 w-full">
                    <div className="flex w-full text-slate-900 gap-2">
                        {liked ? (
                            <button onClick={unlikePost}>
                                <HeartFillIcon color="#ff2828" />
                            </button>
                        ) : (
                            <button onClick={likePost}>
                                <HeartIcon size={25} />
                            </button>
                        )}
                    </div>
                </div>
                <div className="text-sm font-semibold">
                    {post?.likedBy?.length > 0 && (
                        <>{post?.likedBy?.length?.toLocaleString()} likes</>
                    )}
                    <div className="my-2">
                        {post?.caption && (
                            <div className="text-sm text-gray-700">
                                <Link to={`/${post.user.username}`} className="font-bold">
                                    {post?.user?.username}
                                </Link>{" "}
                                {post?.caption}
                            </div>
                        )}
                    </div>
                    {commentsArr?.length > 0 && (
                        <div
                            onClick={() => setLimitNum(limitNum + 5)}
                            className="block text-xs my-3 text-slate-600 cursor-pointer"
                        >
                            View more comments
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-3" id="#comments">
                    {commentsArr?.map((comment) => (
                        <div key={comment?.id} className="flex justify-between gap-2">
                            <div>
                                <Link to={`/${comment?.username}`}>
                                    <img
                                        src={
                                            comment?.photoURL ||
                                            "https://parkridgevet.com.au/wp-content/uploads/2020/11/Profile-300x300.png"
                                        }
                                        className="h-8 w-8 rounded-full aspect-square object-fill"
                                        alt={comment?.fullName}
                                    />
                                </Link>
                            </div>
                            <div className="flex flex-grow gap-1">
                                <b className="inline-flex">
                                    <Link to={`/${comment?.username}`}>{comment?.username}</Link>
                                    {comment?.isVerified && (
                                        <span className="aspect-square rounded-full text-blue-500">
                      <VerifiedIcon />
                    </span>
                                    )}
                                </b>
                                <span className="font-normal">
                  {comment?.comment?.length > 20
                      ? `${comment?.comment?.slice(0, 20)}...`
                      : comment?.comment}
                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className=" sm:block sm:border-t-[1px] text-slate-900 p-3 border-slate-500/30">
                <form onSubmit={commentSubmit}>
                    <div className="flex items-center gap-3">
                        <SmileIcon size={24} />
                        <input
                            type="text"
                            className="w-full text-sm outline-none font-light"
                            placeholder="Add a comment..."
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={commentInput.length <= 0}
                            className="text-blue-500 font-semibold text-sm"
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HomePostCard;
