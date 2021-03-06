import React, { Component } from 'react';
import './App.css';
import './reset.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import Login from './Login';
import 'normalize.css';
import * as localStore from './localStorage';




let id=0
function idMaker(){
  id+=1
  return id
}
// 测试 
// var TestObject = AV.Object.extend('TestObject')
// var testObject = new TestObject()
// testObject.save({
//   words: 'Hello World!'
// }).then(function(object) {
//   alert('LeanCloud Rocks!')
// })

class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      newTodo:'',
      // todoList:localStore.load('todoList') || []
      todoList:[]
    }
  }
  addTodo(e){
    this.state.todoList.push({
      id:idMaker(),
      title:e.target.value,
      status:null,
      deleted:false,
    })
 
    this.setState({
      newTodo:'',
      todoList:this.state.todoList
    })
    // localStore.save('todoList',this.state.todoList)
  }
  changeTitle(e){
    console.log("e.target.value="+e.target.value)
    this.setState({
      newTodo:e.target.value,
      todoList:this.state.todoList
    })
    // localStore.save('todoList',this.state.todoList)
  }
  toggle(e,todo){
    todo.status=todo.status==='completed'? '':'completed'
    this.setState(this.state);
    // localStore.save('todoList',this.state.todoList)
  }
  delete (event,todo){
    todo.deleted=true
    this.setState(this.state)
    
  }
  componentDidUpdate(){
    // localStore.save('todoList',this.state.todoList)
  }
  render() {
    let todos=this.state.todoList.filter((item)=>!item.deleted).map((item,index) =>{
      console.log("222");
        return(
          <li key={index}>
            <TodoItem todo={item} onToggle={this.toggle.bind(this)}
            onDelete={this.delete.bind(this)} />
          </li>) 
    })
    console.log("todo=="+todos);
    return (
      <div className="App">
           <h1>我的待办事项</h1>
           <div className='inputWrapper'>
           待办事项:&nbsp;&nbsp;<TodoInput content={this.state.newTodo}   onSubmit={this.addTodo.bind(this)} onChange={this.changeTitle.bind(this)} />
           </div>
          <ol className='todoList'>
            {todos}
          </ol>
          <Login />
      </div>
    );
  }
}

export default App;
