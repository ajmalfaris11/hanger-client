import './App.css';
import Footer from './customer/components/Footer/footer';
import Navigation from './customer/components/Navbar/Navigation';
import HomePage from './customer/Pages/HomePage/HomePage';

function App() {
  return (
    <div className="App">
        <Navigation/>
        <div>
          <HomePage/>
        </div>
        <div>
          <Footer/>
        </div>
    </div>
  );
}

export default App;
