import { useState } from "react"

import Input from "./components/Input/Input"
import Toast from "./components/Toast/Toast"
import Sidebar from "./components/Sidebar/Sidebar"

function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)} style={{marginBottom: '3rem'}}>Open Sidebar</button>
      <br></br>
      <Input type="password" clearable={true} />
      <Toast text="This is a toast with text" fadeTimeSec={3} type="fade" closeBtn={false} color="success" />
      <Sidebar isOpen={open} title="Navigation" onClose={() => setOpen(false)} />
    </>


  )
}

export default App
