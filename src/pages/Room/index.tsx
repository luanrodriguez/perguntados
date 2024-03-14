import { Database, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { User } from "../../interfaces/User";
import {
  QuestionContainer,
  RoomContainer,
  UserNicknameContainer,
  UsersAndQuestionContainer,
  UsersContainer,
} from "./styles";
import { NormalTypography } from "../../styles/styles";
import { Fort } from "@mui/icons-material";
import { UserScreen } from "./UserScreen";
import { AdminScreen } from "./AdminScreen";
import { Virtuoso } from "react-virtuoso";

interface RoomProps {
  database: Database;
  user: User;
  roomId: string;
}

export const Room = ({ database, user, roomId }: RoomProps) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const usersRef = ref(database, `rooms/${roomId}/users`);
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      setUsers(Object.values(data));
    });
  }, []);

  return (
    <RoomContainer>
      <NormalTypography>Sala: {roomId}</NormalTypography>
      {user.admin && (
        <NormalTypography>Você é administrador da sala</NormalTypography>
      )}
      <UsersAndQuestionContainer>
        <UsersContainer>
          <Virtuoso
            style={{ height: "100%", width: "250px" }}
            totalCount={users.length}
            itemContent={(index) => (
              <UserNicknameContainer key={users[index].id}>
                <NormalTypography>{users[index].nickname}</NormalTypography>
                {users[index].admin ? (
                  <Fort color="info" />
                ) : (
                  <NormalTypography>{users[index].points}</NormalTypography>
                )}
              </UserNicknameContainer>
            )}
          />
        </UsersContainer>
        <QuestionContainer>
          {!user.admin && (
            <UserScreen database={database} roomId={roomId} user={user} />
          )}

          {user.admin && <AdminScreen database={database} roomId={roomId} />}
        </QuestionContainer>
      </UsersAndQuestionContainer>
    </RoomContainer>
  );
};
