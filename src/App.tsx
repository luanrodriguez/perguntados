import { useEffect, useState } from "react";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getDatabase, set, ref, Database } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { User } from "./interfaces/User";
import { Home } from "./pages/Home";
import { Room } from "./pages/Room";
import { Box } from "@mui/material";
import backgroundTheme from "./assets/background.jpg";

function App() {
  const [database, setDatabase] = useState<Database | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [roomId, setRoomId] = useState<string>("");
  const firebaseConfig: FirebaseOptions = {
    databaseURL: "https://question-ef632-default-rtdb.firebaseio.com/",
  };

  const handleAccessRoom = (nickname: string, passedRoomId: string) => {
    if (!database || !nickname || !passedRoomId) return;
    const id = uuidv4();
    const userData: User = {
      id,
      nickname,
      admin: false,
      points: 0,
    };
    const usersRef = ref(database, `rooms/${passedRoomId}/users/${id}`);
    set(usersRef, userData);
    setUser(userData);
    setRoomId(passedRoomId);
  };

  const handleCreateRoom = (nickname: string) => {
    if (!database || !nickname) return;
    const generatedRoomId = uuidv4();
    const generatedUserId = uuidv4();
    const userData = { id: generatedUserId, nickname, admin: true, points: 0 };
    const roomData = {
      id: generatedRoomId,
      users: [userData],
    };
    const roomRef = ref(database, `rooms/${generatedRoomId}`);
    set(roomRef, roomData);
    setRoomId(generatedRoomId);
    setUser(userData);
  };

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    setDatabase(db);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${backgroundTheme})`,
      }}
    >
      {!roomId ? (
        <Home
          handleAccessRoom={handleAccessRoom}
          handleCreateRoom={handleCreateRoom}
        />
      ) : (
        <>
          {database && user && (
            <Room database={database} user={user} roomId={roomId} />
          )}
        </>
      )}
    </Box>
  );
}

export default App;
