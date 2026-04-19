import { useState } from "react";
import "./App.css";

function App () {
  const [input,setInput] = useState (""); // Tạo input rỗng, cập nhật giá trị bằng setInput
  const [task,setTask] = useState([]); // Tạo mảng lưu danh sách task
  const [status,setStatus] = useState("ToDo"); // Tạo status cho task
  const [search, setSearch] = useState (""); // Search
  const[filter, setFilter] = useState ("all"); //Filter

  const add = () => {
    if (input === "") return;

    const newTask = {
      id: Date.now().toString(), // id là ngày giờ set task
      title: input, //title là tên task
      status : status, //status mặc định
    };
    
    setTask([...task,newTask]); // Thêm task vào []
    setInput(""); //trả input về trạng thái trước khi nhập
    setStatus("ToDo"); //status task mới là To Do
  };

  const handleDelete = (id) => {
    setTask(task.filter((task) => task.id !== id))
  };

  const filterTask = task
  .filter((task) => { //Filter theo status
    if (filter === "all") return true;
    return task.status === filter;
  })
  .filter((task) =>  //search theo title
    task.title.toLowerCase().includes(search.toLowerCase())
);

  return (
  <div className="container">
      <h1> 
        Task Board
      </h1>

      <div className="form">
      <input //Nhập title Task
        value = {input}
        onChange = { (e) => setInput(e.target.value)} //cập nhật state
        placeholder = "Please input task .... "
      />

      <select 
        value = {status} 
        onChange={(e) => setStatus(e.target.value)}
        className="select"
      >
        <option value = 'ToDo'> To Do </option>
        <option value = 'InProgress'> In Progress </option>
        <option value = 'Done'> Done </option>
      </select>

      <button 
        onClick={add}
        className="button"
      >
        Add task
      </button>
      </div>

      <div className="controls">
      <input 
        placeholder= "Type to search ...."
        value = {search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all"> All </option>
        <option value="ToDo"> To Do </option>
        <option value= "InProgress"> In Progress </option>
        <option value= "Done"> Done </option>
      </select>
      </div>


      <p>
        Incoming Task : {input}
      </p>

      <div className="task-table">
          {/* tên cột */}
          <div className="task-row header">
            <div> Task </div>
            <div> Status </div>
            <div> Action </div>
          </div>

          {/*DATA*/}
        {filterTask.map((task) => (
          <div
          className="task-row"
          key = {task.id}>
            <div>{task.title}</div>
            <div>{task.status}</div>
            <div>
              <button onClick={ () => handleDelete(task.id)}> Delete </button>
            </div>
          </div>
        ))}
      </div>
  </div>
  );
}
export default App;