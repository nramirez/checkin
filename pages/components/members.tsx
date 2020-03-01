import { Paper } from '@material-ui/core';
import { useMembers } from '../hooks/load-members.hooks';

import React, { useRef } from 'react';
import MaterialTable from 'material-table';
import { useInsertUser } from '../hooks/insert-members.hooks';
import { UserInput } from '../hooks/types';

export const Members = (): JSX.Element => {
    const { loading, data, fetchMore, count } = useMembers({
        limit: 100,
        offset: 0
    });
    const [insertUser] = useInsertUser();
    const ref = useRef();

    const handleOnPageChange = () => {
        const { currentPage, pageSize } = (ref as any).current.state;
        const hasNextPage = count > currentPage * pageSize;
        const shouldFetch = hasNextPage && data.length < currentPage * pageSize;
        if (shouldFetch) {
            fetchMore({
                limit: pageSize,
                offset: currentPage + 1
            });
        }
    }

    return (
        <Paper>
            <MaterialTable
                tableRef={ref}
                title="Members"
                columns={[
                    { title: 'Id', field: 'id' },
                    { title: 'Email', field: 'email' },
                    { title: 'name', field: 'name' },
                    { title: 'phone', field: 'phone' },
                ]}
                options={
                    {
                        addRowPosition: 'first'
                    }
                }
                isLoading={loading}
                data={data}
                onChangePage={handleOnPageChange}
                onChangeRowsPerPage={handleOnPageChange}
                editable={{
                    onRowAdd: (newUser: UserInput) =>
                        new Promise(resolve => {
                            insertUser(newUser)
                                .then(resolve)
                                .catch(console.error);
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