import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './card.jsx'
import Footer from './Footer.jsx';
import Props from './props.jsx';
import Conditionalrendering from './conditionalrendering.jsx';
import RenderList from './renderList.jsx';
import Button  from './Button.jsx';
import UseStateExample from './usestate.jsx';
import MyComponent from './onchange.jsx';
import EffectDemo from './useeffect.jsx';
import UserProfile from './usecontextcomponent2.jsx';
import { UserProvider } from './usecontextcomponent1.jsx';
import UseRefDemo from './useref.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <MyComponent />
      <Card />
      <UseStateExample />
      <EffectDemo />
      <UserProvider>
      <h3 className="text-center mt-3">🔗 useContext Hook Demo</h3>
      <UserProfile />
      </UserProvider>
      <UseRefDemo />
      <Button />
      <Props name="John Doe" age={30} city="New York" />
      <Props />
      <Conditionalrendering name="Jane Doe" age={25} city="Los Angeles" />
      <Conditionalrendering />
      <RenderList/>
      <Footer />
      </div>
    </>
  )
}

export default App

//// ❌ Avoid this for function components
// Props.defaultProps = { ... };

// // ✅ Use default parameters like this:
// function Props({ name = "Unknown", age = 0, city = "Unknown" }) { ... }
