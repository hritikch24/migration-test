import {useEffect, useState} from 'react'
import {dispatch} from 'react-hot-toast/dist/core/store'
import {useDispatch, useSelector} from 'react-redux'
import {postFeedback} from '../../Redux/Root/actions'
import toast from 'react-hot-toast'

import {
  HomeContainer,
  Card,
  Title,
  FormWrapper,
  Input,
  Select,
  TextInput,
  Icons,
  SubmitButton,
  SubmitButtonIcon,
} from './style'
import Landing from '../landing/landing'

const Homepage = (props: any) => {
  const dispatch = useDispatch()
  const [admin, setAdmin] =  useState(false)
  const {feedbackPostSuccess, feedbackPostLoading} = useSelector(
    (state: any) => state.feedback
  )
  const {loginSuccess} = useSelector((state: any) => state.user)

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<any>('')
  const [message, setMessage] = useState<string>('')
  const [categoryName, setCategoryName] = useState<string>('')
  const handleInput = (event: any, type: string) => {
    const {value} = event.target
    if (type === 'name') {
      setName(value)
    } else if (type === 'email') {
      setEmail(value)
    } else if (type === 'category') {
      setCategoryName(value)
    } else {
      setMessage(value)
    }
  }

  const handleSubmit = () => {
    if (name === '' || email === '' || message === '') {
      setName('')
      setEmail('')
      setMessage('')
      alert('All fields are mandatory!')
    } else {
      const data = {name, email, feedback: message, category: categoryName}
      dispatch(postFeedback(data))
    }
  }

  useEffect(() => {
    if (feedbackPostSuccess === 'success') {
      toast.success('Successfully Submitted!')
      setMessage('')
      setCategoryName('')
    } else {
      toast.dismiss()
    }
  }, [feedbackPostSuccess])

  useEffect(() => {
    if(loginSuccess !== ''){
      setName(loginSuccess.name)
      setEmail(loginSuccess.email)
      if(localStorage.getItem('loginSuccess')){
        const isAdmin = JSON.parse(localStorage.getItem('loginSuccess') || `{"isAdmin":"false"}`)
        if(isAdmin.isAdmin === true){

          setAdmin(true);
        }else{
          setAdmin(false)
        }
      }
    }else {
      setName('')
      setEmail('')
      setAdmin(false)
    }
  }, [loginSuccess])

  useEffect(() => {
    if(localStorage.getItem('name')){
      setName(localStorage.getItem('name') || '')
      setEmail(localStorage.getItem('email') || '')   
    }
  }, [])

  return (<>
      { admin ? <Landing /> : 
    <HomeContainer>
      <Card>
        <Title>We value your feedback</Title>
        <FormWrapper>
          <Input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => handleInput(e, 'name')}
            readOnly
          />
          <Icons className='fas fa-user'></Icons>
          <Input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => handleInput(e, 'email')}
            readOnly
          />
          <Icons className='fas fa-envelope'></Icons>
          <Select
            value={categoryName}
            onChange={(e) => handleInput(e, 'category')}
          >
            <option hidden={true}>Select Category</option>
            <option value='blockchain'>Blockchain</option>
            <option value='frontend'>Frontend</option>
            <option value='styled_components'>Styled Components</option>
            <option value='others'>Others</option>
          </Select>
          {/* <Icons className='fas fa-envelope'></Icons> */}
          <TextInput
            placeholder='Message.....'
            cols={30}
            rows={10}
            value={message}
            onChange={(e) => handleInput(e, 'message')}
          />
          <SubmitButton onClick={handleSubmit} disabled={feedbackPostLoading}>
            {feedbackPostLoading ? 'Submitting...' : 'Submit'}
            <SubmitButtonIcon
              className={
                feedbackPostLoading ? 'fas fa-spinner' : 'fas fa-arrow-right'
              }
            ></SubmitButtonIcon>
          </SubmitButton>
        </FormWrapper>
      </Card>
    </HomeContainer>
      }
      </>
  )
}
export default Homepage
