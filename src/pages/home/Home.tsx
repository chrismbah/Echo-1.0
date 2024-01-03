import { getDocs, collection } from "firebase/firestore";
import { database } from "../../config/firebase";
import { useState, useEffect } from "react";
import { IPost } from "../../interface/interfaces";
import Post from "./Post";
import Spinner from "../../components/Spinner";

export default function Home() {
  const [postsList, setPostsList] = useState<IPost[] | null>(null);
  const postsRef = collection(database, "posts"); // Gets the data from the database
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  const getPosts = async () => {
    try {
      const data = await getDocs(postsRef);
      const list = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as IPost[];
      setPostsList(list);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      // setError("true");
    }
  };

  useEffect(() => {
    getPosts();
    // console.log(process.env)
  }, []);

  return (
    <div className="section">
      <div className="header mb-4">
        <h1 className="heading1">Home</h1>
        <div className="blue-line" />
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-[65vh]">
          <Spinner />
        </div>
      ) : (
        <div className="flex gap-4 items-center justify-center flex-wrap">
          {postsList?.map((post) => (
            <Post post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
