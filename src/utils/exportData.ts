
/**
 * Utility functions for exporting data to CSV and Excel formats
 */

// Helper to format date objects to strings
const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

// Convert application data to CSV format
export const exportToCSV = (applications: any[]): void => {
  if (!applications || applications.length === 0) {
    console.error('No data to export');
    return;
  }

  try {
    // Define CSV headers based on the application data structure
    const headers = [
      'Country',
      'City',
      'Purpose',
      'Submission Date',
      'Appointment Date',
      'Return Date',
      'Processing Time (days)',
      'Result'
    ];

    // Transform data into CSV rows
    const csvRows = applications.map(app => {
      // Calculate processing time
      const submissionDate = app.applicationSubmitDate || app.submission_date ? new Date(app.applicationSubmitDate || app.submission_date) : null;
      const returnDate = app.passportReturnDate || app.return_date ? new Date(app.passportReturnDate || app.return_date) : null;
      
      let processingDays = 0;
      if (submissionDate) {
        const endDate = returnDate || new Date();
        processingDays = Math.floor((endDate.getTime() - submissionDate.getTime()) / (1000 * 60 * 60 * 24));
      }

      // Format result status
      let resultStatus = 'Pending';
      if (app.result?.status) {
        resultStatus = app.result.status;
      } else if (app.result_status) {
        resultStatus = app.result_status;
      }

      // Return CSV row values
      return [
        app.country || '',
        app.city || '',
        app.purpose || app.purposeOfVisit || '',
        formatDate(submissionDate),
        formatDate(app.appointmentDate ? new Date(app.appointmentDate) : null),
        formatDate(returnDate),
        processingDays.toString(),
        resultStatus
      ];
    });

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.map(cell => 
        // Escape quotes and wrap fields in quotes if they contain commas
        typeof cell === 'string' && (cell.includes(',') || cell.includes('"')) 
          ? `"${cell.replace(/"/g, '""')}"` 
          : cell
      ).join(','))
    ].join('\n');

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set up download attributes
    const date = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `visa-applications-${date}.csv`);
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Failed to export data:', error);
  }
};

// Function to export to Excel-compatible format (CSV with BOM)
export const exportToExcel = (applications: any[]): void => {
  if (!applications || applications.length === 0) {
    console.error('No data to export');
    return;
  }

  try {
    // Same process as CSV but with BOM for Excel compatibility
    const BOM = '\uFEFF'; // Byte Order Mark for Excel UTF-8 compatibility
    
    // Define Excel headers
    const headers = [
      'Country',
      'City',
      'Purpose',
      'Submission Date',
      'Appointment Date',
      'Return Date',
      'Processing Time (days)',
      'Result',
      'Result Details'
    ];

    // Transform data into Excel rows with extra details
    const excelRows = applications.map(app => {
      // Calculate processing time
      const submissionDate = app.applicationSubmitDate || app.submission_date ? new Date(app.applicationSubmitDate || app.submission_date) : null;
      const returnDate = app.passportReturnDate || app.return_date ? new Date(app.passportReturnDate || app.return_date) : null;
      
      let processingDays = 0;
      if (submissionDate) {
        const endDate = returnDate || new Date();
        processingDays = Math.floor((endDate.getTime() - submissionDate.getTime()) / (1000 * 60 * 60 * 24));
      }

      // Format result status and details
      let resultStatus = 'Pending';
      if (app.result?.status) {
        resultStatus = app.result.status;
      } else if (app.result_status) {
        resultStatus = app.result_status;
      }

      let resultDetails = '';
      if (resultStatus === 'Approved' && (app.result?.validity || app.validity)) {
        resultDetails = `Validity: ${app.result?.validity || app.validity}`;
        if (app.result?.entryType || app.entry_type) {
          resultDetails += `, Entry: ${app.result?.entryType || app.entry_type}`;
        }
      } else if (resultStatus === 'Rejected' && (app.result?.rejectionReason || app.rejection_reason)) {
        resultDetails = `Reason: ${app.result?.rejectionReason || app.rejection_reason}`;
      }

      // Return Excel row values
      return [
        app.country || '',
        app.city || '',
        app.purpose || app.purposeOfVisit || '',
        formatDate(submissionDate),
        formatDate(app.appointmentDate ? new Date(app.appointmentDate) : null),
        formatDate(returnDate),
        processingDays.toString(),
        resultStatus,
        resultDetails
      ];
    });

    // Combine headers and rows
    const csvContent = BOM + [
      headers.join(','),
      ...excelRows.map(row => row.map(cell => 
        // Escape quotes and wrap fields in quotes if they contain commas
        typeof cell === 'string' && (cell.includes(',') || cell.includes('"')) 
          ? `"${cell.replace(/"/g, '""')}"` 
          : cell
      ).join(','))
    ].join('\n');

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set up download attributes with Excel extension
    const date = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `visa-applications-${date}.xlsx`);
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Failed to export data:', error);
  }
};
