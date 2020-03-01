import { Paper } from '@material-ui/core';
import { useMembers } from '../hooks/load-members.hooks';

import React, { useRef } from 'react';
import MaterialTable from 'material-table';
import { useInsertMember } from '../hooks/insert-members.hooks';
import { MemberInput, Member } from '../hooks/types';

export const Members = (): JSX.Element => {
    const { loading, data, fetchMore, count } = useMembers({
        limit: 100,
        offset: 0
    });
    const [insertMember] = useInsertMember();
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
                    { title: 'Email', field: 'email' },
                    { title: 'Name', field: 'name' },
                    { title: 'Last Name', field: 'lastName' },
                    { title: 'Phone', field: 'phone' },
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
                    onRowAdd: (newMemberInput: MemberInput) =>
                        new Promise((resolve, reject) => {
                            insertMember(newMemberInput)
                                .then((response) => {
                                    console.log(response);
                                    resolve(response)
                                })
                                .catch(reject);
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