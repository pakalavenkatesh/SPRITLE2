import React,{useState} from "react";
import {Card ,Form,Button,Input,Row,Col,message}  from "antd";
import moment from 'moment';
import uuid from 'react-uuid'
import "./App.css";

const format = 'HH:mm';


function Task(){

  const [form] = Form.useForm()
  const [balance, setBalance] = useState(0)
  const [inputValue, setInputValue] = useState([])
  const [balanceData, setBalanceData] = useState([])

  function Add(){
    if(inputValue !== 0){
      let id = uuid()
      let date =  moment(new Date()).format("YYYY-MM-DD HH:MM:SS")
      setBalanceData([...balanceData, {id , date, data : inputValue, type : "Add" }])
      let data = balance + inputValue
      setBalance(data)
      form.resetFields()
      setInputValue(0)
    }
    else {
      message.error('Please Enter a value')
    }
  }

  function Remove(){
    if(inputValue !== 0){
      let id = uuid()
      let date =  moment(new Date()).format("YYYY-MM-DD HH:MM:SS")
      setBalanceData([...balanceData, {id , date, data : inputValue, type : "Remove" }])
      let data = balance - inputValue
      setBalance(data)
      form.resetFields()
      setInputValue(0)
    }
    else{
      message.error('please Enter a value')
    }
  }

  function handleInputChange(event){
    setInputValue(Number(event.target.value))
  }


  return(
      <>
      <Card title = "Expensive Tracker Basic"> 
      <h1> Balance : {balance ? balance : 0} </h1>
        <Form  form={form} >
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 30]}>
            <Col lg={{ span: 6 }} md={{ span: 8}} sm={{ span: 8 }} xs={{ span: 24 }}>
              <Form.Item  name="number" >
                <Input type="number" onChange={(event)=>handleInputChange(event)} />
              </Form.Item>
            </Col>
          </Row>

          <div>
            <Button type="primary" size="medium" onClick={Add}> Add </Button> {' '}
            <Button type="primary" size="medium" onClick={Remove}> Remove </Button>
          </div>

        </Form>
        <Card title = "Transcations">
          {balanceData.map(el=>
            <p key={el.id}> {el.date } --  {el.data}  -- {el.type}</p>
          )}

        </Card>
      </Card>
      </>
    )
}

export default Task