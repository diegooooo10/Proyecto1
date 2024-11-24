import { Children, useState } from 'react';
import {ReservePlacesContext} from './ReservePlacesContext'
export const ReservePlacesProvider = () => {
  const [places, setPlaces] = useState([]);
  
  return(
    <ReservePlacesContext.Provider >
      {Children}
    </ReservePlacesContext.Provider>
  );
};
