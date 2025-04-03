
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../schema';
import ValidityField from './ValidityField';
import VisaDateFields from './VisaDateFields';
import EntryTypeField from './EntryTypeField';

interface ApprovedFieldsProps {
  form: UseFormReturn<FormValues>;
}

const ApprovedFields: React.FC<ApprovedFieldsProps> = ({ form }) => {
  return (
    <>
      <ValidityField form={form} />
      <VisaDateFields form={form} />
      <EntryTypeField form={form} />
    </>
  );
};

export default ApprovedFields;
