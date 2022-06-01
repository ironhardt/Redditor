import './App.css';
import NavBar from '../components/Nav';
import { PostList } from '../features/PostList';

function App() {
  return (
    <div>
      <NavBar />
      <PostList />
    </div>
  )
}

export default App;
