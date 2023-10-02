import './App.css';
import { Auth } from "../src/components/Auth";
import { auth, db,storage } from './config/firebase';
import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import {ref,uploadBytes}from 'firebase/storage'

function App() {

  const [fruitList, setFruitList] = useState([]);
  const fruitCollectionRef = collection(db, "fruits")

  const getFruitlist = async () => {
    try {
      const data = await getDocs(fruitCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFruitList(filteredData)
    }
    catch (err) {
      console.log(err)
    }

  };

  useEffect(() => {
    getFruitlist();
  })

  const [fruitName, setFruitName] = useState("");
  const [fruitSeason, setFruitSeason] = useState("")
  const [fruitQty, setFruitQty] = useState(0)

  const[updFruit,setUpdFruit]=useState("")

  const[fileUpload,setFileUpload]=useState(null)

  const onSubmit = async () => {
    try {
      await addDoc(fruitCollectionRef, { name: fruitName, 
        quantity: fruitQty, 
        season: fruitSeason,
      userId:auth?.currentUser?.uid,
     })

      getFruitlist();
    }

    catch (err) {
      console.error(err)
    }
  }

  const deleteFruit=async(id)=>
{
  const fruitt=doc(db,"fruits",id)
  await deleteDoc(fruitt)
}
  const UpdateFruit=async(id)=>
{
  const fruitt=doc(db,"fruits",id)
  await updateDoc(fruitt,{name:updFruit})
}

const uploadFile=async()=>{
  if(!fileUpload) return;
  const filesFolderRef=ref(storage,`projectFiles/${fileUpload.name}`);
  try{
  await uploadBytes(filesFolderRef ,fileUpload);
}
catch(err){
  console.error(err)
}

}

  return (
    <div className="App">
      <Auth />
      <br />
      <div>
        <input type='text' placeholder='Enter fruit name' onChange={(e) => { setFruitName(e.target.value) }}></input>
        <input type='text' placeholder='Enter fruit season'
          onChange={e => setFruitSeason(e.target.value)}></input>
        <input type='number' placeholder='Enter fruit quantity' onChange={e => { setFruitQty(e.target.value) }}></input>

        <button onClick={onSubmit}>submit</button>
      </div>
      <div>
        {fruitList.map((fruit) => (
          <div>
            <h1 style={{ color: "red" }}>{fruit.name}</h1>
            <p>{fruit.season}</p>

            <button onClick={()=>deleteFruit(fruit.id)}>Delete</button>
            
          <br/>
          <input placeholder='Enter updated name' type="text" onChange={e=>setUpdFruit(e.target.value)}/>
          <button onClick={()=>UpdateFruit(fruit.id)}>Update</button>
          </div>

        ))}
      </div>

      <div>
        <input type='file' onChange={e=>{setFileUpload(e.target.files[0])}}/>
        <button onClick={uploadFile}>upload file</button>
      </div>
    </div>
  );
}

export default App;
