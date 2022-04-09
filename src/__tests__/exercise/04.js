// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'

test('submitting the form calls onSubmit with username and password', () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  let submittedData = {}

  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  const handleSubmit = jest.fn()
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  const {container} = render(<Login onSubmit={handleSubmit}></Login>)
  // 🐨 get the username and password fields via `getByLabelText`
  const usernameInput = screen.getByLabelText(/username/i)
  const passwordInput = screen.getByLabelText(/password/i)
  // 🐨 use userEvent.type to change the username and password fields to
  //    whatever you want
  // const username = faker.internet.userName()
  // const password = faker.internet.password()
  const buildLoginForm = () => {
    return {
      randomUsername: faker.internet.userName(),
      randomPassword: faker.internet.password(),
    }
  }
  const {randomUsername, randomPassword} = buildLoginForm()
  userEvent.type(usernameInput, randomUsername)
  userEvent.type(passwordInput, randomPassword)
  //
  // 🐨 click on the button with the text "Submit"
  const button = screen.getByRole('button', {name: /submit/i})
  console.log('here is the button: ', button.innerHTML)
  userEvent.click(button)
  // assert that submittedData is correct
  // expect(submittedData).toEqual({username: 'Hello', password: 'IneedNoPassword'})
  expect(handleSubmit).toHaveBeenCalledWith({
    username: randomUsername,
    password: randomPassword,
  })
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
})

/*
eslint
  no-unused-vars: "off",
*/
