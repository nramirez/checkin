import { Paper, TableContainer, TableHead, TableBody, TableRow, FormControlLabel, Checkbox, List, ListItem, Theme, createStyles } from '@material-ui/core';
import useOrganizations from '../hooks/organizations.hooks';

import React, { useState, useRef, useEffect } from 'react';
import MaterialTable, { Query, QueryResult } from 'material-table';

export const Organizations = (): JSX.Element => {
    const { loading, data, fetchMore, hasNextPage } = useOrganizations();
    const shouldLoadMore = (
        page: number,
        pageSize: number
    ) => hasNextPage && page > Math.floor(data.length / pageSize);
    const totalCount = () => hasNextPage ? data.length + 1 : data.length;

    const loadData = (query) : Promise<QueryResult<Organization> {
        return new Promise((resolve, reject) => {
            if (loading) {
                console.log('loading ');
            } else if (shouldLoadMore(query.page, query.pageSize)) {
                fetchMore().then(response => {
                    resolve({
                        data: data,
                        page: query.page + 1,
                        totalCount: totalCount()
                    })
                }).catch(reject);
            }
            console.log('loaded')
        })
    };


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