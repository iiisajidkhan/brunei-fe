import React, { useState, useCallback, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import RecordForm from '@/components/Dashboard/RecordForm';
import DeleteConfirmDialog from '@/components/Dashboard/DeleteConfirmDialog';

// Shadcn Component
import { DownloadIcon, EditIcon, PrinterIcon, Trash2Icon, SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import api from '@/api/api';
import { showToast } from '@/utils/Toast';

// Table headings
const headings = [
  { id: '1', header: 'Customer Name' },
  { id: '2', header: 'Register Number' },
  { id: '3', header: 'Phone' },
  { id: '4', header: 'Address' },
  { id: '5', header: 'Register Date' },
  { id: '9', header: 'Action' },
];

// Custom action button
const CustomActionBtn = React.memo(({ data, onEdit, onDelete, onPrint }) => {
  return (
    <div className='flex items-center justify-center'>
      <Button
        variant='ghost'
        size='icon'
        onClick={() => onPrint(data)}
        className='text-blue-600 hover:bg-transparent cursor-pointer'
      >
        <PrinterIcon className='w-5 h-5' />
      </Button>
      <Button
        variant='ghost'
        size='icon'
        onClick={() => onEdit(data)}
        className='text-blue-600 hover:bg-transparent cursor-pointer'
      >
        <EditIcon className='w-5 h-5' />
      </Button>
      <Button
        variant='ghost'
        size='icon'
        onClick={() => onDelete(data)}
        className='text-red-500 hover:bg-transparent cursor-pointer'
      >
        <Trash2Icon className='w-5 h-5' />
      </Button>
    </div>
  );
});

function CustomerTable({ setTotalNumberOfCustomers, reFetch, setReFetch, onPrintRequest }) {
  const [customerData, setCustomerData] = useState([]);
  const [limits, setLimits] = useState(8);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch] = useDebounce(searchInput, 500);
  const [isExporting, setIsExporting] = useState(false);
  const [openAddRecord, setOpenAddRecord] = useState(false);
  const [openEditRecord, setOpenEditRecord] = useState(false);
  const [editData, setEditData] = useState(null);
  const [openPrintRecord, setOpenPrintRecord] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const getData = async (currentPage = 1, searchTerm = searchInput) => {
    setLoading(true);
    try {
      const response = await api.get(`/customer/get-all?search=${searchTerm}&page=${currentPage}&limit=${limits}`);

      if (response.status === 200 || response.status === 201) {
        setCustomerData(response.data?.data);
        setPage(response.data.page);
        setTotal(response.data.total);
        setTotalNumberOfCustomers(response.data.total);
        setTotalPages(Math.ceil(response.data.total / limits));
        setReFetch(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to load data on pagination change or search term change
  useEffect(() => {
    getData(page, debouncedSearch);
  }, [page, limits, debouncedSearch, reFetch]);

  const handleInputChange = e => {
    setSearchInput(e.target.value);
    setPage(1); // Reset to first page when searching
    getData(1, searchInput);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Set responseType to 'blob' to handle file download
      const response = await api.get('/customer/export', {
        responseType: 'blob',
      });

      // Create a blob URL from the response data
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element to trigger the download
      const link = document.createElement('a');

      // Set download attributes
      link.href = url;

      // Get filename from Content-Disposition header or use default
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/["']/g, '')
        : 'customer-export.xlsx';

      link.setAttribute('download', filename);

      // Trigger download and cleanup
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleEdit = async data => {
    try {
      setEditData(data);
      setOpenEditRecord(true);
    } catch (error) {
      console.error('Error opening edit form:', error);
    }
  };

  const handlePrint = data => {
    onPrintRequest(data);
  };

  const handleDeleteClick = data => {
    setCustomerToDelete(data);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async data => {
    try {
      const response = await api.delete(`/customer/delete/${data._id}`);
      if (response.status === 201 || response.status === 200) {
        // Show success message
        showToast('Customer deleted successfully', 'success');
        setOpenEditRecord(false);
        setReFetch(true);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      showToast('Error deleting customer', 'error');
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleSubmitEdit = async data => {
    try {
      const response = await api.put(`/customer/update/${editData._id}`, data);
      if (response.status === 201) {
        // Show success message
        showToast('Customer updated successfully', 'success');
        setOpenEditRecord(false);
        setReFetch(true); // Refresh the table
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      showToast('Error updating customer', 'error');
    }
  };

  const handlePageChange = newPage => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Maximum number of page buttons to show

    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page
    if (startPage > 1) {
      pageNumbers.push(
        <Button
          key='1'
          variant={1 === page ? 'default' : 'outline'}
          size='sm'
          onClick={() => handlePageChange(1)}
          className='rounded p-4'
        >
          1
        </Button>,
      );

      // Show ellipsis if needed
      if (startPage > 2) {
        pageNumbers.push(
          <span key='start-ellipsis' className='px-2 py-2'>
            ...
          </span>,
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          variant={i === page ? 'default' : 'outline'}
          size='sm'
          onClick={() => handlePageChange(i)}
          className='rounded p-4'
        >
          {i}
        </Button>,
      );
    }

    // Last page
    if (endPage < totalPages) {
      // Show ellipsis if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key='end-ellipsis' className='px-2 py-2'>
            ...
          </span>,
        );
      }

      pageNumbers.push(
        <Button
          key={totalPages}
          variant={totalPages === page ? 'default' : 'outline'}
          size='sm'
          onClick={() => handlePageChange(totalPages)}
          className='rounded p-4'
        >
          {totalPages}
        </Button>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className=''>
      <div className='flex items-center justify-between py-4 w-full'>
        <h1 className='text-xl font-semibold'>Customers</h1>
        <div className='flex items-center gap-2 w-1/2'>
          <div className='relative w-full'>
            <Input
              type='text'
              value={searchInput}
              onChange={handleInputChange}
              placeholder='Search Customer'
              className='max-w-xl h-12 rounded pr-12'
            />
          </div>
          <Button onClick={handleExport} variant='outline' className='h-12 cursor-pointer rounded shadow-none'>
            Export <DownloadIcon className='w-5 h-5' />
          </Button>
        </div>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader className='h-14 bg-[#E9E9E9]'>
            <TableRow>
              {headings.map(heading => (
                <TableCell key={heading.id}>
                  <div className='flex items-center justify-between'>
                    <div className={`${heading.header === 'Action' && 'w-full text-center'}`}>{heading.header}</div>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={headings.length} className='h-13'>
                  <div className='flex items-center justify-center gap-2'>
                    <div className=''>{loading ? 'Loading...' : 'No data found'}</div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              customerData.map((row, index) => (
                <TableRow key={index} className='h-13'>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.registerNumber}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <CustomActionBtn
                      data={row}
                      onEdit={handleEdit}
                      onDelete={handleDeleteClick}
                      onPrint={handlePrint}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {`Showing ${customerData.length} of ${total} results (Page ${page} of ${totalPages})`}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className='rounded p-4'
          >
            Previous
          </Button>

          {totalPages > 0 && renderPagination()}

          <Button
            variant='outline'
            size='sm'
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className='rounded p-4'
          >
            Next
          </Button>
        </div>
      </div>

      <RecordForm
        open={openEditRecord}
        onClose={() => setOpenEditRecord(false)}
        onPrint={() => setOpenPrintRecord(true)}
        onSubmit={handleSubmitEdit}
        initialData={editData}
        purpose='Edit'
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        item={customerToDelete}
      />
    </div>
  );
}

export default CustomerTable;
