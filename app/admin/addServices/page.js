  "use client"
  import axios from "axios"
  import { useRouter } from "next/navigation";
  import { useState } from "react"


  export default function addServices(){

    
    const [message, setMessage] = useState()

    const [input, setInput] = useState({
        title:'',
        myfile:null,
        description:'',
        price:'',

    });

    const [validations, setValidations] = useState({
      title:false,
      myfile:false,
      description:false,
      price:false,
    });

    const handelInputs = (e) =>{
      const { name, value, type, files } = e.target;
        setInput({...input, [name]:type === "file" ? files[0] : value});
        setValidations({...validations, [name]:false});
    }


    const router = useRouter()


    const handelAdd = async () => {

        if (!input.title) {
            setValidations({ ...validations, title: true });
            setMessage('Title is required.');
            return;
          }

          if (!input.myfile) {
            setValidations({ ...validations, myfile: true });
            setMessage('File is required.');
            return;
          }

          if (!input.description) {
            setValidations({ ...validations, description: true });
            setMessage('Description is required.');
            return;
          }

          if (!input.price) {
            setValidations({ ...validations, price: true });
            setMessage('Price is required.');
            return;
          }

        const data = JSON.stringify(
            {
                title: input.title,
                myfile: input.myfile,
                description: input.description,
                price: input.price,
            });

        try {
            const response = await axios.post('/api/addservices', data)
            if (response.status === 200) {
                router.push('/service');
                console.log("Login Successful:", response.data);
            } else {
                alert('Something went wrong')
            }
        } catch (error) {
            console.log('Error in login api', error)
        }

    }


      return(
          <div>
              <div className="registration">
              <div className="logo">
            <a className="header-logo" href="/">
              <img src="/assets/img/logo/black-logo.svg" alt="logo-img" />
            </a>
          </div>
    <form action="action_page.php">
      <div className="container">
        <h2>Add Service</h2>
        {message &&
          <p className="text-[#ff5555] text-lg">{message}</p>
        }
        <hr />
        <label htmlFor="title"><b>Title</b></label>
        <input type="text" placeholder="Enter Title" name="title" value={input.title} onChange={handelInputs} required />
        
          <label htmlFor="myfile"><b>Select a file</b></label>
          <input type="file" id="myfile" name="myfile" value={input.myfile} onChange={handelInputs}/>

        <label htmlFor="description"><b>Description</b></label>
        <textarea name="description" placeholder="Enter Service Description " value={input.description} onChange={handelInputs} defaultValue={""} />
        <label htmlFor="price"><b>Price</b></label>
        <input type="number" placeholder="Enter Price" name="price" value={input.price} onChange={handelInputs} required />
        <button  onClick={()=>handelAdd()} className="registerbtn">Add</button>
      </div>  
    </form>
  </div>

          </div>
      );
  }