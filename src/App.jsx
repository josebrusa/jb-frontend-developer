
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import Projects from './components/Projects'
import Sidenav from './components/Sidenav'
import Work from './components/Work'

function App() {

  return (
    <div className='bg-[#36333B]'>
      <Sidenav />
      <Header />
      <Work />
      <About />
      <Projects />
      <Contact />
      {/* <Footer /> */}
    </div>
  )
}

export default App
