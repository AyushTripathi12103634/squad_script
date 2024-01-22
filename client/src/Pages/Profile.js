import Navbar from '../component/Navbar';
import './Profile.css';
import Footer from '../component/Footer';
function Profile() {
  return (
    <main className='profile-main-section'>
      <Navbar />
      <h1>Profile Page</h1>
      <Footer />
    </main>
  );
}

export default Profile;