import UsersTable from "../UsersTable/UsersTable";
import { AppWrap } from "./App.styled";

function App() {
  return (
    <AppWrap>
      <h1>Users Data</h1>
      <UsersTable />
    </AppWrap>
  );
}

export default App;
