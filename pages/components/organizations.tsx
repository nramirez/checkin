import { Paper } from '@material-ui/core';
import useOrganizations from '../hooks/organizations.hooks';

import React, { useRef } from 'react';
import MaterialTable from 'material-table';

export const Organizations = (): JSX.Element => {
    const { loading, data, fetchMore, hasNextPage } = useOrganizations();
    const ref = useRef();

    const handleOnPageChange = () => {
        const { currentPage, pageSize } = (ref as any).current.state;
        const shouldFetch = hasNextPage && currentPage > Math.floor(data.length / pageSize) - 2;
        if (shouldFetch) {
            fetchMore();
        }
    }

    return (
        <Paper>
            <MaterialTable
                tableRef={ref}
                title="Organizations"
                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Enabled', field: 'enabled', type: 'boolean' }
                ]}
                isLoading={loading}
                data={data}
                onChangePage={handleOnPageChange}
                onChangeRowsPerPage={handleOnPageChange}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                // setState(prevState => {
                                //     const data = [...prevState.data];
                                //     data.push(newData);
                                //     return { ...prevState, data };
                                // });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                // if (oldData) {
                                //     setState(prevState => {
                                //         const data = [...prevState.data];
                                //         data[data.indexOf(oldData)] = newData;
                                //         return { ...prevState, data };
                                //     });
                                // }
                            }, 600);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                // setState(prevState => {
                                //     const data = [...prevState.data];
                                //     data.splice(data.indexOf(oldData), 1);
                                //     return { ...prevState, data };
                                // });
                            }, 600);
                        }),
                }}
            />
        </Paper>
    );
}