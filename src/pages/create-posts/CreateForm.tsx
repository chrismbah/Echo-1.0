import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { CreateFormData } from "../../interface/interfaces";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom"

export default function CreateForm() {
  const [user] = useAuthState(auth);
  const date = new Date();
  const currentDate = date.toLocaleDateString();
  const currentTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const navigate = useNavigate()

  //* Skeleton of form
  const schema = yup.object().shape({
    title: yup.string().required("You must add a title"),
    desc: yup.string().required("You must add a description"),
    tag: yup.string().required("Enter a tag"),
    // author: yup.string().required("Enter author's name"),
  });

  //* Integrating the hook form and yup using yup resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  // Stores a collection of our app(database) called "posts" as a reference
  const postsRef = collection(database, "posts");

  const onCreatePost = async (data: CreateFormData) => {
    console.log(data);
    await addDoc(postsRef, {
      ...data,
      // title: data.title,
      // description: data.desc,
      username: user?.displayName,
      userId: user?.uid,
      date: currentDate,
      time: currentTime,
    });
    navigate("/")
  };
  //* handleSubmit automatically gives back the form data to the onCreatePost fnc
  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <div className="flex gap-3 flex-col">
        <div className="title">
          <h2>Title</h2>
          <input
            placeholder="Title..."
            type="text"
            {...register("title")}
            className=" w-[500px] p-2 text-sm "
          />
          <p className="error-msg">{errors.title?.message}</p>
        </div>
        <div className="tag">
          <h2>Tags</h2>
          <input
            placeholder="Enter Tags..."
            type="text"
            {...register("tag")}
            className=" w-[500px] p-2 text-sm "
          />
          <p className="error-msg">{errors.tag?.message}</p>
        </div>
        <div className="">
          <h2>Content</h2>
          <textarea
            placeholder="Description..."
            {...register("desc")}
            className="w-[500px] h-[100px] p-2 text-sm"
          />
          <p className="error-msg">{errors.desc?.message}</p>
        </div>
        <div className="">
          <input
            type="submit"
            value="Create Post"
            className="button bg-blue-600 text-white p-2 rounded-md cursor-pointer hover:bg-blue-500 text-sm"
          />
        </div>
      </div>
    </form>
  );
}
