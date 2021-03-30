import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import ReactTable from 'react-table';
import Select from 'react-select';
import ToggleButton from 'react-toggle-button'

import ApiService from '../../../../api/base';


import 'react-table/react-table.css';
import './_overview.scss';

const UPDATE_PERIOD = 1;
const UPDATE_TIMEOUT = 1000 * UPDATE_PERIOD;

const groupedOptions = [
  {value: 'Average', label: `Average`},
  {value: 'Min', label: `Min:`},
  {value: 'Max', label: `Max:`},
  {value: 'Sum', label: `Sum`}
]

const createColumns = (selectValue, columns) => {
  if (columns.length === 1) {
    const columnsIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (let key of columnsIndex) {
      columns.push(
          {
            Header: `value${key}`,
            accessor: `value${key}`,
            Cell: row => (
                <div
                    style={{
                      backgroundColor: row.value > 0
                          ? `rgba(0, 0, 0, ${row.value})`
                          : row.value === 0
                              ? `rgba(255, 255, 255)`
                              : `rgba(255, 140, 0, ${Math.abs(row.value)})`,
                      color: row.value > 0.5 ? 'white' : 'black',
                      width: `100%`,
                    }}
                >
                  {row.value.toFixed(5)}
                </div>
            ),
            Footer: row => {
              const original = row.data[key - 1] && row.data[key - 1]._original
              switch (selectValue) {
                case  'Average':
                  return <span>{`Avg:${original && original.avg.toFixed(5)}`}</span>
                case  'Min':
                  return <span>{`Min:${original && original.min.toFixed(5)}`}</span>
                case  'Max':
                  return <span>{`Max:${original && original.max.toFixed(5)}`}</span>
                case  'Sum':
                  return <span>{`Sum:${original && original.max.toFixed(5)}`}</span>
                default:
                  return <span>pending</span>
              }
            }
          },
      )
    }
  }
}

const Table = () => {
  const columns = [
    {
      Header: 'entity',
      accessor: 'entity',
      style: {backgroundColor: '#9f9898'}
    },
  ];
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectValue, setSelectValue] = useState('')
  const [enabled, setEnabled] = useState(true)

  createColumns(selectValue, columns)
  const requestData = useCallback(async ({
                                           setApplications,
                                           setLoading,
                                           setSelectValue,
                                           loading
                                         }) => {
    const {data} = await ApiService.post(`data`, {});
    setApplications(data)
    loading && setSelectValue('Average')
    setLoading(false)
  }, []);

  useEffect(() => {
    if (enabled) {
      setTimeout(async () => {
        let props = {setApplications, setLoading, setSelectValue, loading}
        await requestData(props)
      }, UPDATE_TIMEOUT);
    }
  }, [applications, setApplications, requestData, loading, enabled])


  return (
      <div>
        <ReactTable
            className={"ReactTable"}
            data={applications}
            columns={columns}
            resizable={false}
            defaultPageSize={20}
            sortable={false}
            showPagination={false}
            noDataText="All of your user will appear here."
            PadRowComponent={<span/>}
            loading={loading}
            loadingText='Loading...'
        />
        <div className={"ReactSelect"}>
          <Select
              options={groupedOptions}
              defaultValue={groupedOptions[0]}
              onChange={({value}) => setSelectValue(value)}
          />
        </div>
        <div className={"ReactToggle"}>
        <ToggleButton
            value={enabled}
            onToggle={() => {
              setEnabled(!enabled)
            }}
        />
        <p>{enabled ? ' System is enabled' : 'System is disabled'}</p>
        </div>
      </div>
  )
}

export default Table;
