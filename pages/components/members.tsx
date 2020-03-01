import { Paper } from '@material-ui/core';
import { useMembers } from '../hooks/load-members.hooks';

import React, { useRef } from 'react';
import MaterialTable from 'material-table';
import { useInsertMember } from '../hooks/insert-members.hooks';
import { MemberInput, Member } from '../hooks/types';
import { useUpdateMember } from '../hooks/update-member.hooks';

export const Members = (): JSX.Element => {
    const { loading, data, fetchMore, count } = useMembers({
        limit: 100,
        offset: 0
    });
    const [insertMember] = useInsertMember();
    const [updateMember] = useUpdateMember();
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
                    { title: 'Phone', field: 'phoneNumber' },
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
                    onRowAdd: (newMemberInput: MemberInput) => insertMember(newMemberInput),
                    onRowUpdate: (newData: Member) => updateMember(newData.id, newData)
                }}
            />
        </Paper>
    );
}