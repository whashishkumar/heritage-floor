import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

export default function Loader() {
  return (
    <>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#018C99"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass="flex w-full justify-center py-4"
      />
    </>
  );
}
