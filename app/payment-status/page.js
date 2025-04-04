"use client";

import { useRouter } from "next/navigation";
import { handleError } from "../lib/HandelError";
import axios from "axios";
import { useEffect, useState } from "react";



export default function successfullyPayment() {

  const [loading, setLoading] = useState(true)
  const [paymentDetails, setPaymentDetails] = useState({})
  const [packageDetails, setPackageDetails] = useState({})
  const [paymentStatus, setPaymentStatus] = useState('')
  const [timeDetails, setTimeDetails] = useState({})
  const [slotID, setSlotID] = useState()
  const [orderNo, setOrderNo] = useState()
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== undefined) {
      const paymentData = localStorage?.getItem('payment')
      const packageData = localStorage?.getItem('services')
      const timeData = localStorage?.getItem('timedetails')
      setPaymentDetails(paymentData ? JSON.parse(paymentData) : {})
      setPackageDetails(packageData ? JSON.parse(packageData) : {})
      setTimeDetails(timeData ? JSON.parse(timeData) : {})
      if (!(paymentData && packageData)) {
        setLoading(false)
      }
      return () => {
        localStorage?.removeItem('payment')
        localStorage?.removeItem('services')
      }
    }
  }, [])



  useEffect(() => {
    (async () => {
      if (paymentDetails?.id && packageDetails?.package_id) {
        try {
          const checkStatus = await axios.post(`/api/check-payment-status`, { id: paymentDetails.id }, {
            headers: {
              Authorization: getCookie('token'),
            }
          })
          const statusData = checkStatus?.data?.result
          if (statusData) {
            setPaymentStatus(statusData.payment_status || '')
            await addPayment(statusData, 'CONFIRMPAYMENT')
            if (statusData.payment_status == 'paid') {
              confirmSlotBook(packageDetails?.package_id)
            }
          }
        } catch (err) {
          handleError(err)
        } finally {
          setLoading(false)
        }
      }
    })()
  }, [paymentDetails])

  const addPayment = async (session) => {
    console.log(session, 'session data')
    const param = {
      userId: localStorage?.getItem('userId'),
      paymentMode: session.currency,
      transactionId: session.id,
      response: JSON.stringify(session),
      amount: session.amount_total / 100,
      packageId: id,
      status: session.payment_status,
      packageTime: serviceTime,
      bookingDate: input?.date,
    }

    await axios.post(`/api/add-payment`, param, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage?.getItem('token')}`,
      },
    }).then(async res => {
      console.log(res, 'add payment response')
      if (res.status === 200) {
        localStorage.setItem('services', JSON.stringify({ ...data, payment_id: res.data?.[0]?.payment_id || 0, order_id: res?.data?.[0]?.orderid || 0 }));
      } else {
        MessageBox('erorr', res.message);
      }
    }).catch(async err => {
      console.log(err, 'add payment error')
      handleError(err);

    })
  }

  const confirmSlotBook = async () => {
    const ServiceDetails = {
      "p_userid": localStorage.getItem('userId'),
      "p_service_id": timeDetails?.service_id,
      "p_servicestarttime": timeDetails?.time[0]?.start,
      "p_serviceendtime": timeDetails?.time[0]?.end,
      "p_service_date": timeDetails?.date,
      "p_schedule_id": 0,
    }
    await axios.post('/api/slotboocking', ServiceDetails, {
      headers: {
        Authorization: getCookie('token'),
      }
    }).then(async res => {
      if (res.status === 200) {
        setSlotID(res.data?.schedule_orderid)
        setOrderNo(res.data?.orderno)
        MessageBox('success', res.data.msg)
      } else {
        MessageBox('error', res.data.msg)
      }
    }).catch(async err => {
      if (err.response.status === 401) {
        handleError(err)
        return
      }
      handleError(err)

    })
  }


  const createPayment = async () => {
    if (!getCookie('token')) {
      setLogin(true)
      return
    }
    if (loading)
      return

    try {
      setLoading(true)
      const res = await axios.post(
        `/api/create-payment`,
        {
          success_url: window.location.origin + '/successfullyPayment',
          service_id: id,
        }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage?.getItem('token')}`,  // ✅ Include token in headers
        },
      }
      )
      if (res.data?.result) {
        await addPayment(res?.data?.result)
        localStorage?.setItem('payment', JSON.stringify(res?.data?.result));
        router.replace(res.data.result?.url || '')
      }
    } catch (err) {
      handleError(err)
    }
    finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className='flex w-full h-[100vh] fixed top-[0px] left-[0] justify-center items-center bg-primary-25 z-50'>
      <div className='w-[300px] text-center'>
        <h1>incarcare...</h1>
      </div>
    </div>
  )

  if (!(paymentDetails.id && packageDetails.package_id)) return (
    <div className='flex w-full h-[100vh] fixed top-[0px] left-[0] justify-center items-center bg-primary-25 z-50'>
      <div className='w-[300px] text-center'>
        <h1>No Payment Found</h1>
        <button className='rounded-[10px] bg-primary-75 py-2 uppercase px-11 text-primary-0 btn1 mt-2' onClick={() => router.replace('/')}>Go Home</button>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>

        <div className="bg-gray-50 p-4 rounded-lg shadow-inner text-left w-full">
          <p className="text-gray-700"><strong>Date:</strong></p>
          <p className="text-gray-700"><strong>Name:</strong></p>
          <p className="text-gray-700"><strong>Package Name:</strong></p>
          <p className="text-gray-700"><strong>Date:</strong> </p>
          <p className="text-gray-700"><strong>Time Slot:</strong> </p>
          <p className="text-gray-700"><strong>Payment Mode:</strong> </p>
          <p className="text-gray-700"><strong>Amount:</strong> </p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  )
}