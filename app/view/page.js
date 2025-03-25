export default function view(){
    return(
        <div>
            
 <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
    <div className="logo">
        <a className="header-logo" href="/">
            <img src="/assets/img/logo/black-logo.svg" alt="logo-img" />
        </a>
    </div>
  {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Details</h2> */}

  {/* Service Image */}
  <div className="grid  gap-4  grid-cols-2 mt-4 mb-4">
    <div>
        <img src="" alt="Service" className="w-40 h-40 rounded-lg shadow-md" />
    </div>
    <div>
    <p className="text-gray-600 text-lg"><strong>Service Name:</strong> Plumbing</p>
      <p className="text-gray-600 text-lg"><strong>Date:</strong> 25 March 2025</p>
      <p className="text-gray-600 text-lg"><strong>Time:</strong> Morning</p>
    </div>
  </div>

 
  {/* Service Info */}
  <div className="grid mt-3 gap-4">
    <div>
      <p className="text-gray-600 text-lg"><strong>Invoice No.:</strong> #12345</p>
      <p className="text-gray-600 text-lg"><strong>Name:</strong> xyz</p>
      <p className="text-gray-600 text-lg"><strong>Mobile:</strong> 4635237890</p>
      <p className="text-gray-600 text-lg"><strong>Email:</strong> xyz@example.com</p>
    <p className="text-gray-600 text-lg"><strong>Address:</strong> 123 Street, City, Country</p>
    </div>
  </div>

  {/* User Contact Details */}
  

  {/* Download Button */}
  <div className="mt-6 flex justify-center">
    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
      📥 Download Invoice
    </button>
  </div>
</div>

        </div>
    )
}
    