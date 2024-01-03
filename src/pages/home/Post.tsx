import { PostProps } from "../../interface/interfaces";
import { ThumbsUpFree } from "../../icons/ThumbsUpFree";
import { ThumbsUpLike } from "../../icons/ThumbsUpLike";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { Like } from "../../interface/interfaces";

export default function Post({ post }: PostProps) {
  const [likes, setLikes] = useState<Like[] | null>(null);
  const { title, desc, username, date, time, id } = post;
  const [user] = useAuthState(auth);
  const likesRef = collection(database, "likes");
  const likesDoc = query(likesRef, where("postId", "==", id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    const likesCount = data.docs.map((doc) => ({ userId: doc.data().userId, likeId:doc.id }));
    setLikes(likesCount);
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: id });
      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user?.uid, likeId: newDoc.id }] : [{ userId: user?.uid, likeId: newDoc.id  }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      //* Querying the specific like to delete
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", id),
        where("userId", "==", user?.uid)
      );
      //* Getting the data from the like
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      //* Getting it's id
      const likeId = likeToDeleteData.docs[0].id
      const likeToDelete = doc(database, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) => prev && prev?.filter((like)=>like.likeId != likeId));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-[350px] h-[300px] shadow-md bg-white p-2 relative rounded-md">
      <h2 className="font-bold text-lg">{title}</h2>
      <div>
        <p className="font-semibold text-sm ">{desc}</p>
      </div>
      <div className="absolute bottom-2 left-2">
        <p className="text-sm">
          {username} on {date} at {time}
        </p>
      </div>
      <button
        className="cursor-pointer absolute bottom-2 right-2"
        onClick={hasUserLiked ? removeLike : addLike}
      >
        <div className="flex">
          {hasUserLiked ? <ThumbsUpLike /> : <ThumbsUpFree />}
          {likes && <p>{likes.length}</p>}
        </div>
      </button>
    </div>
  );
}
