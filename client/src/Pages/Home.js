import Navbar from '../component/Navbar';
import './Home.css';
import Footer from '../component/Footer';
function Home() {
  return (
    <main className='home-main-section'>
    <Navbar />
    <h1>Home Page</h1>
    <Footer />
    </main>
  );
}

export default Home;