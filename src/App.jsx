import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import usePasswordGenerator from './hooks/use-password-generator'
import StrengthChecker from './component/StrengthChecker'


function App() {
  const [length, setLength] = useState(6)
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false }
  ])
  const [copied, setCopied] = useState(false)

  const handleCheckboxChange = (index) => {
    const updateCheckboxData = [...checkboxData]
    updateCheckboxData[index].state = !updateCheckboxData[index].state
    setCheckboxData(updateCheckboxData)
  }

  const { password, errorMessage, generatePassword } = usePasswordGenerator()

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <>
      <div className='container'>
        {password && password.length > 0 && (
          <div className='header'>
            <div className='title'>{password}</div>
            <button
              className='copyBtn'
              onClick={handleCopy}
            >{copied ? "copied" : "copy"}</button>
          </div>
        )}
        {/* Character Length */}
        <div className='charLength'>
          <span>
            <label>Character Length</label>
            <label htmlFor="">{length}</label>
          </span>
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        {/* checkbox */}
        <div className='checkboxes'>
          {checkboxData.map((checkbox, index) => (
            <div key={index}>
              <input type="checkbox"
                checked={checkbox.state}
                onChange={() => handleCheckboxChange(index)}
              />
              <label >{checkbox.title}</label>
            </div>
          ))}
        </div>
        {/* Strength */}
        <StrengthChecker password={password} />

        {/* Error Handling */}
        {errorMessage && <div className='errorMessage'>{errorMessage}</div>}

        {/* Generate Button */}
        <button className='generateBtn' onClick={() => generatePassword(checkboxData, length)}>Generate Password</button>
      </div>

    </>
  )
}

export default App
