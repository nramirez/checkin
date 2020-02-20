import { Paper, TableContainer, TableHead, TableBody, TableRow, FormControlLabel, Checkbox, List, ListItem, Theme, createStyles } from '@material-ui/core';
import useOrganizations from '../hooks/organizations.hooks';

import React, { useState, useRef, useEffect } from 'react';
import MaterialTable from 'material-table';

// get this from the table
const count = 5;

export const Organizations = (): JSX.Element => {
    console.log('reseting');
    const onCompleted = data => {
        console.log('on completed', data)
        tableRef.current.onQueryUpdate();
    };
    const { organizations, loading, loadMore, hasNextPage } = useOrganizations(onCompleted);
    const totalCount = () => hasNextPage ? organizations.length + 1 : organizations.length;

    const [state, setState] = useState(loading);
    const tableRef = useRef({
        onQueryUpdate: () => {

        }
    });

    useEffect(() => {
        console.log('useEffect called ', state)
        // if (!loading) {
        //     tableRef.current.onQueryUpdate();
        //     setState(false);
        // }
    }, []);

    const loader = query =>
        new Promise<Organization>((resolve, reject) => {
            const needLoadMore = query.pageSize * (query.page + 1) < organizations.length;
            if (needLoadMore && !loading && loadMore) {
                loadMore().finally(() => {
                    //setState(true);
                });
            }

            resolve({
                data: organizations,
                page: query.page,
                totalCount: totalCount()
            } as any);
        });

    return (
        <Paper>
            <MaterialTable
                title="Organizations"
                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Enabled', field: 'enabled', type: 'boolean' }
                ]}
                data={(query) => loader(query) as any}
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