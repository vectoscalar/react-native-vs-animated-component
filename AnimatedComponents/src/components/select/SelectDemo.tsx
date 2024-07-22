import React, { useState } from 'react'

import Select, { ISelectOption } from './Select'

const SelectDemo = () => {
  const [select, setSelect] = useState<ISelectOption | ISelectOption[]>([])

  return (
    <Select
      onChange={setSelect}
      options={[
        { title: 'Amandeep', value: 'amandeep' },
        { title: 'Aman Rana', value: 'aman rana' },
        { title: 'Hargun', value: 'hargun' },
        { title: 'Ravi', value: 'ravi' },
      ]}
      selectedOptions={select}
      placeholderText="Select option"
      multiSelect
    />
  )
}

export default SelectDemo
