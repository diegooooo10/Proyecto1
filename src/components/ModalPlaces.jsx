import { Close, CreditCard, PadLock, Plane } from "../svg";
import { useEffect } from "react";

export const ModalPlaces = ({ place, onClose }) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
/*     const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month < 10) {
      console.log(`${day}-0${month}-${year}`);
    } else {
      console.log(`${day}-${month}-${year}`);
    } */
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 select-none"
    >
      <div className="relative flex-col w-11/12 h-auto transform bg-white rounded-lg shadow-lg md:w-1/2 lg:w-1/3">
        <div className="flex items-center w-full p-4 space-x-4 rounded-t-lg bg-gradient-to-r from-blue-600 to-blue-700 h-1/6">
          <Plane />
          <div className="flex flex-col">
            <h2 className="font-semibold text-white">Complete Your Booking</h2>
            <p className="text-sm text-blue-100 font-extralight">
              {place.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute p-2 text-white top-3 right-2"
          >
            <Close />
          </button>
        </div>

        <form
          autoComplete="none"
          onSubmit={handleSubmit}
          className="w-full h-auto p-6 space-y-4 bg-white rounded-b-lg"
        >
          <h2 className="text-lg font-semibold text-gray-800">Travel Date</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="indate" className="label">
                Check-in Date
              </label>
              <input
                type="date"
                name="indate"
                id="indate"
                className="inputField"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="outdate" className="label">
                Check-out Date
              </label>
              <input
                type="date"
                name="outdate"
                id="outdate"
                className="inputField"
              />
            </div>
          </div>
          <div className="flex justify-between p-2 rounded-md bg-blue-50">
            <p className="text-gray-700">Total Amount:</p>
            <p className="text-sm text-blue-700">{place.price}</p>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="cardnumber" className="label">
                Card Number
              </label>
              <CreditCard />
              <input
                type="text"
                name="cardnumber"
                id="cardnumber"
                className="w-full px-3 py-2 pl-10 text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-blue-500"
                placeholder="1234 5678 9012 3456"
                maxLength={25}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expirydate" className="label">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expirydate"
                  id="expirydate"
                  className="inputField"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <label htmlFor="cvc" className="label">
                  CVC
                </label>
                <input
                  type="text"
                  name="cvc"
                  id="cvc"
                  className="inputField"
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>
            <div>
              <label htmlFor="cardholdername" className="label">
                Cardholder Name
              </label>
              <input
                type="text"
                name="cardholdername"
                id="cardholdername"
                className="inputField"
                placeholder="Name"
                maxLength={20}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex items-center justify-center w-full buttonPrimary"
            >
              <PadLock />
              <span className="ml-2">Pay Securely Now</span>
            </button>
            <p className="mt-2 text-xs text-center text-gray-500">
              Your payment is secured with SSL encryption
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
