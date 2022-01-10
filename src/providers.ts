import { FC, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GenContext } from './contexts';
import { NUMBER_OF_GENS } from './utils/constants';

const GenProvider: FC = ({ children }) => {
  const [gen, setTheGen] = useState(NUMBER_OF_GENS);

  const setGen = (gen: number) => {
    setTheGen(gen);
  };

  return (
    <GenContext.Provider
      value={{
        gen,
        setGen,
      }}
    >
      {children}
    </GenContext.Provider>
  );
};