import { Paper, TableContainer, TableHead, TableBody, TableRow, FormControlLabel, Checkbox, List, ListItem, Theme, createStyles } from '@material-ui/core';
import useOrganizations from '../hooks/organizations.hooks';

import React from 'react';
import MaterialTable, { Column } from 'material-table';
import { resolve } from 'dns';

interface Row {
    name: string;
    surname: string;
    birthYear: number;
    birthCity: number;
}

interface TableState {
    columns: Array<Column<Row>>;
}

export default function MaterialTableDemo() {
    const [state, setState] = React.useState<TableState>({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Enabled', field: 'enabled', type: 'boolean' }
        ]
    });

    const { organizations, loading, loadMore, hasNextPage } = useOrganizations();
    const count = hasNextPage ? organizations.length + 1 : organizations.length;
    const isLoaded = i => !hasNextPage || i < organizations.length;

    const dataLoader = query => new Promise((resolve, reject) => {
        if (loading || !isLoaded) {
            console.log('calling while loading or loaded...');
            resolve();
        }
        loadMore().then(response => {
            resolve({
                data: response.data,
                page: response.pageInfo.hasNextPage ? 
            })


        }).catch(err => {
            console.log('handle err', err);
        }
    })


    return (
        <MaterialTable
            title="Organizations"
            columns={state.columns}
            data={dataLoader}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
}


export const Organizations = (): JSX.Element => {
    const { organizations, loading, loadMore, hasNextPage } = useOrganizations();
    const count = hasNextPage ? organizations.length + 1 : organizations.length;
    const loadMoreOrganizations = loading ? () => { } : loadMore;
    const isLoaded = i => !hasNextPage || i < organizations.length;
    console.log(organizations, loading);

    return <Paper style={{ height: 400, width: '100%' }}>
    </Paper>
}