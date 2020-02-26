import { Paper, TableContainer, TableHead, TableBody, TableRow, FormControlLabel, Checkbox, List, ListItem, Theme, createStyles, CircularProgress } from '@material-ui/core';
import useOrganizations from '../hooks/organizations.hooks';

import React, { useState, useEffect } from 'react';
import MaterialTable, { QueryResult } from 'material-table';

export const Organizations = (): JSX.Element => {
    const { loading, data, fetchMore, hasNextPage } = useOrganizations();
    const [initialLoad, setInitialLoad] = useState(true);
    const [orgs, setOrgs] = useState(data);

    const shouldLoadMore = (
        page: number,
        pageSize: number
    ) => hasNextPage && page > Math.floor(orgs.length / pageSize) - 2;

    // useEffect(() => {
    //     if (initialLoad && !loading) {
    //         setInitialLoad(false);
    //     }
    // }, [loading]);

    if (orgs.length < 0) {
        return <CircularProgress />;
    }

    const loadData = query => new Promise<QueryResult<Organization>>((resolve, reject) => {
        if (shouldLoadMore(query.page, query.pageSize)) {
            console.log('fetching more')
            fetchMore().then((res: any) => {
                console.log(res);
                let { edges, pageInfo } = res.data.organizations;
                let newOrgs = edges.map(({ node }) => node);
                setOrgs(newOrgs);
                resolve({
                    data: orgs,
                    page: query.page + 1,
                    totalCount: orgs.length
                });
            }).catch(reject);
        } else {
            resolve({
                data: orgs,
                page: query.page + 1,
                totalCount: orgs.length
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