import { Paper, TableContainer, TableHead, TableBody, TableRow, FormControlLabel, Checkbox, List, ListItem, Theme, createStyles, CircularProgress } from '@material-ui/core';
import useOrganizations from '../hooks/organizations.hooks';

import React, { useState, useEffect } from 'react';
import MaterialTable, { Query, QueryResult } from 'material-table';

export const Organizations = (): JSX.Element => {
    const { loading, data, fetchMore, hasNextPage } = useOrganizations();
    const [initialLoad, setInitialLoad] = useState(true);

    const shouldLoadMore = (
        page: number,
        pageSize: number
    ) => hasNextPage && page > Math.floor(data.length / pageSize) - 2;
    const totalCount = () => hasNextPage ? data.length + 1 : data.length;

    useEffect(() => {
        if (initialLoad && !loading) {
            setInitialLoad(false);
        }
    }, [loading]);

    if (initialLoad) {
        return <CircularProgress />;
    }

    const loadData = query => new Promise<QueryResult<Organization>>((resolve, reject) => {
        console.log(query)
        console.log(data);
        console.log(hasNextPage)
        if (query.page === 0 && query.totalCount === 0) {
            resolve({
                data: data,
                page: 0,
                totalCount: totalCount()
            });
        } else if (shouldLoadMore(query.page, query.pageSize)) {
            fetchMore().then(response => {
                console.log('fetched more', response)
                resolve({
                    data: data,
                    page: query.page + 1,
                    totalCount: totalCount()
                });
            }).catch(reject);
        } else {
            resolve({
                data: data,
                page: query.page + 1,
                totalCount: totalCount()
            });
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