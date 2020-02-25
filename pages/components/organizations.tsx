import { Paper, TableContainer, TableHead, TableBody, TableRow, FormControlLabel, Checkbox, List, ListItem, Theme, createStyles } from '@material-ui/core';
import useOrganizations from '../hooks/organizations.hooks';

import React, { useState } from 'react';
import MaterialTable, { Query, QueryResult } from 'material-table';

export const Organizations = (): JSX.Element => {
    const { loading, data, fetchMore, hasNextPage } = useOrganizations(() => {
        // workaround to handle loading the initial data to MaterialTable
        // looking forward to replacing it with suspense
        if (initialLoadResponse) {
            initialLoadResponse({
                data: data,
                page: 0,
                totalCount: data.length + 1
            });
        }
    });
    const [initialLoadResponse, setInitialLoadResponse] = useState(null);

    const shouldLoadMore = (
        page: number,
        pageSize: number
    ) => hasNextPage && page > Math.floor(data.length / pageSize);
    const totalCount = () => hasNextPage ? data.length + 1 : data.length;

    const loadData = query => new Promise<QueryResult<Organization>>((resolve, reject) => {
        console.log('load more')
        if (!initialLoadResponse) {
            if (!loading) {
                setInitialLoadResponse(() => { });
                resolve({
                    data: data,
                    page: query.page + 1,
                    totalCount: totalCount()
                });
            } else {
                setInitialLoadResponse(resolve);
            }
        } else if (!loading && shouldLoadMore(query.page, query.pageSize)) {
            fetchMore().then(response => {
                
            console.log('fetched more', response)
                resolve({
                    data: data,
                    page: query.page + 1,
                    totalCount: totalCount()
                })
            }).catch(reject);
        }
    });

    return (
        <Paper>
            <MaterialTable
                title="Organizations"
                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Enabled', field: 'enabled', type: 'boolean' }
                ]}
                data={loadData}
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