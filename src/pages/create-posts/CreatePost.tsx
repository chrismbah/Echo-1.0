import CreateForm from "./CreateForm";

export default function CreatePost() {
  return <section className="section">
    <div className="mb-4">
      <h1 className="heading1">Create new Post</h1>
      <div className="w-[90px] h-[3px] bg-blue-500 "/>
    </div>
    <CreateForm />
  </section>;
}
