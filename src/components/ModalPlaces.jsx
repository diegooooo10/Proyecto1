import { Close, CreditCard, PadLock, Plane } from "../svg";

export const ModalPlaces = ({place, onClose}) => {
  return (
    <div className="z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-1/2 lg:w-1/3 h-auto  flex-col rounded-lg">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-1/6 w-full rounded-t-lg items-center space-x-4 flex p-4">
        <Plane />
        <div className="flex flex-col">
          <h2 className="font-semibold text-white">Complete Your Booking</h2>
          <p className="font-extralight text-sm text-blue-100">{place.title}</p>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 text-white">
          <Close/>
        </button>
      </div>
      <div className="h-5/6 bg-white w-full rounded-b-lg p-6 space-y-4">
        <h2 className="text-gray-800 font-semibold text-lg">Travel Date</h2>
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
        <div className="flex justify-between bg-blue-50 p-2 rounded-md">
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
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-blue-500 pl-10"
              placeholder="1234 5678 9012 3456"
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
            />
          </div>
        </div>
        <div>
          <button className="buttonPrimary w-full flex items-center justify-center">
            <PadLock />
            <span className="ml-2">Pay Securely Now</span>
          </button>
          <p className="text-xs text-center mt-2 text-gray-500">
            Your payment is secured with SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
};
