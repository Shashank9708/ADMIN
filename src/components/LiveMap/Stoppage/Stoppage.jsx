import React from 'react';
import ReactTable from 'react-table';
// import 'react-table/react-table.css';

export const Stoppage = (props) => { 
  return (                       
      <div className="table-wrap">
        <div className="table-search">
                <input 
                    value={props.filterAll}
                    onChange={props.stoppageSearch}
                    className="table-search-input"
                    placeholder="Search"
                />
        </div>
        <ReactTable
            noDataText="No found !!"
            data={props.stoppageList}
            filterable
            defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
            filtered={props.filtered}
            columns={[
                {  
                    Header    : 'Stoppage Name',
                    accessor    : 'stoppage_name',
                    className   : 'grid-header',
                    filterable  : false,
                    filterMethod: (filter, row) => {
                        return row[filter.id].includes(filter.value);
                    }
                    
                }
            ]}
            defaultPageSize={100}
            minRows= {props.stoppageList}
            className="table table-bordered responsive"
            loading={props.loading}
            filterable
            Sorted
            pages={props.pages}
            showPagination={false}
            showPaginationTop={false}
            showPaginationBottom={false}
            manual // For server side pagination
            onFetchData={(state, instance) => {
                props.getStoppageList(state.page, state.pageSize, state.sorted, state.filtered);
            }}
        />
      </div>
  );
}
