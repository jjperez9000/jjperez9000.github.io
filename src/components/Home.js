/** @format */
import { MenuBar } from "./Menubar";
export function Home() {
  return (
    <>
      <MenuBar currentState={3} />
      <div className="h-screen bg-stone-300 flex items-center justify-center flex-col">
        <div className="bg-stone-100  rounded-lg shadow-lg w-3/4 h-3/4 flex items-center  flex-col p-48">
          <h1 className="text-3xl ">Woah!</h1>
          <br />
          <h2 className="text-xl ">There's nothing here</h2>
          <br />
        </div>
      </div>
    </>
  );
}
