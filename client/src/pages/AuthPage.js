import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, error, request, clearError} = useHttp()
  const [form, setForm] = useState({
    email:'', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = (e) => {
    setForm({...form, [e.target.name]:e.target.value})
  } 

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const registerHandler = async() => {
    try{
      const data = await request('http://localhost:5000/api/auth/register', 'POST', {...form}) 
      message(data.message)
      setForm({email: '', password: ''})
    } catch(e) {
      // console.log(error)
      setForm({email: '', password: ''})
    }
   }

   const loginHandler = async() => {
    try{
      const data = await request('http://localhost:5000/api/auth/login', 'POST', {...form}) 
      auth.login(data.token, data.userId)
      setForm({email: '', password: ''})
    } catch(e) {
      // console.log(error)
      setForm({email: '', password: ''})
    }
   }

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Сократи Ссылку</h1>
 
    {/* <div className="col s12 m6"> */}
      <div className="card blue darken-1">
        <div className="card-content white-text">
          <span className="card-title">Авторизация</span>   
          <div>

          <div className="input-field">
          <input placeholder="Введите email" 
          id="email" 
          type="text" 
          name="email"
          value={form.email}
          className='yellow-input'
          onChange={changeHandler}
          /> 
          <label htmlFor="email">Email</label>
        </div>

        <div className="input-field">
          <input placeholder="Введите пароль" 
          id="password" 
          type="password" 
          name="password"
          className='yellow-input'
          value={form.password}
          onChange={changeHandler}
          /> 
          <label htmlFor="email">Пароль</label>
        </div>

          </div>
        </div>
        <div className="card-action">
          <button onClick={() => loginHandler()} className='btn yellow darken-4' disabled={loading} style={{marginRight: '10px'}}>Войти</button>
          <button onClick={() => registerHandler()} disabled={loading} className='btn gray lighten-1 black-text'>Регистрация</button>
        </div>
      </div>
    {/* </div> */}
      </div>
    </div>
  )
}

export default AuthPage