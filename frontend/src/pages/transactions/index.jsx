import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../components/Sidebar';
import TransactionFilters from './components/TransactionFilters';
import TransactionTable from './components/TransactionTable';
import TransactionCards from './components/TransactionCards';
import BulkActions from './components/BulkActions';
import Pagination from './components/Pagination';
import Icon from '../../components/AppIcon';

const Transactions = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sortConfig, setSortConfig] = useState({ column: 'date', direction: 'desc' });
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    datePreset: 'month',
    startDate: '',
    endDate: '',
    searchQuery: ''
  });

  const mockTransactions = [
    {
      id: 1,
      date: new Date('2026-01-28T14:30:00'),
      recipient: 'John Kamau',
      phone: '+254712345678',
      amount: 5000,
      currency: 'KES',
      type: 'outgoing',
      status: 'success',
      reference: 'TXN-2026-001-KE',
      fee: 50,
      paymentMethod: 'M-Pesa',
      notes: 'Transaction processed successfully via M-Pesa mobile money network. Funds delivered to recipient within 2 minutes.'
    },
    {
      id: 2,
      date: new Date('2026-01-28T11:15:00'),
      recipient: 'Sarah Ochieng',
      phone: '+254723456789',
      amount: 12500,
      currency: 'KES',
      type: 'incoming',
      status: 'success',
      reference: 'TXN-2026-002-KE',
      fee: 125,
      paymentMethod: 'Bank Transfer',
      notes: 'Payment received from Equity Bank account. Transaction verified and credited to wallet balance.'
    },
    {
      id: 3,
      date: new Date('2026-01-27T16:45:00'),
      recipient: 'Michael Otieno',
      phone: '+254734567890',
      amount: 8000,
      currency: 'KES',
      type: 'outgoing',
      status: 'pending',
      reference: 'TXN-2026-003-KE',
      fee: 80,
      paymentMethod: 'Airtel Money',
      notes: 'Transaction submitted to Airtel Money network. Awaiting confirmation from mobile operator.'
    },
    {
      id: 4,
      date: new Date('2026-01-27T09:20:00'),
      recipient: 'Grace Wanjiru',
      phone: '+254745678901',
      amount: 3500,
      currency: 'KES',
      type: 'outgoing',
      status: 'failed',
      reference: 'TXN-2026-004-KE',
      fee: 35,
      paymentMethod: 'M-Pesa',
      notes: 'Transaction failed due to insufficient balance in recipient M-Pesa account. Funds reversed to sender wallet.'
    },
    {
      id: 5,
      date: new Date('2026-01-26T13:10:00'),
      recipient: 'David Mwangi',
      phone: '+254756789012',
      amount: 20000,
      currency: 'KES',
      type: 'incoming',
      status: 'success',
      reference: 'TXN-2026-005-KE',
      fee: 200,
      paymentMethod: 'KCB Bank',
      notes: 'Large payment received from KCB Bank corporate account. Transaction verified through enhanced security protocols.'
    },
    {
      id: 6,
      date: new Date('2026-01-26T10:30:00'),
      recipient: 'Lucy Akinyi',
      phone: '+254767890123',
      amount: 6500,
      currency: 'KES',
      type: 'outgoing',
      status: 'success',
      reference: 'TXN-2026-006-KE',
      fee: 65,
      paymentMethod: 'M-Pesa',
      notes: 'Regular payment processed via M-Pesa. Recipient confirmed receipt immediately.'
    },
    {
      id: 7,
      date: new Date('2026-01-25T15:50:00'),
      recipient: 'Peter Njoroge',
      phone: '+254778901234',
      amount: 15000,
      currency: 'KES',
      type: 'incoming',
      status: 'success',
      reference: 'TXN-2026-007-KE',
      fee: 150,
      paymentMethod: 'Co-operative Bank',
      notes: 'Payment received from Co-operative Bank savings account. Transaction completed within standard processing time.'
    },
    {
      id: 8,
      date: new Date('2026-01-25T08:25:00'),
      recipient: 'Jane Mutua',
      phone: '+254789012345',
      amount: 4200,
      currency: 'KES',
      type: 'outgoing',
      status: 'pending',
      reference: 'TXN-2026-008-KE',
      fee: 42,
      paymentMethod: 'Safaricom M-Pesa',
      notes: 'Transaction queued for processing. Expected completion within 5 minutes during peak hours.'
    },
    {
      id: 9,
      date: new Date('2026-01-24T17:40:00'),
      recipient: 'James Kipchoge',
      phone: '+254790123456',
      amount: 9500,
      currency: 'KES',
      type: 'outgoing',
      status: 'success',
      reference: 'TXN-2026-009-KE',
      fee: 95,
      paymentMethod: 'M-Pesa',
      notes: 'Business payment processed successfully. Transaction recorded for accounting purposes.'
    },
    {
      id: 10,
      date: new Date('2026-01-24T12:15:00'),
      recipient: 'Mary Chebet',
      phone: '+254701234567',
      amount: 7800,
      currency: 'KES',
      type: 'incoming',
      status: 'success',
      reference: 'TXN-2026-010-KE',
      fee: 78,
      paymentMethod: 'Equity Bank',
      notes: 'Payment received from Equity Bank mobile banking. Funds available immediately in wallet.'
    },
    {
      id: 11,
      date: new Date('2026-01-23T14:55:00'),
      recipient: 'Robert Kimani',
      phone: '+254712345679',
      amount: 11000,
      currency: 'KES',
      type: 'outgoing',
      status: 'success',
      reference: 'TXN-2026-011-KE',
      fee: 110,
      paymentMethod: 'Airtel Money',
      notes: 'Cross-network transfer completed successfully. Recipient notified via SMS confirmation.'
    },
    {
      id: 12,
      date: new Date('2026-01-23T09:30:00'),
      recipient: 'Elizabeth Wambui',
      phone: '+254723456780',
      amount: 5500,
      currency: 'KES',
      type: 'incoming',
      status: 'success',
      reference: 'TXN-2026-012-KE',
      fee: 55,
      paymentMethod: 'M-Pesa',
      notes: 'Regular incoming payment from trusted sender. Transaction processed without delays.'
    },
    {
      id: 13,
      date: new Date('2026-01-22T16:20:00'),
      recipient: 'Daniel Omondi',
      phone: '+254734567891',
      amount: 13500,
      currency: 'KES',
      type: 'outgoing',
      status: 'failed',
      reference: 'TXN-2026-013-KE',
      fee: 135,
      paymentMethod: 'M-Pesa',
      notes: 'Transaction failed due to network timeout. Funds automatically reversed to sender account within 24 hours.'
    },
    {
      id: 14,
      date: new Date('2026-01-22T11:45:00'),
      recipient: 'Catherine Nyambura',
      phone: '+254745678902',
      amount: 6200,
      currency: 'KES',
      type: 'incoming',
      status: 'success',
      reference: 'TXN-2026-014-KE',
      fee: 62,
      paymentMethod: 'KCB Bank',
      notes: 'Payment received from KCB Bank account. Transaction verified and processed successfully.'
    },
    {
      id: 15,
      date: new Date('2026-01-21T13:35:00'),
      recipient: 'Francis Kariuki',
      phone: '+254756789013',
      amount: 8900,
      currency: 'KES',
      type: 'outgoing',
      status: 'success',
      reference: 'TXN-2026-015-KE',
      fee: 89,
      paymentMethod: 'M-Pesa',
      notes: 'Payment sent to business account. Transaction completed with instant confirmation.'
    },
    {
      id: 16,
      date: new Date('2026-01-21T10:10:00'),
      recipient: 'Agnes Njeri',
      phone: '+254767890124',
      amount: 4800,
      currency: 'KES',
      type: 'incoming',
      status: 'pending',
      reference: 'TXN-2026-016-KE',
      fee: 48,
      paymentMethod: 'Equity Bank',
      notes: 'Bank transfer initiated. Awaiting final confirmation from banking network.'
    },
    {
      id: 17,
      date: new Date('2026-01-20T15:25:00'),
      recipient: 'Stephen Mutiso',
      phone: '+254778901235',
      amount: 16500,
      currency: 'KES',
      type: 'outgoing',
      status: 'success',
      reference: 'TXN-2026-017-KE',
      fee: 165,
      paymentMethod: 'M-Pesa',
      notes: 'Large payment processed with enhanced security verification. Transaction completed successfully.'
    },
    {
      id: 18,
      date: new Date('2026-01-20T08:50:00'),
      recipient: 'Rose Wangari',
      phone: '+254789012346',
      amount: 7200,
      currency: 'KES',
      type: 'incoming',
      status: 'success',
      reference: 'TXN-2026-018-KE',
      fee: 72,
      paymentMethod: 'Co-operative Bank',
      notes: 'Payment received from Co-operative Bank. Funds credited to wallet immediately.'
    },
    {
      id: 19,
      date: new Date('2026-01-19T14:15:00'),
      recipient: 'Patrick Onyango',
      phone: '+254790123457',
      amount: 5900,
      currency: 'KES',
      type: 'outgoing',
      status: 'success',
      reference: 'TXN-2026-019-KE',
      fee: 59,
      paymentMethod: 'Airtel Money',
      notes: 'Cross-network payment completed. Recipient confirmed receipt via mobile notification.'
    },
    {
      id: 20,
      date: new Date('2026-01-19T11:40:00'),
      recipient: 'Nancy Auma',
      phone: '+254701234568',
      amount: 10500,
      currency: 'KES',
      type: 'incoming',
      status: 'success',
      reference: 'TXN-2026-020-KE',
      fee: 105,
      paymentMethod: 'M-Pesa',
      notes: 'Regular payment received from verified sender. Transaction processed without issues.'
    },
    {
      id: 21,
      date: new Date('2026-01-18T16:30:00'),
      recipient: 'George Maina',
      phone: '+254712345680',
      amount: 14000,
      currency: 'KES',
      type: 'outgoing',
      status: 'pending',
      reference: 'TXN-2026-021-KE',
      fee: 140,
      paymentMethod: 'M-Pesa',
      notes: 'Transaction submitted for processing. Expected completion within standard timeframe.'
    },
    {
      id: 22,
      date: new Date('2026-01-18T09:55:00'),
      recipient: 'Beatrice Adhiambo',
      phone: '+254723456781',
      amount: 6800,
      currency: 'KES',
      type: 'incoming',
      status: 'success',
      reference: 'TXN-2026-022-KE',
      fee: 68,
      paymentMethod: 'KCB Bank',
      notes: 'Payment received from KCB Bank mobile app. Transaction verified and completed.'
    },
    {
      id: 23,
      date: new Date('2026-01-17T13:20:00'),
      recipient: 'Anthony Wekesa',
      phone: '+254734567892',
      amount: 9200,
      currency: 'KES',
      type: 'outgoing',
      status: 'success',
      reference: 'TXN-2026-023-KE',
      fee: 92,
      paymentMethod: 'M-Pesa',
      notes: 'Business payment processed successfully. Transaction recorded for financial reporting.'
    },
    {
      id: 24,
      date: new Date('2026-01-17T10:45:00'),
      recipient: 'Mercy Wairimu',
      phone: '+254745678903',
      amount: 5300,
      currency: 'KES',
      type: 'incoming',
      status: 'success',
      reference: 'TXN-2026-024-KE',
      fee: 53,
      paymentMethod: 'Equity Bank',
      notes: 'Payment received from Equity Bank account. Funds available in wallet immediately.'
    },
    {
      id: 25,
      date: new Date('2026-01-16T15:10:00'),
      recipient: 'Vincent Odhiambo',
      phone: '+254756789014',
      amount: 11800,
      currency: 'KES',
      type: 'outgoing',
      status: 'success',
      reference: 'TXN-2026-025-KE',
      fee: 118,
      paymentMethod: 'M-Pesa',
      notes: 'Payment sent to individual account. Transaction completed with SMS confirmation.'
    }
  ];

  const filterTransactions = (transactions) => {
    return transactions?.filter(transaction => {
      if (filters?.type !== 'all' && transaction?.type !== filters?.type) return false;
      if (filters?.status !== 'all' && transaction?.status !== filters?.status) return false;
      
      if (filters?.searchQuery) {
        const query = filters?.searchQuery?.toLowerCase();
        const matchesSearch = 
          transaction?.recipient?.toLowerCase()?.includes(query) ||
          transaction?.reference?.toLowerCase()?.includes(query) ||
          transaction?.amount?.toString()?.includes(query) ||
          transaction?.phone?.includes(query);
        if (!matchesSearch) return false;
      }

      const transactionDate = new Date(transaction.date);
      const today = new Date();
      
      if (filters?.datePreset === 'today') {
        return transactionDate?.toDateString() === today?.toDateString();
      } else if (filters?.datePreset === 'week') {
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return transactionDate >= weekAgo;
      } else if (filters?.datePreset === 'month') {
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        return transactionDate >= monthAgo;
      } else if (filters?.datePreset === 'quarter') {
        const quarterAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
        return transactionDate >= quarterAgo;
      } else if (filters?.datePreset === 'custom' && filters?.startDate && filters?.endDate) {
        const start = new Date(filters.startDate);
        const end = new Date(filters.endDate);
        return transactionDate >= start && transactionDate <= end;
      }

      return true;
    });
  };

  const sortTransactions = (transactions) => {
    return [...transactions]?.sort((a, b) => {
      let aValue, bValue;

      switch (sortConfig?.column) {
        case 'date':
          aValue = new Date(a.date)?.getTime();
          bValue = new Date(b.date)?.getTime();
          break;
        case 'recipient':
          aValue = a?.recipient?.toLowerCase();
          bValue = b?.recipient?.toLowerCase();
          break;
        case 'amount':
          aValue = a?.amount;
          bValue = b?.amount;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const filteredTransactions = filterTransactions(mockTransactions);
  const sortedTransactions = sortTransactions(filteredTransactions);
  const totalPages = Math.ceil(sortedTransactions?.length / pageSize);
  const paginatedTransactions = sortedTransactions?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      type: 'all',
      status: 'all',
      datePreset: 'month',
      startDate: '',
      endDate: '',
      searchQuery: ''
    });
    setCurrentPage(1);
  };

  const handleSelectTransaction = (id) => {
    setSelectedIds(prev =>
      prev?.includes(id) ? prev?.filter(selectedId => selectedId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedIds(checked ? paginatedTransactions?.map(t => t?.id) : []);
  };

  const handleSort = (column, direction) => {
    setSortConfig({ column, direction });
  };

  const handleExport = () => {
    const selectedTransactions = mockTransactions?.filter(t => selectedIds?.includes(t?.id));
    const csvContent = [
      ['Date', 'Recipient', 'Phone', 'Amount', 'Currency', 'Type', 'Status', 'Reference', 'Fee', 'Method']?.join(','),
      ...selectedTransactions?.map(t => [
        new Date(t.date)?.toISOString(),
        t?.recipient,
        t?.phone,
        t?.amount,
        t?.currency,
        t?.type,
        t?.status,
        t?.reference,
        t?.fee,
        t?.paymentMethod
      ]?.join(','))
    ]?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-export-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(false);
        setViewMode('cards');
      } else {
        setViewMode('table');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Helmet>
        <title>Transaction History - MPay Africa</title>
        <meta name="description" content="View and manage your complete transaction history with advanced filtering, sorting, and export capabilities for African payment processing." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Sidebar isCollapsed={isSidebarCollapsed} />

        <main className={`transition-all duration-250 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
          <div className="p-4 md:p-6 lg:p-8 pt-20 lg:pt-8">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                    Transaction History
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground font-body">
                    View and manage all your financial transactions
                  </p>
                </div>

                <div className="hidden lg:flex items-center gap-2 bg-muted rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-250 ${
                      viewMode === 'table' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                    }`}
                    aria-label="Table view"
                  >
                    <Icon name="Table" size={18} color="currentColor" />
                    <span className="text-sm font-caption font-medium">Table</span>
                  </button>
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-250 ${
                      viewMode === 'cards' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                    }`}
                    aria-label="Card view"
                  >
                    <Icon name="LayoutGrid" size={18} color="currentColor" />
                    <span className="text-sm font-caption font-medium">Cards</span>
                  </button>
                </div>
              </div>

              <TransactionFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                onSearch={(value) => handleFilterChange('searchQuery', value)}
              />

              <BulkActions
                selectedCount={selectedIds?.length}
                onExport={handleExport}
                onClearSelection={handleClearSelection}
              />

              {viewMode === 'table' ? (
                <TransactionTable
                  transactions={paginatedTransactions}
                  selectedIds={selectedIds}
                  onSelectTransaction={handleSelectTransaction}
                  onSelectAll={handleSelectAll}
                  onSort={handleSort}
                  sortConfig={sortConfig}
                />
              ) : (
                <TransactionCards
                  transactions={paginatedTransactions}
                  selectedIds={selectedIds}
                  onSelectTransaction={handleSelectTransaction}
                />
              )}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={sortedTransactions?.length}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Transactions;