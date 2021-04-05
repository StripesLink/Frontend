import React from "react";
import Tablero from "./components/tablero/Tablero";
import Chat from "./components/chat/chat";

function Home(props) {
  return (
    <div>
      <Tablero />
      <Chat />
    </div>
  );
}

export default Home;
