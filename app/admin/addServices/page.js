export default function addServices(){
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
      <hr />
      <label htmlFor="title"><b>Title</b></label>
      <input type="text" placeholder="Enter Title" name="title" id="title" required />
      
        <label htmlFor="myfile"><b>Select a file</b></label>
        <input type="file" id="myfile" name="myfile" />

      <label htmlFor="description"><b>Description</b></label>
      <textarea name="description" placeholder="Enter Service Description " id="description" defaultValue={""} />
      <label htmlFor="price"><b>Price</b></label>
      <input type="number" placeholder="Enter Price" name="price" id="price" required />
      <button type="submit" className="registerbtn">Add</button>
    </div>  
  </form>
</div>

        </div>
    );
}