import { useState } from 'react';

import RecordForm from '@/components/Dashboard/RecordForm';
import PrintRecord from '@/components/Dashboard/PrintRecord';
import Card1 from '@/components/Dashboard/Card1';
import Card2 from '@/components/Dashboard/Card2';
import CustomerTable from '@/components/Dashboard/CustomerTable';
import React from 'react';
import api from '@/api/api';
import { showToast } from '@/utils/Toast';

function Dashboard() {
  const [openAddRecord, setOpenAddRecord] = useState(false);
  const [openPrintRecord, setOpenPrintRecord] = useState(false);
  const [printData, setPrintData] = useState(null);

  const [totalNumberOfCustomers, setTotalNumberOfCustomers] = useState(0);
  const [reFetch, setReFetch] = useState(false);

  const handleSubmit = async (data, shouldPrint = false) => {
    try {
      const response = await api.post('/customer/create', data);
      if (response.status === 201) {
        showToast('Customer added successfully', 'success');
        setReFetch(true);
        setOpenAddRecord(false);

        if (shouldPrint) {
          setPrintData(data);
          setOpenPrintRecord(true);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handlePrintRequest = data => {
    setPrintData(data);
    setOpenPrintRecord(true);
  };

  return (
    <>
      <div className='w-full flex items-center justify-between gap-2'>
        <Card1 total={totalNumberOfCustomers} />
        <Card2 onClick={() => setOpenAddRecord(true)} />
      </div>

      <div className='w-full max-h-[calc(100%-9.5rem)] p-4 bg-white mt-4 rounded-sm'>
        <CustomerTable
          setTotalNumberOfCustomers={setTotalNumberOfCustomers}
          reFetch={reFetch}
          setReFetch={setReFetch}
          onPrintRequest={handlePrintRequest}
        />
      </div>

      <RecordForm
        open={openAddRecord}
        onClose={() => setOpenAddRecord(false)}
        onPrint={data => {
          handleSubmit(data, true);
        }}
        onSubmit={data => handleSubmit(data, false)}
      />

      <PrintRecord open={openPrintRecord} onClose={() => setOpenPrintRecord(false)} data={printData} />
    </>
  );
}

export default Dashboard;
