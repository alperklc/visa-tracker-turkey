
import React from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { VisaResultStatus } from '@/types/enums';
import { FormValues } from './schema';
import {
  ReturnDateField,
  ResultStatusField,
  RejectionReasonField,
  ApprovedFields
} from './result-details';

interface ResultDetailsProps {
  form: UseFormReturn<FormValues>;
}

const ResultDetails: React.FC<ResultDetailsProps> = ({ form }) => {
  // Watch for result status changes
  const resultStatus = useWatch({
    control: form.control,
    name: 'resultStatus',
  });
  
  const isApproved = resultStatus === VisaResultStatus.Approved;
  const isRejected = resultStatus === VisaResultStatus.Rejected;
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Return Date Field - At top */}
        <ReturnDateField form={form} />

        {/* Result Status Field */}
        <ResultStatusField form={form} />

        {/* Conditional Fields based on Result Status */}
        {isApproved && <ApprovedFields form={form} />}
        
        {isRejected && <RejectionReasonField form={form} />}
      </div>
    </div>
  );
};

export default ResultDetails;
