import { Paper, TableContainer, TableHead, TableBody, TableRow, FormControlLabel, Checkbox, List, ListItem, Theme, createStyles } from '@material-ui/core';
import useOrganizations from '../hooks/organizations.hooks';

import React, { useState, useRef, useEffect } from 'react';
import MaterialTable, { Column, QueryResult } from 'material-table';

interface Row {
    name: string;
    enabled: boolean;
    id: string;
}

export const Organizations = (): JSX.Element => {
    const { organizations, loading, loadMore, hasNextPage } = useOrganizations();
    const count = hasNextPage ? organizations.length + 1 : organizations.length;
    const isLoaded = i => !hasNextPage || i < organizations.length;

    const [reload, setReload] = useState(false);
    const tableRef = useRef({
        onQueryUpdate: () => {

        }
    });

    useEffect(() => {
        if (reload || organizations) {
            tableRef.current.onQueryUpdate();
        }
    }, [reload, organizations]);

    const loader = query =>
        new Promise<Organization>((resolve, reject) => {
            if (query.loadMore) {
                query.loadMore().finally(() => {
                    // why?
                    delete query.loadMore;
                    setReload(true);
                })
            }

            resolve({
                data: organizations,
                page: count / 20,
                totalCount: count + 1
            } as any);
        });

    return (
        <MaterialTable
            title="Organizations"
            columns={[
                { title: 'Id', field: 'id' },
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
    );
}