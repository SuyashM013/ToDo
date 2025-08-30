import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TextPressure from './components/TextPressure';
import TargetCursor from './components/TargetCursor';
import ClickSpark from './animation/Animations/ClickSpark/ClickSpark';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [editId, setEditId] = useState(null);

  // const uri = 'http://localhost:2900/api/tasks';
  const uri = 'https://api-todo-pq6q.onrender.com/api/tasks';


  const fetchData = async () => {
    try {
      const res = await axios.get(uri);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch("https://api-todo-pq6q.onrender.com/")
    .catch(err => console.log("Wakeup failed:", err));
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${uri}/${editId}`, { name, desc });
        setEditId(null);
      } else {
        await axios.post(uri, { name, desc });
      }
      setName('');
      setDesc('');
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${uri}/${id}`);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      await axios.patch(`${uri}/${id}`, { completed: !completed });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setName(item.name);
    setDesc(item.desc);
  };

  return (
    <div className="w-full min-h-screen bg-slate-300">
      <ClickSpark sparkColor="#FF0000" sparkSize={17} sparkRadius={35} sparkCount={10} duration={400}>

        <TargetCursor spinDuration={2} hideDefaultCursor={true} />

        {/* <div className='w-full'>

          <Infinity texts={['TODO', 'APP']} className="cursor-target" />
        </div> */}

        <div className="mt-5">
          <TextPressure text="Suyash Mishra ToDo App" textColor="#FF0000" className="cursor-target" />
        </div>


        <div className=' gap-5 grid grid-row-2 items-center '>

          <div className=' grid justify-center  '>



            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col  gap-5 p-2 bg-blue-300 m-2 rounded-xl md:min-w-lg cursor-target"
            >
              <label htmlFor="name">Todo:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="bg-slate-200 p-2 rounded-lg cursor-target"
                required
              />

              <label htmlFor="desc">Description:</label>
              <input
                type="text"
                name="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Description"
                className="bg-slate-200 p-2 rounded-lg cursor-target"
                required
              />

              <button type="submit" className="bg-green-300 rounded-lg p-2 cursor-target">
                {editId ? 'Update Task' : 'Add Task'}
              </button>
            </form>

          </div>

          {/* Todo List */}
          <div className="grid grid-cols-1  lg:grid-cols-3 gap-5 p-5 ">
            {data && data.map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-3 p-2 bg-gray-200 border border-amber-400 m-2 rounded-xl  cursor-target"
              >
                <p className="font-bold uppercase text-lg">{item.name}</p>
                <p className='text-sm italic'>{item.desc}</p>

                <div className="flex gap-3 cursor-target">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleToggleComplete(item._id, item.checked)}
                  />
                  <span>{item.checked ? 'Done' : 'Pending'}</span>
                </div>

                <div className="flex gap-3 not-even:  ">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-300 rounded-lg p-2 min-w-1/3 cursor-target"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-300 rounded-lg p-2 cursor-target md:min-w-1/3"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ClickSpark>
    </div>
  );
}

export default App;
