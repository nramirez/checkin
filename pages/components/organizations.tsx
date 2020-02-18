import { Paper, TableContainer, TableHead, TableBody, TableRow, FormControlLabel, Checkbox, List, ListItem, Theme, createStyles } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import useOrganizations from '../hooks/organizations.hooks';
import { VirtualizedTable } from './virtualizedTable';
import { AutoSizer, Column, Table, TableCellRenderer, TableHeaderProps } from 'react-virtualized';

export const Organizations = (): JSX.Element => {
    const { organizations, loading, loadMore, hasNextPage } = useOrganizations();
    const count = hasNextPage ? organizations.length + 1 : organizations.length;
    const loadMoreOrganizations = loading ? () => { } : loadMore;
    const isLoaded = i => !hasNextPage || i < organizations.length;
    console.log(organizations, loading);

    return <Paper style={{ height: 400, width: '100%' }}>
        <VirtualizedTable
            rowCount={organizations.length}
            rowGetter={({ index }) => organizations[index]}
            columns={[
                {
                    width: 200,
                    label: 'Actions',
                    dataKey: 'actions',
                },
                {
                    width: 120,
                    label: 'Name',
                    dataKey: 'name'
                }
            ]}
        />
    </Paper>
}