import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

const CreatePage = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const [link, setLink] = useState('')
  const {request} = useHttp()
  const pressHandler = async(e) => {
    if(e.key === 'Enter') {
      try{
        const data = await request('http://localhost:5000/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        })
        navigate(`/detail/${data.link._id}`)
      } catch(e) {}
    }
  }
  
  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  return (
    <div className='row'>
      <div className='col s8 offset-s2' style={{paddingTop: '2rem'}}>
      <div className="input-field">
          <input placeholder="Вставте ссылку" 
          id="link" 
          type="text" 
          value={link}
          onChange={e => setLink(e.target.value)}
          onKeyPress={(e) => pressHandler(e)}
          /> 
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  )
}

export default CreatePage